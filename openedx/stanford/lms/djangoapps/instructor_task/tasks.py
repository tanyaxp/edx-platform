from functools import partial

from celery import task
from django.conf import settings
from django.utils.translation import ugettext_noop

from lms.djangoapps.instructor_task.tasks_base import BaseInstructorTask
from lms.djangoapps.instructor_task.tasks_helper.runner import run_main_task

from openedx.stanford.lms.djangoapps.instructor_task import tasks_helper as helper


@task(base=BaseInstructorTask, routing_key=settings.COURSE_FORUMS_DOWNLOAD_ROUTING_KEY)
def get_course_forums_usage_task(entry_id, xmodule_instance_args):
    """
    Generate a CSV of course forums usage and push it to S3.
    """
    task = _run_task(entry_id, helper.push_course_forums_data_to_s3, xmodule_instance_args)
    return task


@task(base=BaseInstructorTask, routing_key=settings.ORA2_RESPONSES_DOWNLOAD_ROUTING_KEY)
def get_ora2_responses_task(entry_id, xmodule_instance_args):
    """
    Generate a CSV of ora2 responses and push it to S3.
    """
    task = _run_task(entry_id, helper.push_ora2_responses_to_s3, xmodule_instance_args)
    return task


@task(base=BaseInstructorTask, routing_key=settings.STUDENT_FORUMS_DOWNLOAD_ROUTING_KEY)
def get_student_forums_usage_task(entry_id, xmodule_instance_args):
    """
    Generate a CSV of student forums usage and push it to S3.
    """
    task = _run_task(entry_id, helper.push_student_forums_data_to_s3, xmodule_instance_args)
    return task


@task(base=BaseInstructorTask, routing_key=settings.STUDENT_RESPONSES_DOWNLOAD_ROUTING_KEY)
def get_student_responses_task(entry_id, xmodule_instance_args):
    """
    Generate a CSV file of student responses to all course problems and store in S3.
    """
    task = _run_task(entry_id, helper.push_student_responses_to_s3, xmodule_instance_args)
    return task


def _run_task(entry_id, push_to_s3, xmodule_instance_args):
    action_name = ugettext_noop('generated')
    task_fn = partial(push_to_s3, xmodule_instance_args)
    task = run_main_task(entry_id, task_fn, action_name)
    return task
