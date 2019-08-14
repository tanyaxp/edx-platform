# pylint: disable=missing-docstring
import sys

from django.core.management import call_command
from django.test import TestCase
from mock import Mock
from mock import patch
from six.moves import StringIO

from .utils import seed_users
from ..api import MarketoApi


class TestOptInCommand(TestCase):

    def setUp(self):
        super(TestOptInCommand, self).setUp()
        self.api = MarketoApi(
            'localhost',
            access_token='foobar',
        )
        self.api.refresh_access_token = Mock(return_value=self.api.access_token)

    def test_basic(self):
        call_command('opt_in_to_marketing')

    def test_no_users(self):
        out = StringIO()
        sys.out = out
        call_command('opt_in_to_marketing', stdout=out)
        output = out.getvalue()
        self.assertIn('Faked: 0', output)
        self.assertIn('Failed: 0', output)
        self.assertIn('Subscribed: 0', output)

    def test_dry_run(self):
        seed_users(always_optin=True, always_real_email=True)
        with patch('openedx.stanford.djangoapps.auth_lagunita.api.MarketoApi.subscribe', return_value=8675309):
            out = StringIO()
            sys.out = out
            call_command('opt_in_to_marketing', stdout=out)
            output = out.getvalue()
        self.assertIn('Faked: 20', output)
        self.assertIn('Failed: 0', output)
        self.assertIn('Subscribed: 0', output)

    def test_no_dry_run(self):
        seed_users(always_optin=True, always_real_email=True)
        with patch('openedx.stanford.djangoapps.auth_lagunita.api.MarketoApi.subscribe', return_value=8675309):
            out = StringIO()
            sys.out = out
            call_command(
                'opt_in_to_marketing',
                '--no-dry-run',
                '--access-token',
                self.api.access_token,
                stdout=out,
            )
            output = out.getvalue()
            print('FUNK', output)
        self.assertIn('Faked: 0', output)
        self.assertIn('Failed: 0', output)
        self.assertIn('Subscribed: 20', output)

    def test_subscribe_errors(self):
        seed_users(always_optin=True, always_real_email=True)
        with patch('openedx.stanford.djangoapps.auth_lagunita.api.MarketoApi.subscribe', return_value=None):
            out = StringIO()
            sys.out = out
            call_command(
                'opt_in_to_marketing',
                '--no-dry-run',
                '--access-token',
                self.api.access_token,
                stdout=out,
            )
            output = out.getvalue()
        self.assertIn('Faked: 0', output)
        self.assertIn('Failed: 20', output)
        self.assertIn('Subscribed: 0', output)
