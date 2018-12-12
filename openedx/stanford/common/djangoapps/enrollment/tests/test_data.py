"""
Test the Data Aggregation Layer for Course Enrollments.

"""
import unittest

from django.conf import settings

from openedx.stanford.common.djangoapps.enrollment import data
from student.models import CourseEnrollment
from student.roles import CourseStaffRole
from student.tests.factories import UserFactory
from student.tests.factories import UserProfileFactory
from xmodule.modulestore.tests.django_utils import ModuleStoreTestCase
from xmodule.modulestore.tests.factories import CourseFactory


@unittest.skipUnless(settings.ROOT_URLCONF == 'lms.urls', 'Test only valid in lms')
class RosterDataTest(ModuleStoreTestCase):
    """
    Test course roster data aggregation api.
    """
    STUDENT_USERNAME = 'aBob'
    STUDENT_NAME = 'Bob Student'
    STUDENT_EMAIL = 'bob@example.com'
    STUDENT_PASSWORD = 'edx'
    STAFF_USERNAME = 'zJoe'
    STAFF_NAME = 'Joe Staff'
    STAFF_EMAIL = 'joe@example.com'
    STAFF_PASSWORD = 'edx'

    def setUp(self):
        """
        Create a course, and enroll a student user and staff user.
        """
        super(RosterDataTest, self).setUp()
        self.course = CourseFactory.create()
        self.course_key = self.course.id

        self.student = UserFactory.build(
            username=self.STUDENT_USERNAME,
            email=self.STUDENT_EMAIL,
            password=self.STUDENT_PASSWORD,
        )
        self.student.save()
        UserProfileFactory.create(user=self.student, name=self.STUDENT_NAME)

        self.staff = UserFactory.build(
            username=self.STAFF_USERNAME,
            email=self.STAFF_EMAIL,
            password=self.STAFF_PASSWORD,
        )
        self.staff.save()
        UserProfileFactory.create(user=self.staff, name=self.STAFF_NAME)

        CourseEnrollment.enroll(self.student, self.course_key, mode="honor")
        CourseEnrollment.enroll(self.staff, self.course_key, mode="honor")
        CourseStaffRole(self.course_key).add_users(self.staff)

    def test_roster(self):

        roster = data.get_roster(unicode(self.course_key))
        self.assertEquals(roster[0]['username'], self.STUDENT_USERNAME)
        self.assertEquals(roster[0]['name'], self.STUDENT_NAME)
        self.assertEquals(roster[0]['email'], self.STUDENT_EMAIL)
        self.assertEquals(roster[0]['is_staff'], 0)
        self.assertEquals(roster[1]['username'], self.STAFF_USERNAME)
        self.assertEquals(roster[1]['name'], self.STAFF_NAME)
        self.assertEquals(roster[1]['email'], self.STAFF_EMAIL)
        self.assertEquals(roster[1]['is_staff'], 1)
