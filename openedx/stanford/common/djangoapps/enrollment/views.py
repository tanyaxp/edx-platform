"""
API to update user enrollments
"""
import json

from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.decorators import method_decorator
from opaque_keys import InvalidKeyError
from opaque_keys.edx.keys import CourseKey
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_oauth.authentication import OAuth2Authentication

from courseware.courses import get_course_by_id
from lms.djangoapps.instructor.enrollment import (
    enroll_email,
    get_email_params,
    get_user_email_language,
    unenroll_email,
)
from openedx.core.djangoapps.cors_csrf.decorators import ensure_csrf_cookie_cross_domain
from openedx.core.djangoapps.user_api.helpers import require_post_params
from openedx.core.lib.api.permissions import ApiKeyHeaderPermission
from openedx.core.lib.api.permissions import ApiKeyHeaderPermissionIsAuthenticated
from student.auth import user_has_role
from student.roles import CourseStaffRole
from enrollment.views import ApiKeyPermissionMixIn
from openedx.stanford.common.djangoapps.enrollment.data import get_roster


def _enroll(course_key, email, auto_enroll, email_students, email_params, language):
    enroll_email(
        course_key, email, auto_enroll, email_students, email_params, language=language
    )
    return Response(status=status.HTTP_204_NO_CONTENT)

def _unenroll(course_key, email, email_students, email_params, language):
    unenroll_email(
        course_key, email, email_students, email_params, language=language
    )
    return Response(status=status.HTTP_204_NO_CONTENT)


class EnrollmentRosterView(APIView, ApiKeyPermissionMixIn):
    """
    Read roster for a particular course. (contains PII)
    """
    authentication_classes = OAuth2Authentication,
    permission_classes = ApiKeyHeaderPermissionIsAuthenticated,

    @method_decorator(ensure_csrf_cookie_cross_domain)
    def get(self, request, course_id=None):
        """
        List a course's enrollment roster; requires staff access

        **Example Request**
            GET /api/enrollment/v1/roster/course-v1:foo+bar+foobar
            { }
        """
        try:
            course_key = CourseKey.from_string(course_id)
        except InvalidKeyError:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={
                    'message': u'Invalid or missing course_id',
                },
            )
        if not user_has_role(request.user, CourseStaffRole(course_key)):
            return Response(
                status=status.HTTP_403_FORBIDDEN,
                data={"message": u"User does not have permission to view roster for [{course_id}].".format(course_id=course_id)},
            )
        roster = get_roster(course_id)
        return Response(data=json.dumps({'roster': roster}))

    @method_decorator(ensure_csrf_cookie_cross_domain)
    def post(self, request, course_id):
        """
        Enroll/unenroll a user in a course; requires staff access

        **Example Request**
            POST /api/enrollment/v1/roster/course-v1:foo+bar+foobar
            {
                'email': 'foo@bar.com',
                'action': 'enroll',
                'email_students': false,
                'auto_enroll': true
            }
        """
        action = request.data.get('action')
        if action == 'enroll':
            return self.put(request, course_id)
        if action == 'unenroll':
            return self.delete(request, course_id)
        return Response(
            status=status.HTTP_400_BAD_REQUEST,
            data={
                'message': u'Unrecognized action',
            },
        )

    def put(self, request, course_id):
        """
        Enroll a user in a course; requires staff access

        **Example Request**
            PUT /api/enrollment/v1/roster/course-v1:foo+bar+foobar
            {
                'email': 'foo@bar.com',
                'email_students': false,
                'auto_enroll': true
            }
        """
        try:
            course_key = CourseKey.from_string(course_id)
        except InvalidKeyError:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={
                    'message': u'Invalid or missing course_id',
                },
            )
        if not user_has_role(request.user, CourseStaffRole(course_key)):
            return Response(
                status=status.HTTP_403_FORBIDDEN,
                data={
                    'message': u'User does not have permission to update enrollment for [{course_id}].'.format(
                        course_id=course_id,
                    ),
                },
            )
        email = request.data.get('email')
        try:
            validate_email(email)
        except ValidationError:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={
                    'message': u'Invalid email address',
                },
            )
        email_students = request.data.get('email_students', False) in ['true', 'True', True]
        auto_enroll = request.data.get('auto_enroll', False) in ['true', 'True', True]
        email_params = {}
        language = None
        if email_students:
            course = get_course_by_id(course_key)
            email_params = get_email_params(course, auto_enroll)
            if User.objects.filter(email=email).exists():
                user = User.objects.get(email=email)
                language = get_user_email_language(user)
        return _enroll(course_key, email, auto_enroll, email_students, email_params, language)

    def delete(self, request, course_id):
        """
        Unenroll a user from a course; requires staff access

        **Example Request**
            DELETE /api/enrollment/v1/roster/course-v1:foo+bar+foobar
            {
                'email': 'foo@bar.com',
                'email_students': false,
                'auto_enroll': true
            }
        """
        try:
            course_key = CourseKey.from_string(course_id)
        except InvalidKeyError:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={
                    'message': u'Invalid or missing course_id',
                },
            )
        if not user_has_role(request.user, CourseStaffRole(course_key)):
            return Response(
                status=status.HTTP_403_FORBIDDEN,
                data={
                    'message': u'User does not have permission to update enrollment for [{course_id}].'.format(
                        course_id=course_id,
                    ),
                },
            )
        email = request.data.get('email')
        try:
            validate_email(email)
        except ValidationError:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={
                    'message': u'Invalid email address',
                },
            )
        email_students = request.data.get('email_students', False) in ['true', 'True', True]
        auto_enroll = request.data.get('auto_enroll', False) in ['true', 'True', True]
        email_params = {}
        language = None
        if email_students:
            course = get_course_by_id(course_key)
            email_params = get_email_params(course, auto_enroll)
            if User.objects.filter(email=email).exists():
                user = User.objects.get(email=email)
                language = get_user_email_language(user)
        return _unenroll(course_key, email, email_students, email_params, language)
