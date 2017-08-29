"""
Internal methods and celery task related to bulk update operations on course problems
"""

import logging

from celery import task
from django.conf import settings
from django.core.mail import send_mail
from smtplib import SMTPException

from edxmako.shortcuts import render_to_string
from xmodule.modulestore.django import modulestore

from opaque_keys.edx.keys import CourseKey


log = logging.getLogger('edx.celery.task')


def _send_email_on_completion(course, user_fields, modified_settings, success):
    """
    Send email to user on completion of task, either success or failure
    """
    context = {
        'username': user_fields['username'],
        'course_name': course.display_name,
        'modified_settings': modified_settings,
        'success': success,
    }

    from_email = settings.DEFAULT_FROM_EMAIL
    subject = render_to_string('emails/utilities_bulk_update_done_subject.txt', context)
    subject = ''.join(subject.splitlines())
    message = render_to_string('emails/utilities_bulk_update_done_message.txt', context)

    try:
        send_mail(
            subject,
            message,
            from_email,
            [user_fields['email']],
            fail_silently=False,
        )
    except SMTPException:
        log.error("Failure sending e-mail for bulk update completion to %s", user_fields['email'])


def _update_metadata(course_key, user_fields, metadata):
    """
    Update settings for all existing problems of a given course
    """
    store = modulestore()
    problems = store.get_items(
        course_key,
        qualifiers={"category": 'problem'},
    )
    with store.bulk_operations(course_key):
        for problem in problems:
            for metadata_key, value in metadata.items():
                field = problem.fields[metadata_key]
                try:
                    value = field.from_json(value)
                    field.write_to(problem, value)
                except Exception as exception:  # pylint: disable=broad-except
                    log.error(exception)
            store.update_item(problem, user_fields['id'])
            if store.has_published_version(problem):
                store.publish(problem.location, user_fields['id'])


def _update_advanced_settings(course_key, user_fields, modified_settings):
    """
    Update the advanced settings for a given course
    """
    store = modulestore()
    course = store.get_course(course_key, 3)
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
    Update all problem settings and advanced settings, can be called as celery task:
    bulk_update_problem_settings.delay(course_key_string, user_fields, modified_settings)
    """
    store = modulestore()
    course_key = CourseKey.from_string(course_key_string)
    try:
        _update_metadata(course_key, user_fields, modified_settings)
        _update_advanced_settings(course_key, user_fields, modified_settings)
        success = True
    except Exception as exception:  # pylint: disable=broad-except
        log.error(exception)
        success = False
    course = store.get_course(course_key, 3)
    _send_email_on_completion(course, user_fields, modified_settings, success)
