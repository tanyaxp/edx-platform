"""
Perform bulk operations on course problems via asynchronous tasks
"""

import logging

from celery import task
from django.conf import settings
from django.core.mail import send_mail
from smtplib import SMTPException
from django.core.urlresolvers import reverse

from edxmako.shortcuts import render_to_string
from xmodule.modulestore.django import modulestore
from opaque_keys.edx.keys import CourseKey

from cms.djangoapps.cms_user_tasks.tasks import send_task_complete_email

log = logging.getLogger('edx.celery.task')


def _send_email_on_completion(course, user_fields, modified_settings, success):
    """
    Send email to user on completion of task, either success or failure
    """
    task_name = 'bulk settings update'
    task_state_text = 'success'
    dest_addr = user_fields['email']
    try:
        detail_url = reverse('utility_bulksettings_handler',kwargs={'course_key_string': course.id,})
        if success:
            send_task_complete_email.delay(task_name, task_state_text, dest_addr, detail_url)

    except SMTPException:
        log.error('Failure sending e-mail for bulk update completion to %s', user_fields['email'])

def _update_metadata(course_key, user_fields, metadata):
    """
    Update settings for all existing problems of a given course
    """
    store = modulestore()
    problems = store.get_items(
        course_key,
        qualifiers={'category': 'problem'},
    )
    with store.bulk_operations(course_key):
        for problem in problems:
            for metadata_key, value in metadata.items():
                field = problem.fields[metadata_key]
                try:
                    if metadata_key == 'max_attempts':
                        if problem.max_attempts != value:
                            value = field.from_json(value)
                            field.write_to(problem, value)

                    if metadata_key == 'showanswer':
                        if problem.showanswer != value:
                            value = field.from_json(value)
                            field.write_to(problem, value)

                except Exception as exception:  # pylint: disable=broad-except
                    log.error(exception)
            store.update_item(problem, user_fields['id'])
            if store.has_published_version(problem):
                store.publish(problem.location, user_fields['id'])


def _update_advanced_settings(course, user_fields, modified_settings):
    """
    Update the advanced settings for a given course
    """
    store = modulestore()
    course_key = course.id
    try:
        with store.bulk_operations(course_key):
            for key, value in modified_settings.iteritems():
                setattr(course, key, value)
            store.update_item(course, user_fields['id'])
    except Exception as exception:  # pylint: disable=broad-except
        log.error(exception)


@task()
def bulk_update_problem_settings(course_key_string, user_fields, modified_settings):
    """
    Update all problem settings and advanced settings
    """
    store = modulestore()
    course_key = CourseKey.from_string(course_key_string)
    course = store.get_course(course_key, 3)
    success = True
    try:
        _update_metadata(course_key, user_fields, modified_settings)
        _update_advanced_settings(course, user_fields, modified_settings)
    except Exception as exception:  # pylint: disable=broad-except
        log.error(exception)
        success = False
    _send_email_on_completion(course, user_fields, modified_settings, success)
