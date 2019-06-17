"""
Views related to bulk update operations on course problems
"""

from django.core.exceptions import PermissionDenied
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.http import HttpResponseNotFound

from edxmako.shortcuts import render_to_response
from student.auth import has_course_author_access
from util.json_request import JsonResponse
from xmodule.capa_base import CapaFields
from xmodule.modulestore.django import modulestore
from opaque_keys.edx.keys import CourseKey

from cms.djangoapps.contentstore.utils import reverse_course_url
from .tasks import bulk_update_problem_settings

SHOW_ANSWER_OPTIONS = [
    value['value']
    for value in CapaFields.__dict__['showanswer'].values
]
DEFAULT_MAX_ATTEMPTS = 0
DEFAULT_SHOW_ANSWER = SHOW_ANSWER_OPTIONS[0]


__all__ = [
    'utility_bulkupdate_handler',
]


def _utility_bulkupdate_get_handler(course_key_string):
    """
    Internal bulkupdate handler for GET operation
    """
    advanced_settings_url = reverse_course_url(
        'advanced_settings_handler',
        course_key_string
    )
    course_outline_url = reverse_course_url(
        'course_handler',
        course_key_string
    )
    bulkupdate_url = reverse(
        'utility_bulkupdate_handler',
        kwargs={
            'course_key_string': course_key_string,
        },
    )

    course_key = CourseKey.from_string(course_key_string)
    course = modulestore().get_course(course_key, 3)

    return render_to_response(
        'bulkupdate.html',
        {
            'context_course': course,
            'advanced_settings_url': advanced_settings_url,
            'course_outline_url': course_outline_url,
            'bulkupdate_url': bulkupdate_url,
            'default_max_attempts': DEFAULT_MAX_ATTEMPTS,
            'default_show_answer': DEFAULT_SHOW_ANSWER,
            'show_answer_options': SHOW_ANSWER_OPTIONS,
        }
    )


def _utility_bulkupdate_post_handler(request, course_key_string):
    """
    Internal bulkupdate handler for POST operation
    """
    modified_settings = {}
    try:
        max_attempts = request.POST.get('maxAttempts')
        showanswer = request.POST.get('showAnswer')
    except KeyError:
        return JsonResponse(
            {
                'ErrMsg': 'Request is missing some or all settings as parameters'
            },
            status=400,
        )

    # Validate settings
    if max_attempts:
        try:
            max_attempts = int(max_attempts)
        except ValueError:
            return JsonResponse(
                {
                    'ErrMsg': 'Given value for max attempts is not an integer'
                },
                status=400,
            )
        if max_attempts < 0:
            return JsonResponse(
                {
                    'ErrMsg': 'Given value for max attempts is negative'
                },
                status=400,
            )
        else:
            modified_settings['max_attempts'] = max_attempts

    if showanswer:
        if showanswer in SHOW_ANSWER_OPTIONS:
            modified_settings['showanswer'] = showanswer
        else:
            return JsonResponse(
                {
                    'ErrMsg': 'Given value for show answer is not an available option'
                },
                status=400,
            )

    user = request.user
    user_fields = {
        'email': user.email,
        'id': user.id,
        'username': user.username,
    }
    # Call celery tasks to perform bulk update operations
    bulk_update_problem_settings.delay(course_key_string, user_fields, modified_settings)

    return JsonResponse({'Status': 'OK'})


@login_required
def utility_bulkupdate_handler(request, course_key_string):
    """
    Handle bulk update requests in the utilities tool

    Currently updates max_attempts and showanswer for all problems in a
    given course and sets as settings for future problems in advanced
    settings
    """
    course_key = CourseKey.from_string(course_key_string)
    if not has_course_author_access(request.user, course_key):
        raise PermissionDenied()

    if request.method == 'GET':
        return _utility_bulkupdate_get_handler(course_key_string)
    elif request.method == 'POST':
        return _utility_bulkupdate_post_handler(request, course_key_string)
    else:
        return HttpResponseNotFound()
