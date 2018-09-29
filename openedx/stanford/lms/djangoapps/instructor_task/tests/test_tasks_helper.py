from datetime import datetime
import os
import shutil
import urllib

import ddt
from django.conf import settings
from mock import Mock
from mock import patch
from pytz import UTC

from courseware.tests.factories import StudentModuleFactory
from lms.djangoapps.instructor_task.models import ReportStore
from lms.djangoapps.instructor_task.tasks_helper.enrollments import upload_students_csv
from lms.djangoapps.instructor_task.tasks_helper.utils import UPDATE_STATUS_FAILED
from lms.djangoapps.instructor_task.tasks_helper.utils import UPDATE_STATUS_SUCCEEDED
from lms.djangoapps.instructor_task.tests.test_base import InstructorTaskCourseTestCase
from lms.djangoapps.instructor_task.tests.test_base import TestReportMixin
from opaque_keys.edx.locations import Location
from student.tests.factories import CourseEnrollmentFactory, UserFactory
from xmodule.modulestore.tests.django_utils import ModuleStoreTestCase
from xmodule.modulestore.tests.factories import CourseFactory

from openedx.stanford.lms.djangoapps.instructor_task.tasks_helper import push_ora2_responses_to_s3
from openedx.stanford.lms.djangoapps.instructor_task.tasks_helper import push_course_forums_data_to_s3
from openedx.stanford.lms.djangoapps.instructor_task.tasks_helper import push_student_forums_data_to_s3
from openedx.stanford.lms.djangoapps.instructor_task.tasks_helper import push_student_responses_to_s3


TEST_COURSE_ORG = 'edx'
TEST_COURSE_NAME = 'test_course'
TEST_COURSE_NUMBER = '1.23x'


@ddt.ddt
class TestReportStore(TestReportMixin, InstructorTaskCourseTestCase):
    """
    Test the ReportStore models
    """

    def setUp(self):
        super(TestReportStore, self).setUp()
        self.course = CourseFactory.create()

    def test_delete_report(self):
        report_store = ReportStore.from_config(config_name='GRADES_DOWNLOAD')
        task_input = {'features': []}
        links = report_store.links_for(self.course.id)
        self.assertEquals(len(links), 0)
        with patch('lms.djangoapps.instructor_task.tasks_helper.runner._get_current_task'):
            upload_students_csv(None, None, self.course.id, task_input, 'calculated')
        links = report_store.links_for(self.course.id)
        self.assertEquals(len(links), 1)
        filename = links[0][0]
        report_store.delete_file(self.course.id, filename)
        links = report_store.links_for(self.course.id)
        self.assertEquals(len(links), 0)


class TestReponsesReport(TestReportMixin, ModuleStoreTestCase):
    """
    Tests that CSV student responses report generation works.
    """

    def test_unicode(self):
        self.course = CourseFactory.create()
        course_key = self.course.id
        self.problem_location = Location('edX', 'unicode_graded', '2012_Fall', 'problem', 'H1P1')
        self.student = UserFactory(username=u'student\xec')
        CourseEnrollmentFactory.create(user=self.student, course_id=self.course.id)
        StudentModuleFactory.create(
            course_id=self.course.id,
            module_state_key=self.problem_location,
            student=self.student,
            grade=0,
            state=u'{"student_answers":{"fake-problem":"caf\xe9"}}',
        )
        result = push_student_responses_to_s3(None, None, self.course.id, None, 'generated')
        self.assertEqual(result, 'succeeded')


class StanfordReportTestCase(TestReportMixin, InstructorTaskCourseTestCase):
    def setUp(self):
        super(StanfordReportTestCase, self).setUp()
        self.course = CourseFactory.create(
            org=TEST_COURSE_ORG,
            number=TEST_COURSE_NUMBER,
            display_name=TEST_COURSE_NAME,
        )
        self.current_task = Mock()
        self.current_task.update_state = Mock()

    def tearDown(self):
        if os.path.exists(settings.ORA2_RESPONSES_DOWNLOAD['ROOT_PATH']):
            shutil.rmtree(settings.ORA2_RESPONSES_DOWNLOAD['ROOT_PATH'])


class TestInstructorOra2Report(StanfordReportTestCase):
    """
    Tests that ORA2 response report generation works.
    """

    def setUp(self):
        super(TestInstructorOra2Report, self).setUp()

    def test_report_fails_if_error(self):
        with patch('openedx.stanford.lms.djangoapps.instructor_task.tasks_helper.collect_anonymous_ora2_data') as mock_collect_data:
            mock_collect_data.side_effect = KeyError
            with patch('lms.djangoapps.instructor_task.tasks_helper.runner._get_current_task') as mock_current_task:
                mock_current_task.return_value = self.current_task
                status = push_ora2_responses_to_s3(None, None, self.course.id, {'include_email': 'False'}, 'generated')
                self.assertEqual(status, UPDATE_STATUS_FAILED)

    @patch('lms.djangoapps.instructor_task.tasks_helper.grades.datetime')
    def test_report_stores_results(self, mock_time):
        start_time = datetime.now(UTC)
        mock_time.now.return_value = start_time
        test_header = ['field1', 'field2']
        test_rows = [['row1_field1', 'row1_field2'], ['row2_field1', 'row2_field2']]
        with patch('lms.djangoapps.instructor_task.tasks_helper.runner._get_current_task') as mock_current_task:
            mock_current_task.return_value = self.current_task
            with patch('openedx.stanford.lms.djangoapps.instructor_task.tasks_helper.collect_anonymous_ora2_data') as mock_collect_data:
                mock_collect_data.return_value = (test_header, test_rows)
                with patch('lms.djangoapps.instructor_task.models.DjangoStorageReportStore.store_rows') as mock_store_rows:
                    timestamp_str = start_time.strftime('%Y-%m-%d-%H%M')
                    course_id_string = urllib.quote(self.course.id.to_deprecated_string().replace('/', '_'))
                    filename = u'{}_ORA2_responses_anonymous_{}.csv'.format(course_id_string, timestamp_str)
                    return_val = push_ora2_responses_to_s3(None, None, self.course.id, {'include_email': 'False'}, 'generated')
                    self.assertEqual(return_val, UPDATE_STATUS_SUCCEEDED)
                    mock_store_rows.assert_called_once_with(self.course.id, filename, [test_header] + test_rows)


class TestInstructorOra2EmailReport(StanfordReportTestCase):
    """
    Tests that ORA2 response report generation works.
    """
    def setUp(self):
        super(TestInstructorOra2EmailReport, self).setUp()

    def test_report_fails_if_error(self):
        with patch('openedx.stanford.lms.djangoapps.instructor_task.tasks_helper.collect_email_ora2_data') as mock_collect_data:
            mock_collect_data.side_effect = KeyError
            with patch('lms.djangoapps.instructor_task.tasks_helper.runner._get_current_task') as mock_current_task:
                mock_current_task.return_value = self.current_task
                status = push_ora2_responses_to_s3(None, None, self.course.id, {'include_email': 'True'}, 'generated')
                self.assertEqual(status, UPDATE_STATUS_FAILED)

    @patch('lms.djangoapps.instructor_task.tasks_helper.grades.datetime')
    def test_report_stores_results(self, mock_time):
        start_time = datetime.now(UTC)
        mock_time.now.return_value = start_time
        test_header = ['field1', 'field2']
        test_rows = [['row1_field1', 'row1_field2'], ['row2_field1', 'row2_field2']]
        with patch('lms.djangoapps.instructor_task.tasks_helper.runner._get_current_task') as mock_current_task:
            mock_current_task.return_value = self.current_task
            with patch('openedx.stanford.lms.djangoapps.instructor_task.tasks_helper.collect_email_ora2_data') as mock_collect_data:
                mock_collect_data.return_value = (test_header, test_rows)
                with patch('lms.djangoapps.instructor_task.models.DjangoStorageReportStore.store_rows') as mock_store_rows:
                    timestamp_str = start_time.strftime('%Y-%m-%d-%H%M')
                    course_id_string = urllib.quote(self.course.id.to_deprecated_string().replace('/', '_'))
                    filename = u'{}_ORA2_responses_including_email_{}.csv'.format(course_id_string, timestamp_str)
                    return_val = push_ora2_responses_to_s3(None, None, self.course.id, {'include_email': 'True'}, 'generated')
                    self.assertEqual(return_val, UPDATE_STATUS_SUCCEEDED)
                    mock_store_rows.assert_called_once_with(self.course.id, filename, [test_header] + test_rows)


class TestInstructorCourseForumsReport(StanfordReportTestCase):
    """
    Tests that course forums usage report generation works.
    """
    def setUp(self):
        super(TestInstructorCourseForumsReport, self).setUp()

    def test_report_fails_if_error(self):
        with patch('openedx.stanford.lms.djangoapps.instructor_task.tasks_helper.collect_course_forums_data') as mock_collect_data:
            mock_collect_data.side_effect = KeyError
            with patch('lms.djangoapps.instructor_task.tasks_helper.runner._get_current_task') as mock_current_task:
                mock_current_task.return_value = self.current_task
                status = push_course_forums_data_to_s3(None, None, self.course.id, None, 'generated')
                self.assertEqual(status, UPDATE_STATUS_FAILED)

    @patch('lms.djangoapps.instructor_task.tasks_helper.grades.datetime')
    def test_report_stores_results(self, mock_time):
        start_time = datetime.now(UTC)
        mock_time.now.return_value = start_time
        test_header = ['Date', 'Type', 'Number', 'Up Votes', 'Down Votes', 'Net Points']
        test_rows = [['row1_field1', 'row1_field2'], ['row2_field1', 'row2_field2']]
        with patch('lms.djangoapps.instructor_task.tasks_helper.runner._get_current_task') as mock_current_task:
            mock_current_task.return_value = self.current_task
            with patch('openedx.stanford.lms.djangoapps.instructor_task.tasks_helper.collect_course_forums_data') as mock_collect_data:
                mock_collect_data.return_value = (test_header, test_rows)
                with patch('lms.djangoapps.instructor_task.models.DjangoStorageReportStore.store_rows'):
                    return_val = push_course_forums_data_to_s3(None, None, self.course.id, None, 'generated')
                    self.assertEqual(return_val, UPDATE_STATUS_SUCCEEDED)


class TestInstructorStudentForumsReport(StanfordReportTestCase):
    """
    Tests that Student forums usage report generation works.
    """
    def setUp(self):
        super(TestInstructorStudentForumsReport, self).setUp()

    def test_report_fails_if_error(self):
        with patch('openedx.stanford.lms.djangoapps.instructor_task.tasks_helper.collect_student_forums_data') as mock_collect_data:
            mock_collect_data.side_effect = KeyError
            with patch('lms.djangoapps.instructor_task.tasks_helper.runner._get_current_task') as mock_current_task:
                mock_current_task.return_value = self.current_task
                status = push_student_forums_data_to_s3(None, None, self.course.id, None, 'generated')
                self.assertEqual(status, UPDATE_STATUS_FAILED)

    @patch('lms.djangoapps.instructor_task.tasks_helper.grades.datetime')
    def test_report_stores_results(self, mock_time):
        start_time = datetime.now(UTC)
        mock_time.now.return_value = start_time
        test_header = ['Username', 'Posts', 'Votes']
        test_rows = [['row1_field1', 'row1_field2', 'row1_field3'], ['row2_field1', 'row2_field2', 'row2_field3']]
        with patch('lms.djangoapps.instructor_task.tasks_helper.runner._get_current_task') as mock_current_task:
            mock_current_task.return_value = self.current_task
            with patch('openedx.stanford.lms.djangoapps.instructor_task.tasks_helper.collect_student_forums_data') as mock_collect_data:
                mock_collect_data.return_value = (test_header, test_rows)
                with patch('lms.djangoapps.instructor_task.models.DjangoStorageReportStore.store_rows'):
                    return_val = push_student_forums_data_to_s3(None, None, self.course.id, None, 'generated')
                    self.assertEqual(return_val, UPDATE_STATUS_SUCCEEDED)
