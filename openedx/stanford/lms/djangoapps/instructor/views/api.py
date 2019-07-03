import gzip
import logging
import re
import StringIO
import urllib2

from django.conf import settings
from django.contrib.auth.models import User
from django.db import transaction
from django.utils.translation import ugettext as _
from django.views.decorators.cache import cache_control
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST

from lms.djangoapps.instructor.views.api import require_level
from lms.djangoapps.instructor_analytics.csvs import create_csv_response
from lms.djangoapps.instructor_task.api_helper import AlreadyRunningError
from lms.djangoapps.instructor_task.models import ReportStore
from opaque_keys.edx import locator
from opaque_keys.edx.keys import CourseKey
from opaque_keys.edx.locations import SlashSeparatedCourseKey
from student.models import unique_id_for_user
from util.json_request import JsonResponse

from openedx.stanford.lms.djangoapps.instructor.lti_grader import LTIGrader
from openedx.stanford.lms.djangoapps.instructor.views.tools import generate_course_forums_d3
from openedx.stanford.lms.djangoapps.instructor_task import api


EXTRA_INSTRUCTOR_POST_ENDPOINTS = {
    'delete_report_download',
    'get_course_forums_usage',
    'get_ora2_responses',
    'get_student_forums_usage',
    'get_student_responses',
    'graph_course_forums_usage',
}
LOG = logging.getLogger('stanford.instructor.api')


@require_POST
@ensure_csrf_cookie
@cache_control(no_cache=True, no_store=True, must_revalidate=True)
@require_level('staff')
def delete_report_download(request, course_id):
    """
    Delete a downloaded report from the Instructor Dashboard
    """
    course_id = SlashSeparatedCourseKey.from_string(course_id)
    filename = request.POST.get('filename')
    report_store = ReportStore.from_config(config_name='GRADES_DOWNLOAD')
    report_store.delete_file(course_id, filename)
    message = {
        'status': _('The report was successfully deleted!'),
    }
    return JsonResponse(message)


@ensure_csrf_cookie
@cache_control(no_cache=True, no_store=True, must_revalidate=True)
@require_level('staff')
def get_blank_lti(request, course_id):  # pylint: disable=unused-argument
    """
    Respond with CSV output

    - ID
    - email
    - grade (blank)
    - max_grade (blank)
    - comments (blank)
    """
    course_id = CourseKey.from_string(course_id)
    students = User.objects.filter(
        courseenrollment__course_id=course_id,
    ).order_by('id')
    header = [
        'ID',
        'Anonymized User ID',
        'email',
        'grade',
        'max_grade',
        'comments',
    ]
    encoded_header = [
        unicode(s).encode('utf-8')
        for s in header
    ]
    rows = [
        [
            student.id,
            unique_id_for_user(student, save=False),
            student.email,
            '',
            '',
            '',
        ]
        for student in students
    ]
    csv_filename = "{course_id}-blank-grade-submission.csv".format(
        course_id=unicode(course_id).replace('/', '-'),
    )
    return create_csv_response(csv_filename, encoded_header, rows)


@require_POST
@transaction.non_atomic_requests
@ensure_csrf_cookie
@cache_control(no_cache=True, no_store=True, must_revalidate=True)
@require_level('staff')
def get_course_forums_usage_view(request, course_id):
    """
    Push a Celery task to aggregate course forums statistics into a .csv
    """
    course_key = SlashSeparatedCourseKey.from_deprecated_string(course_id)
    try:
        api.request_report(request, course_key, 'course_forums_usage')
    except AlreadyRunningError:
        status = _(
            'A course forums usage report task is already in '
            'progress. Check the "Pending Instructor Tasks" table '
            'for the status of the task. When completed, the report '
            'will be available for download in the table below.'
        )
    else:
        status = _('The course forums usage report is being generated.')
    response = JsonResponse({
        'status': status,
    })
    return response


@require_POST
@transaction.non_atomic_requests
@ensure_csrf_cookie
@cache_control(no_cache=True, no_store=True, must_revalidate=True)
@require_level('staff')
def get_ora2_responses_view(request, course_id, include_email):
    """
    Push a Celery task to aggregate ORA2 responses into a .csv
    """
    course_key = locator.CourseLocator.from_string(course_id)
    try:
        api.request_report(
            request,
            course_key,
            'ora2_responses',
            include_email=include_email,
        )
    except AlreadyRunningError:
        status = _(
            'An ORA2 responses report generation task is already in progress. '
            'Check the "Pending Instructor Tasks" table '
            'for the status of the task. '
            'When completed, the report will be available '
            'for download in the table below.'
        )
    else:
        status = _('The ORA2 responses report is being generated.')
    response = JsonResponse({
        'status': status,
    })
    return response


@require_POST
@transaction.non_atomic_requests
@ensure_csrf_cookie
@cache_control(no_cache=True, no_store=True, must_revalidate=True)
@require_level('staff')
def get_student_forums_usage_view(request, course_id):
    """
    Push a Celery task to aggregate student forums usage statistics into a .csv
    """
    course_key = SlashSeparatedCourseKey.from_deprecated_string(course_id)
    try:
        api.request_report(request, course_key, 'student_forums')
    except AlreadyRunningError:
        status = _(
            'A student forums usage report task is already in progress. '
            'Check the "Pending Instructor Tasks" table for the status of the task. '
            'When completed, the report will be available for download '
            'in the table below.'
        )
    else:
        status = _('The student forums usage report is being generated.')
    response = JsonResponse({
        'status': status,
    })
    return response


@transaction.non_atomic_requests
@require_POST
@ensure_csrf_cookie
@cache_control(no_cache=True, no_store=True, must_revalidate=True)
@require_level('staff')
def get_student_responses_view(request, course_id):
    """
    Raise AlreadyRunningError if student response CSV is still being generated
    """
    course_key = SlashSeparatedCourseKey.from_deprecated_string(course_id)
    try:
        api.request_report(request, course_key, 'student_responses')
    except AlreadyRunningError:
        status = _(
            'A learner responses report generation task is already in progress. '
            'Check the "Pending Instructor Tasks" table for the status of the task. '
            'When completed, the report will be available for download '
            'in the table below.'
        )
    else:
        status = _('The learner responses report is being generated.')
    response = JsonResponse({
        'status': status,
    })
    return response


@require_POST
@transaction.non_atomic_requests
@ensure_csrf_cookie
@cache_control(no_cache=True, no_store=True, must_revalidate=True)
@require_level('staff')
def graph_course_forums_usage(request, course_id):
    """
    Generate a d3 graphable csv-string by checking the report store for the clicked_on file
    """
    clicked_text = request.POST.get('clicked_on')
    course_key = SlashSeparatedCourseKey.from_deprecated_string(course_id)
    report_store = ReportStore.from_config(config_name='GRADES_DOWNLOAD')
    graph = None
    if clicked_text:
        for name, url in report_store.links_for(course_key):
            if clicked_text in name and 'course_forums' in name:
                request = urllib2.Request(url)
                request.add_header('Accept-encoding', 'gzip')
                try:
                    url_handle = urllib2.urlopen(request)
                    if url_handle.info().get('Content-Encoding') == 'gzip':
                        file_buffer = StringIO.StringIO(url_handle.read())
                        url_handle = gzip.GzipFile(fileobj=file_buffer)
                    graph = generate_course_forums_d3(url_handle)
                except Exception as error:
                    LOG.error(
                        "Error opening graph_course_forums_usage data report: %s",
                        error,
                    )
                break
    if graph:
        response = JsonResponse({
            'data': graph,
            'filename': clicked_text,
        })
    else:
        response = JsonResponse({
            'data': 'failure',
        })
    return response


@ensure_csrf_cookie
@cache_control(no_cache=True, no_store=True, must_revalidate=True)
@require_level('staff')
def upload_lti(request, course_id):
    """
    Update grades for the LTI component specified by processing the uploaded csv file

    :param request: POST request containing lti-key, lti-secret, and the lti-grades data file
    :param course_id: the id of the course containing the lti component
    :return: JsonResponse with the status from the LTIGrader
    """
    lti_base_url = re.sub(
        r'\{anon_user_id\}',
        '',
        request.POST.get('lti-endpoint'),
    )
    lti_key = request.POST.get('lti-key')
    lti_secret = request.POST.get('lti-secret')
    lti_grader = LTIGrader(course_id, lti_base_url, lti_key, lti_secret)
    status = lti_grader.update_grades(request.FILES['lti-grades'])
    response = JsonResponse({'status': status})
    return response
