from bson.son import SON
from datetime import datetime
from datetime import date
from itertools import chain
import json
import logging
from textwrap import dedent
import urllib

from django import db
from django.conf import settings
from pymongo import MongoClient
from pymongo.errors import PyMongoError
from pytz import UTC

from django_comment_client.management_utils import get_mongo_connection_string
from lms.djangoapps.instructor_task.tasks_helper.utils import upload_csv_to_report_store
from courseware.courses import get_course_by_id
from lms.djangoapps.instructor_task.models import PROGRESS
from lms.djangoapps.instructor_task.models import ReportStore
from lms.djangoapps.instructor_task.tasks_helper.utils import UPDATE_STATUS_FAILED
from lms.djangoapps.instructor_task.tasks_helper.utils import UPDATE_STATUS_SUCCEEDED
from openedx.stanford.lms.djangoapps.instructor_analytics.basic import student_responses
from util.file import course_filename_prefix_generator
from util.query import get_read_replica_cursor_if_available

FORUMS_MONGO_PARAMS = settings.FORUM_MONGO_PARAMS
ORA2_ANSWER_PART_SEPARATOR = '\n-----\n'
TASK_LOG = logging.getLogger('stanford.celery.task')


def generate_student_forums_query(course_id):
    """
    generates an aggregate query for student data which can be executed using pymongo
    :param course_id:
    :return: a list with dictionaries to fetch aggregate query for
    student forums data
    """
    query = [
        {
            '$match': {
                'course_id': course_id.to_deprecated_string(),
            },
        },
        {
            '$group': {
                '_id': '$author_username',
                'posts': {
                    '$sum': 1,
                },
                'votes': {
                    '$sum': '$votes.point',
                },
            },
        },
    ]
    return query


def collect_student_forums_data(course_id):
    """
    Given a SlashSeparatedCourseKey course_id, return headers and information
    related to student forums usage
    """
    try:
        client = MongoClient(get_mongo_connection_string())
        mongodb = client[FORUMS_MONGO_PARAMS['database']]
        student_forums_query = generate_student_forums_query(course_id)
        results = mongodb.contents.aggregate(student_forums_query)['result']
    except PyMongoError:
        raise
    parsed_results = [
        [
            result['_id'],
            result['posts'],
            result['votes'],
        ]
        for result in results
    ]
    header = ['Username', 'Posts', 'Votes']
    return header, parsed_results


def collect_email_ora2_data(course_id):
    """
    Call collect_ora2_data for aggregated ORA2 response data including users' email addresses
    """
    return collect_ora2_data(course_id, True)


def push_ora2_responses_to_s3(_xmodule_instance_args, _entry_id, course_id, _task_input, action_name):
    """
    Collect ora2 responses and upload them to S3 as a CSV, without email addresses.  Pass is_anonymous = True
    """
    # push_ora2_responses_to_s3_base(_xmodule_instance_args, u'ORA2_responses_anonymous', _entry_id, course_id, _task_input, action_name, True)
    include_email = _task_input['include_email']
    if include_email == 'True':
        filename = u'ORA2_responses_including_email'
        return _push_csv_responses_to_s3(collect_email_ora2_data, filename, course_id, action_name)
    else:
        filename = u'ORA2_responses_anonymous'
        return _push_csv_responses_to_s3(collect_anonymous_ora2_data, filename, course_id, action_name)


def collect_course_forums_data(course_id):
    """
    Given a SlashSeparatedCourseKey course_id, return headers and information
    related to course forums usage such as upvotes, downvotes, and number of posts
    """
    def merge_join_course_forums(threads, responses, comments):
        """
        Performs a merge of sorted threads, responses, comments data
        interleaving the results so the final result is in chronological order
        """
        data = []
        t_index, r_index, c_index = 0, 0, 0
        while (t_index < len(threads) or r_index < len(responses) or c_index < len(comments)):
            # checking out of bounds
            if t_index == len(threads):
                thread_date = date.max
            else:
                thread = threads[t_index]['_id']
                thread_date = date(thread["year"], thread["month"], thread["day"])
            if r_index == len(responses):
                response_date = date.max
            else:
                response = responses[r_index]["_id"]
                response_date = date(response["year"], response["month"], response["day"])
            if c_index == len(comments):
                comment_date = date.max
            else:
                comment = comments[c_index]["_id"]
                comment_date = date(comment["year"], comment["month"], comment["day"])

            if thread_date <= comment_date and thread_date <= response_date:
                data.append(threads[t_index])
                t_index += 1
                continue
            elif response_date <= thread_date and response_date <= comment_date:
                data.append(responses[r_index])
                r_index += 1
                continue
            else:
                data.append(comments[c_index])
                c_index += 1
        return data

    try:
        client = MongoClient(get_mongo_connection_string())
        mongodb = client[FORUMS_MONGO_PARAMS['database']]
        new_threads_query = generate_course_forums_query(course_id, "CommentThread")
        new_responses_query = generate_course_forums_query(course_id, "Comment", False)
        new_comments_query = generate_course_forums_query(course_id, "Comment", True)
        new_threads = mongodb.contents.aggregate(new_threads_query)['result']
        new_responses = mongodb.contents.aggregate(new_responses_query)['result']
        new_comments = mongodb.contents.aggregate(new_comments_query)['result']
    except PyMongoError:
        raise
    for entry in new_responses:
        entry['_id']['type'] = "Response"
    results = merge_join_course_forums(new_threads, new_responses, new_comments)
    parsed_results = [
        [
            "{0}-{1}-{2}".format(result['_id']['year'], result['_id']['month'], result['_id']['day']),
            result['_id']['type'],
            result['posts'],
            result['votes'],
        ]
        for result in results
    ]
    header = ['Date', 'Activity Type', 'Number New', 'Votes']
    return header, parsed_results


def push_course_forums_data_to_s3(_xmodule_instance_args, _entry_id, course_id, _task_input, action_name):
    """
    Collect course forums usage data and upload them to S3 as a CSV
    """
    return _push_csv_responses_to_s3(collect_course_forums_data, u'course_forums_usage', course_id, action_name)


def push_student_forums_data_to_s3(_xmodule_instance_args, _entry_id, course_id, _task_input, action_name):
    """
    Generate student forums report and upload it to s3 as a CSV
    """
    return _push_csv_responses_to_s3(collect_student_forums_data, u'student_forums', course_id, action_name)


def _push_csv_responses_to_s3(csv_fn, filename, course_id, action_name):
    """
    Collect responses and upload them to S3 as a CSV
    """

    start_time = datetime.now(UTC)
    num_attempted = 1
    num_succeeded = 0
    num_failed = 0
    num_total = 1
    curr_step = "Collecting responses"

    def update_task_progress():
        """Return a dict containing info about current task"""
        current_time = datetime.now(UTC)
        progress = {
            'action_name': action_name,
            'attempted': num_attempted,
            'succeeded': num_succeeded,
            'failed': num_failed,
            'total': num_total,
            'duration_ms': int((current_time - start_time).total_seconds() * 1000),
            'step': curr_step,
        }
        from lms.djangoapps.instructor_task.tasks_helper.runner import _get_current_task
        _get_current_task().update_state(state=PROGRESS, meta=progress)

        return progress

    update_task_progress()
    try:
        header, datarows = csv_fn(course_id)
        rows = [header] + [row for row in datarows]
    # Update progress to failed regardless of error type
    except Exception as error:
        TASK_LOG.error(error)
        num_failed = 1
        update_task_progress()
        return UPDATE_STATUS_FAILED
    timestamp_str = start_time.strftime('%Y-%m-%d-%H%M')
    course_id_string = urllib.quote(course_id.to_deprecated_string().replace('/', '_'))
    curr_step = "Uploading CSV"
    update_task_progress()
    upload_csv_to_report_store(
        rows,
        filename,
        course_id,
        start_time,
    )
    num_succeeded = 1
    curr_step = "Task completed successfully"
    update_task_progress()
    return UPDATE_STATUS_SUCCEEDED


def push_student_responses_to_s3(_xmodule_instance_args, _entry_id, course_id, _task_input, action_name):
    """
    For a given `course_id`, generate a responses CSV file for students that
    have submitted problem responses, and store using a `ReportStore`. Once
    created, the files can be accessed by instantiating another `ReportStore` (via
    `ReportStore.from_config()`) and calling `link_for()` on it. Writes are
    buffered, so we'll never write part of a CSV file to S3 -- i.e. any files
    that are visible in ReportStore will be complete ones.
    """
    start_time = datetime.now(UTC)
    try:
        course = get_course_by_id(course_id)
    except ValueError as e:
        TASK_LOG.error(e.message)
        return "failed"
    rows = student_response_rows(course)
    # Generate parts of the file name
    timestamp_str = start_time.strftime("%Y-%m-%d-%H%M")
    course_id_prefix = course_filename_prefix_generator(course_id)
    # Perform the actual upload
    report_store = ReportStore.from_config(config_name='GRADES_DOWNLOAD')
    report_store.store_rows(
        course_id,
        u"{course_id_prefix}_responses_report_{timestamp_str}.csv".format(
            course_id_prefix=course_id_prefix,
            timestamp_str=timestamp_str,
        ),
        rows
    )
    return "succeeded"


def collect_ora2_data(course_id, include_email=False):
    """
    Query MySQL database for aggregated ora2 response data. include_email = False by default
    """
    def extract_answer(raw_answer):
        parts = raw_answer.get('parts', [])
        answer = [
            part.get('text', '')
            for part in parts
        ]
        answer = ORA2_ANSWER_PART_SEPARATOR.join(answer)
        return answer

    # pylint: disable=invalid-name
    def ora2_data_queries(include_email):
        """
        Wraps a raw SQL query which retrieves all ORA2 responses for a course.
        """

        RAW_QUERY = dedent(
            """
            SET SESSION group_concat_max_len = 1000000;
            SELECT `sub`.`uuid` AS `submission_uuid`,
            `student`.`item_id` AS `item_id`,
            {id_column},
            `sub`.`submitted_at` AS `submitted_at`,
            `sub`.`raw_answer` AS `raw_answer`,
            (
                SELECT GROUP_CONCAT(
                    CONCAT(
                        "Assessment #", `assessment`.`id`,
                        " -- scored_at: ", `assessment`.`scored_at`,
                        " -- type: ", `assessment`.`score_type`,
                        " -- scorer_id: ", `assessment`.`scorer_id`,
                        IF(
                            `assessment`.`feedback` != "",
                            CONCAT(" -- overall_feedback: ", `assessment`.`feedback`),
                            ""
                        )
                    )
                    SEPARATOR '\n'
                )
                FROM `assessment_assessment` AS `assessment`
                WHERE `assessment`.`submission_uuid`=`sub`.`uuid`
                ORDER BY `assessment`.`scored_at` ASC
            ) AS `assessments`,
            (
                SELECT GROUP_CONCAT(
                    CONCAT(
                        "Assessment #", `assessment`.`id`,
                        " -- ", `criterion`.`label`,
                        IFNULL(CONCAT(": ", `option`.`label`, " (", `option`.`points`, ")"), ""),
                        IF(
                            `assessment_part`.`feedback` != "",
                            CONCAT(" -- feedback: ", `assessment_part`.`feedback`),
                            ""
                        )
                    )
                    SEPARATOR '\n'
                )
                FROM `assessment_assessment` AS `assessment`
                JOIN `assessment_assessmentpart` AS `assessment_part`
                ON `assessment_part`.`assessment_id`=`assessment`.`id`
                JOIN `assessment_criterion` AS `criterion`
                ON `criterion`.`id`=`assessment_part`.`criterion_id`
                LEFT JOIN `assessment_criterionoption` AS `option`
                ON `option`.`id`=`assessment_part`.`option_id`
                WHERE `assessment`.`submission_uuid`=`sub`.`uuid`
                ORDER BY `assessment`.`scored_at` ASC, `criterion`.`order_num` DESC
            ) AS `assessments_parts`,
            (
                SELECT `created_at`
                FROM `submissions_score` AS `score`
                WHERE `score`.`submission_id`=`sub`.`id`
                ORDER BY `score`.`created_at` DESC LIMIT 1
            ) AS `final_score_given_at`,
            (
                SELECT `points_earned`
                FROM `submissions_score` AS `score`
                WHERE `score`.`submission_id`=`sub`.`id`
                ORDER BY `score`.`created_at` DESC LIMIT 1
            ) AS `final_score_points_earned`,
            (
                SELECT `points_possible`
                FROM `submissions_score` AS `score`
                WHERE `score`.`submission_id`=`sub`.`id`
                ORDER BY `score`.`created_at` DESC LIMIT 1
            ) AS `final_score_points_possible`,
            (
                SELECT GROUP_CONCAT(`feedbackoption`.`text` SEPARATOR '\n')
                FROM `assessment_assessmentfeedbackoption` AS `feedbackoption`
                JOIN `assessment_assessmentfeedback_options` AS `feedback_join`
                ON `feedback_join`.`assessmentfeedbackoption_id`=`feedbackoption`.`id`
                JOIN `assessment_assessmentfeedback` AS `feedback`
                ON `feedback`.`id`=`feedback_join`.`assessmentfeedback_id`
                WHERE `feedback`.`submission_uuid`=`sub`.`uuid`
            ) AS `feedback_options`,
            (
                SELECT `feedback_text`
                FROM `assessment_assessmentfeedback` as `feedback`
                WHERE `feedback`.`submission_uuid`=`sub`.`uuid`
                LIMIT 1
            ) AS `feedback`
            FROM `submissions_submission` AS `sub`
            JOIN `submissions_studentitem` AS `student` ON `sub`.`student_item_id`=`student`.`id`
            WHERE `student`.`item_type`="openassessment" AND `student`.`course_id`=%s
            """
        )
        if include_email:
            id_column = """
            (
                SELECT `auth_user`.`email`
                FROM `auth_user`
                JOIN `student_anonymoususerid` AS `anonymous`
                ON `auth_user`.`id` = `anonymous`.`user_id`
                WHERE `student`.`student_id` = `anonymous`.`anonymous_user_id`
            ) AS `email`
            """
        else:
            id_column = "`student`.`student_id` AS `anonymized_student_id`"
        return RAW_QUERY.format(id_column=id_column)

    # pylint: enable=invalid-name
    cursor = get_read_replica_cursor_if_available(db)
    #Syntax unsupported by other vendors such as SQLite test db
    if db.connection.vendor != 'mysql':
        return '', ['']
    raw_queries = ora2_data_queries(include_email).split(';')
    cursor.execute(raw_queries[0])
    cursor.execute(raw_queries[1], [course_id])
    header = [item[0] for item in cursor.description]
    header.append('formatted_answer')
    raw_answer_index = header.index('raw_answer')
    data = cursor.fetchall()
    data_rows = []
    for row in data:
        raw_answer = row[raw_answer_index]
        cleaned_answer = json.dumps(json.loads(raw_answer), ensure_ascii=False)
        formatted_answer = extract_answer(json.loads(cleaned_answer))
        data_rows.append(list(row) + [formatted_answer])
    return header, data_rows


def generate_course_forums_query(course_id, query_type, parent_id_check=None):
    """
    We can make one of 3 possible queries: CommentThread, Comment, or Response
    CommentThread is specified by _type
    Response, Comment are both _type="Comment". Comment differs in that it has a
    parent_id, so parent_id_check is set to True for Comments.
    """
    query = [
        {
            '$match': {
                'course_id': course_id.to_deprecated_string(),
                '_type': query_type,
            },
        },
        {
            '$project': {
                'year': {
                    '$year': '$created_at',
                },
                'month': {
                    '$month': '$created_at',
                },
                'day': {
                    '$dayOfMonth': '$created_at',
                },
                'type': '$_type',
                'votes': '$votes',
            },
        },
        {
            '$group': {
                '_id': {
                    'year': '$year',
                    'month': '$month',
                    'day': '$day',
                    'type': '$type',
                },
                'posts': {
                    '$sum': 1,
                },
                'votes': {
                    '$sum': '$votes.up_count',
                },
            },
        },
        # order of the sort is important so we use SON
        {
            '$sort': SON([
                ('_id.year', 1),
                ('_id.month', 1),
                ('_id.day', 1),
            ]),
        },
    ]
    if query_type == 'Comment':
        if parent_id_check is not None:
            query[0]['$match']['parent_id'] = {
                '$exists': parent_id_check,
            }
    return query


def collect_anonymous_ora2_data(course_id):
    """
    Call collect_ora2_data for anonymized, aggregated ORA2 response data.
    """
    return collect_ora2_data(course_id, False)


def upload_ora2_data(
        _xmodule_instance_args, _entry_id, course_id, _task_input, action_name
):
    """
    Collect ora2 responses and upload them to S3 as a CSV
    """

    start_date = datetime.now(UTC)
    start_time = time()
    num_attempted = 1
    num_total = 1
    fmt = u'Task: {task_id}, InstructorTask ID: {entry_id}, Course: {course_id}, Input: {task_input}'
    task_info_string = fmt.format(
        task_id=_xmodule_instance_args.get('task_id') if _xmodule_instance_args is not None else None,
        entry_id=_entry_id,
        course_id=course_id,
        task_input=_task_input
    )
    TASK_LOG.info(u'%s, Task type: %s, Starting task execution', task_info_string, action_name)
    task_progress = TaskProgress(action_name, num_total, start_time)
    task_progress.attempted = num_attempted
    curr_step = {'step': "Collecting responses"}
    TASK_LOG.info(
        u'%s, Task type: %s, Current step: %s for all submissions',
        task_info_string,
        action_name,
        curr_step,
    )
    task_progress.update_task_state(extra_meta=curr_step)
    try:
        header, datarows = OraAggregateData.collect_ora2_data(course_id)
        rows = [header] + [row for row in datarows]
    # Update progress to failed regardless of error type
    except Exception:  # pylint: disable=broad-except
        TASK_LOG.exception('Failed to get ORA data.')
        task_progress.failed = 1
        curr_step = {'step': "Error while collecting data"}
        task_progress.update_task_state(extra_meta=curr_step)
        return UPDATE_STATUS_FAILED
    task_progress.succeeded = 1
    curr_step = {'step': "Uploading CSV"}
    TASK_LOG.info(
        u'%s, Task type: %s, Current step: %s',
        task_info_string,
        action_name,
        curr_step,
    )
    task_progress.update_task_state(extra_meta=curr_step)
    upload_csv_to_report_store(rows, 'ORA_data', course_id, start_date)
    curr_step = {'step': 'Finalizing ORA data report'}
    task_progress.update_task_state(extra_meta=curr_step)
    TASK_LOG.info(u'%s, Task type: %s, Upload complete.', task_info_string, action_name)
    return UPDATE_STATUS_SUCCEEDED


def student_response_rows(course):
    """ Wrapper to return all (header and data) rows for student responses reports for a course """
    header = ["Section", "Subsection", "Unit", "Problem", "Order In Course", "Location", "Student", "Response"]
    rows = chain([header], student_responses(course))
    return rows
