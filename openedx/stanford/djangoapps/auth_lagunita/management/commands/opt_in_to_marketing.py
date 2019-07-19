# -*- coding: utf-8 -*-
"""
Fullfill optin requests by users for marketing materials
"""
from __future__ import unicode_literals
import logging
import time

from django.conf import settings
from django.core.management.base import BaseCommand

from ...api import MarketoApi
from ...models import Info


log = logging.getLogger('auth_lagunita')


class Command(BaseCommand):
    """
    Subscribe optin users to marketing list
    """
    help = __doc__

    access_token = None
    api_url = None
    client_id = None
    client_secret = None
    dry_run = None
    list_id = None
    verbosity = None

    def add_arguments(self, parser):
        parser.add_argument(
            '-l',
            '--list-id',
            help='Subscribe users to this Marketo list',
        )
        parser.add_argument(
            '-N',
            '--no-dry-run',
            action='store_false',
            dest='dry_run',
            help='Actually write to the API',
        )
        parser.add_argument(
            '-t',
            '--access-token',
            help='Reuse existing access token',
        )
        parser.add_argument(
            '-u',
            '--api-url',
            help='Derive Marketo API endpoints from this base URL',
        )
        parser.add_argument(
            '-i',
            '--client-id',
            help='Override Client ID for Marketo API access',
        )
        parser.add_argument(
            '-s',
            '--client-secret',
            help='Override Client Secret for Marketo API access',
        )

    def _initialize_settings(self, **kwargs):
        """
        Parse and assign settings from CLI
        """
        self.access_token = kwargs['access_token']
        self.api_url = kwargs['api_url'] or settings.MARKETO_API_URL
        self.client_id = kwargs['client_id'] or settings.MARKETO_CLIENT_ID
        self.client_secret = kwargs['client_secret'] or settings.MARKETO_CLIENT_SECRET
        self.dry_run = kwargs['dry_run']
        self.list_id = kwargs['list_id'] or settings.MARKETO_LIST_ID
        self.verbosity = kwargs['verbosity']

    def _set_logging_verbosity(self):
        """
        Toggle verbosity via CLI
        """
        if not self.verbosity:
            log.setLevel(logging.ERROR)
        elif self.verbosity == 1:
            log.setLevel(logging.INFO)
        else:
            log.setLevel(logging.DEBUG)

    def handle(self, *args, **kwargs):
        self._initialize_settings(**kwargs)
        self._set_logging_verbosity()
        api = MarketoApi(
            self.api_url,
            self.access_token,
            self.client_id,
            self.client_secret,
        )
        log.info('User lookup attempted')
        need_subscribed = Info.need_subscribed()
        faked = 0
        failed = 0
        subscribed = 0
        for info in need_subscribed:
            user = info.user
            if self.dry_run:
                log.info("Subscription faked for user=%s", user.email)
                faked += 1
            else:
                subscription = api.subscribe(user, self.list_id)
                if subscription:
                    info.submitted_marketing_optin = True
                    info.save()
                    subscribed += 1
                else:
                    failed += 1
            time.sleep(0.5)
        log.info('User lookup completed')
        self.stdout.write('Subscription Summary:')
        self.stdout.write("    Faked: {0}".format(faked))
        self.stdout.write("    Failed: {0}".format(failed))
        self.stdout.write("    Subscribed: {0}".format(subscribed))
        return
