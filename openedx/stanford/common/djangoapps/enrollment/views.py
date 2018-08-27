"""
API to update user enrollments
"""
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
from student.auth import user_has_role
from student.roles import CourseStaffRole


class EnrollmentStatusView(APIView):
    """
    Update user enrollment for a particular course.
    """
    authentication_classes = OAuth2Authentication,
    permission_classes = (ApiKeyHeaderPermission,)

    @method_decorator(require_post_params(['email', 'course_id', 'action']))
    @method_decorator(ensure_csrf_cookie_cross_domain)
    def post(self, request):
        """
        Endpoint to update a user enrollment in a course. Requires staff access.

        **Example Request**

            POST /api/enrollment/v1/status
            {
                'email': 'foo@bar.com',
                'course_id': 'course-v1:foo+bar+foobar',
                'action': 'enroll',
                'email_students': false,
                'auto_enroll': true
            }
        """
        try:
            course_id = request.data['course_id']
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
        email = request.data['email']
        try:
            validate_email(email)
        except ValidationError:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={
                    'message': u'Invalid email address',
                },
            )
        action = request.data['action']
        email_students = request.POST.get('email_students', False) in ['true', 'True', True]
        auto_enroll = request.POST.get('auto_enroll', False) in ['true', 'True', True]
        email_params = {}
        language = None
        if email_students:
            course = get_course_by_id(course_key)
            email_params = get_email_params(course, auto_enroll)
            if User.objects.filter(email=email).exists():
                user = User.objects.get(email=email)
                language = get_user_email_language(user)
        if action == 'enroll':
            enroll_email(
                course_key, email, auto_enroll, email_students, email_params, language=language
            )
            return Response(status=status.HTTP_204_NO_CONTENT)
        elif action == 'unenroll':
            unenroll_email(
                course_key, email, email_students, email_params, language=language
            )
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={
                    'message': u'Unrecognized action',
                },
            )
