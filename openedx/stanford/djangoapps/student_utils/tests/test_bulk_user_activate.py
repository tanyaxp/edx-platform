"""
Tests for the bulk_user_activate command.
"""

from django.contrib.auth.models import User
from django.core.management import call_command
from django.test import TestCase

from openedx.stanford.djangoapps.student_utils.helpers import get_users_by_email


class BulkUserActivateTests(TestCase):
    """
    Test the bulk_user_activate command.
    """
    help = __doc__

    NUMBER_USERS = 10
    NUMBER_DOMAINS = 3

    def setUp(self):
        super(BulkUserActivateTests, self).setUp()
        self.domain = [
            "{i}.example.com".format(
                i=i,
            )
            for i in xrange(BulkUserActivateTests.NUMBER_DOMAINS)
        ]
        self.users = [
            User.objects.create(
                username="user{i}".format(
                    i=i,
                ),
                email="user{i}@{domain}".format(
                    i=i,
                    domain=self.domain[(i % BulkUserActivateTests.NUMBER_DOMAINS)],
                ),
                is_active=(i % 2),
            )
            for i in xrange(BulkUserActivateTests.NUMBER_USERS)
        ]

    def test_bulk_without_force(self):
        """
        Verify that nothing is changed when force is set to false.
        """
        domain = self.domain[0]
        users_before = get_users_by_email(domain, is_active=True)
        count_before = users_before.count()
        self.assertGreater(count_before, 0)
        call_command(
            'bulk_user_activate',
            '--domain', domain,
        )
        users_after = get_users_by_email(domain, is_active=True)
        count_after = users_after.count()
        self.assertEqual(count_before, count_after)

    def test_bulk_with_force(self):
        """
        Verify that users is activated when force is set to true.
        """
        domain = self.domain[0]
        users_before = get_users_by_email(domain, is_active=False)
        count_before = users_before.count()
        self.assertGreater(count_before, 0)
        call_command(
            'bulk_user_activate',
            '--domain', domain,
            '--force',
        )
        users_after = get_users_by_email(domain, is_active=False)
        count = users_after.count()
        self.assertEqual(count, 0)
