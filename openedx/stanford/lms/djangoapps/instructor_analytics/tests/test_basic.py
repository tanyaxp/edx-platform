from courseware.tests.factories import StudentModuleFactory
from student.models import CourseEnrollment
from student.tests.factories import UserFactory
from xmodule.modulestore.django import modulestore
from xmodule.modulestore.tests.django_utils import ModuleStoreTestCase
from xmodule.modulestore.tests.factories import CourseFactory, ItemFactory

from openedx.stanford.lms.djangoapps.instructor_analytics.basic import student_responses


class TestStudentResponsesAnalyticsBasic(ModuleStoreTestCase):

    def setUp(self):
        super(TestStudentResponsesAnalyticsBasic, self).setUp()
        self.course = CourseFactory.create()

    def create_course_structure(self):
        section = ItemFactory.create(
            parent_location=self.course.location,
            category='chapter',
            display_name=u'test section',
        )
        sub_section = ItemFactory.create(
            parent_location=section.location,
            category='sequential',
            display_name=u'test subsection',
        )
        unit = ItemFactory.create(
            parent_location=sub_section.location,
            category="vertical",
            metadata={'graded': True, 'format': 'Homework'},
            display_name=u'test unit',
        )
        problem = ItemFactory.create(
            parent_location=unit.location,
            category='problem',
            display_name=u'test problem',
        )
        return section, sub_section, unit, problem

    def create_student(self):
        self.student = UserFactory()
        CourseEnrollment.enroll(self.student, self.course.id)

    def test_empty_course(self):
        self.create_student()
        datarows = list(student_responses(self.course))
        self.assertEqual(datarows, [])

    def test_full_course_no_students(self):
        datarows = list(student_responses(self.course))
        self.assertEqual(datarows, [])

    def test_invalid_module_state(self):
        section, sub_section, unit, problem = self.create_course_structure()
        self.create_student()
        StudentModuleFactory.create(
            course_id=self.course.id,
            module_state_key=problem.location,
            student=self.student,
            grade=0,
            state=u'{"student_answers":{"fake-problem":"No idea"}}}',
        )
        course_with_children = modulestore().get_course(self.course.id, depth=4)
        datarows = list(student_responses(course_with_children))
        # Invalid module state response will be skipped, so datarows should be empty
        self.assertEqual(len(datarows), 0)

    def test_problem_with_student_answer_and_answers(self):
        section, sub_section, unit, problem = self.create_course_structure()
        submit_and_compare_valid_state = ItemFactory.create(
            parent_location=unit.location,
            category='submit-and-compare',
            display_name=u'test submit_and_compare1',
        )
        submit_and_compare_invalid_state = ItemFactory.create(
            parent_location=unit.location,
            category='submit-and-compare',
            display_name=u'test submit_and_compare2',
        )
        content_library = ItemFactory.create(
            parent_location=unit.location,
            category='library_content',
            display_name=u'test content_library',
        )
        library_problem = ItemFactory.create(
            parent_location=content_library.location,
            category='problem',
        )
        self.create_student()
        StudentModuleFactory.create(
            course_id=self.course.id,
            module_state_key=problem.location,
            student=self.student,
            grade=0,
            state=u'{"student_answers":{"problem_id":"student response1"}}',
        )
        StudentModuleFactory.create(
            course_id=self.course.id,
            module_state_key=submit_and_compare_valid_state.location,
            student=self.student,
            grade=1,
            state=u'{"student_answer": "student response2"}',
        )
        StudentModuleFactory.create(
            course_id=self.course.id,
            module_state_key=submit_and_compare_invalid_state.location,
            student=self.student,
            grade=1,
            state=u'{"answer": {"problem_id": "123"}}',
        )
        StudentModuleFactory.create(
            course_id=self.course.id,
            module_state_key=library_problem.location,
            student=self.student,
            grade=0,
            state=u'{"student_answers":{"problem_id":"content library response1"}}',
        )
        course_with_children = modulestore().get_course(self.course.id, depth=4)
        datarows = list(student_responses(course_with_children))
        self.assertEqual(datarows[0][-2], u'problem_id=student response1')
        self.assertEqual(datarows[1][-2], u'student response2')
        self.assertEqual(datarows[2][-2], None)
        self.assertEqual(datarows[3][-2], u'problem_id=content library response1')

    def test_problem_with_no_answer(self):
        section, sub_section, unit, problem = self.create_course_structure()
        self.create_student()
        StudentModuleFactory.create(
            course_id=self.course.id,
            module_state_key=problem.location,
            student=self.student,
            grade=0,
            state=u'{"answer": {"problem_id": "123"}}',
        )
        course_with_children = modulestore().get_course(self.course.id, depth=4)
        datarows = list(student_responses(course_with_children))
        self.assertEqual(datarows[0][-2], None)
