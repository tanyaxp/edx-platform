"""
Unit tests for bulk update problem settings utility
"""

import ddt
from django.core import mail
from django.core.urlresolvers import reverse
import mock

from cms.djangoapps.contentstore.tests.utils import CourseTestCase
from xmodule.modulestore.django import modulestore
from xmodule.modulestore.tests.factories import CourseFactory

from ..views.utilities.bulkupdate import SHOW_ANSWER_OPTIONS
from ..views.utilities.tasks import bulk_update_problem_settings


@ddt.ddt
class BulkUpdateTest(CourseTestCase):
    """
    Test for bulk update get and post methods
    """
    def setUp(self):
        """
        Creates the test course
        """
        super(BulkUpdateTest, self).setUp()
        self.course = CourseFactory.create()
        course_id = unicode(self.course.id)
        self.bulkupdate_url = reverse(
            'utility_bulkupdate_handler',
            kwargs={
                'course_key_string': course_id,
            },
        )

    def count_published_problems(self):
        """
        Returns the number of problems that are currently published in the course
        """
        count = 0
        store = modulestore()
        problems = store.get_items(
            self.course.id,
            qualifiers={'category': 'problem'},
        )
        for problem in problems:
            if store.has_published_version(problem):
                count += 1
        return count

    def test_get_bulkupdate_html(self):
        """
        Tests getting the HTML template and URLs for the bulkupdate page
        """
        response = self.client.get(self.bulkupdate_url, HTTP_ACCEPT='text/html')
        self.assertContains(response, '/course/{}'.format(self.course.id))
        self.assertContains(response, '/utility/bulkupdate/{}'.format(self.course.id))
        self.assertContains(
            response,
            '<input class="input setting-input setting-input-number" type="number" value="0" min="0.0000" step="1">'
        )
        self.assertContains(response, '<option value="always" selected>always</option>')
        for option in SHOW_ANSWER_OPTIONS[1:]:
            self.assertContains(response, '<option value="{}">{}</option>'.format(option, option))

    @ddt.data('put', 'delete')
    def test_bulkupdate_unsupported(self, method_name):
        """
        Operations not supported (PUT, DELETE).
        """
        method = getattr(self.client, method_name)
        response = method(self.bulkupdate_url)
        self.assertEqual(response.status_code, 404)

    @ddt.data(
        {'maxAttempts': 0, 'showAnswer': ''},
        {'maxAttempts': '', 'showAnswer': SHOW_ANSWER_OPTIONS[0]},
        {'maxAttempts': 0, 'showAnswer': SHOW_ANSWER_OPTIONS[0]},
        {'maxAttempts': 1, 'showAnswer': SHOW_ANSWER_OPTIONS[1]},
    )
    def test_post_bulkupdate_correct_arguments(self, settings):
        """
        Tests POST operation returns 200
        """
        response = self.client.post(self.bulkupdate_url, settings, HTTP_ACCEPT='application/json')
        self.assertEqual(response.status_code, 200)

    @ddt.data(
        {'maxAttempts': -1},
        {'maxAttempts': -1, 'showAnswer': ''},
        {'maxAttempts': 'not_a_number', 'showAnswer': ''},
        {'showAnswer': 'invalid_show_answer_option'},
        {'maxAttempts': '', 'showAnswer': 'invalid_show_answer_option'},
        {'maxAttempts': -1, 'showAnswer': SHOW_ANSWER_OPTIONS[0]},
        {'maxAttempts': 0, 'showAnswer': 'invalid_show_answer_option'},
        {'maxAttempts': -1, 'showAnswer': 'invalid_show_answer_option'},
    )
    def test_post_bulkupdate_incorrect_arguments(self, settings):
        """
        Tests POST operation returns 'invalid setting' 400 code on incorrect arguments
        """
        response = self.client.post(self.bulkupdate_url, settings, HTTP_ACCEPT='application/json')
        self.assertEqual(response.status_code, 400)

    @ddt.data(
        {'maxAttempts': 0, 'showAnswer': ''},
        {'maxAttempts': '', 'showAnswer': SHOW_ANSWER_OPTIONS[0]},
        {'maxAttempts': 0, 'showAnswer': SHOW_ANSWER_OPTIONS[0]},
        {'maxAttempts': 1, 'showAnswer': SHOW_ANSWER_OPTIONS[1]},
    )
    @mock.patch(
        'openedx.stanford.cms.djangoapps.contentstore.views.utilities.bulkupdate.bulk_update_problem_settings.delay',
        side_effect=bulk_update_problem_settings
    )
    def test_bulkupdate_advanced_settings_modified(self, settings, bulk_update_non_celery_task):  # pylint: disable=unused-argument
        """
        Tests course advanced settings are updated
        """
        response = self.client.post(self.bulkupdate_url, settings, HTTP_ACCEPT='application/json')
        self.assertEqual(response.status_code, 200)

        store = modulestore()
        course = store.get_course(self.course.id, 3)
        if settings['maxAttempts']:
            self.assertEquals(course.max_attempts, settings['maxAttempts'])
        if settings['showAnswer']:
            self.assertEquals(course.showanswer, settings['showAnswer'])

    @ddt.data(
        {'maxAttempts': 0, 'showAnswer': ''},
        {'maxAttempts': '', 'showAnswer': SHOW_ANSWER_OPTIONS[0]},
        {'maxAttempts': 0, 'showAnswer': SHOW_ANSWER_OPTIONS[0]},
        {'maxAttempts': 1, 'showAnswer': SHOW_ANSWER_OPTIONS[1]},
    )
    @mock.patch(
        'openedx.stanford.cms.djangoapps.contentstore.views.utilities.bulkupdate.bulk_update_problem_settings.delay',
        side_effect=bulk_update_problem_settings
    )
    def test_bulkupdate_problem_settings_modified(self, settings, bulk_update_non_celery_task):  # pylint: disable=unused-argument
        """
        Tests all problem settings are updated
        """
        preupdate_published_problems_count = self.count_published_problems()
        response = self.client.post(self.bulkupdate_url, settings, HTTP_ACCEPT='application/json')
        self.assertEqual(response.status_code, 200)

        store = modulestore()

        problems = store.get_items(
            self.course.id,
            qualifiers={'category': 'problem'},
        )
        for problem in problems:
            if settings['maxAttempts']:
                self.assertEquals(problem.max_attempts, settings['maxAttempts'])
            if settings['showAnswer']:
                self.assertEquals(problem.showanswer, settings['showAnswer'])
        postupdate_published_problems_count = self.count_published_problems()
        self.assertEqual(preupdate_published_problems_count, postupdate_published_problems_count)

    @mock.patch(
        'openedx.stanford.cms.djangoapps.contentstore.views.utilities.bulkupdate.bulk_update_problem_settings.delay',
        side_effect=bulk_update_problem_settings
    )
    def test_bulkupdate_email_sent_on_completion(self, bulk_update_non_celery_task):  # pylint: disable=unused-argument
        """
        Tests email is sent to user after task completion
        """
        for count in range(len(SHOW_ANSWER_OPTIONS)):
            settings = {'maxAttempts': count, 'showAnswer': SHOW_ANSWER_OPTIONS[count]}
            response = self.client.post(self.bulkupdate_url, settings, HTTP_ACCEPT='application/json')
            self.assertEqual(response.status_code, 200)
            self.assertEqual(len(mail.outbox), count + 1)
            self.assertIn(
                "Your bulk settings update task has completed with the status 'success'",
                mail.outbox[count].body
            )
