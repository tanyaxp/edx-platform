"""
A management command for bulk user activation by email/domain
"""

from __future__ import unicode_literals

import argparse

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand

from openedx.stanford.djangoapps.student_utils.helpers import get_users_by_email


class Command(BaseCommand):
    """
    Activate all inactive users for a given email domain
    """
    help = __doc__

    def add_arguments(self, parser):
        parser.add_argument(
            '-d',
            '--domain',
            required=True,
            help=(
                'Specify the domain name to be activated. '
            ),
        )
        parser.add_argument(
            '-f',
            '--force',
            action='store_true',
            help=(
                'Set this flag to actually activate users. '
                'Defaults to false which performs a dry-run, '
                'just printing out the list of user email accounts that would be activated. '
            ),
        )

    def handle(self, *args, **options):
        domain = options['domain']
        force = options['force']

        inactive_users = get_users_by_email(domain, is_active=False)
        for user in inactive_users:
            print(user.email)
            if force:
                user.is_active = True
                user.save()
