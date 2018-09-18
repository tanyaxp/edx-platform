"""
URL for enrollment API
"""
from django.conf import settings
from django.conf.urls import patterns, url

from .views import EnrollmentRosterView

urlpatterns = patterns(
    'enrollment.views',
    url(
        r'^roster/{course_key}/?$'.format(course_key=settings.COURSE_ID_PATTERN),
        EnrollmentRosterView.as_view(),
        name='enrollment_roster',
    ),
)
