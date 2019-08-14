# pylint: disable=missing-docstring
from django.test import TestCase

from .utils import seed_users
from ..models import Info

LENGTH_USERS = 20


class InfoBasicTest(TestCase):

    def test_basic(self):
        info = Info()
        self.assertIsNotNone(info)

    def test_create(self):
        seed_users(length=LENGTH_USERS)
        infos = Info.objects.all()
        self.assertEquals(len(infos), LENGTH_USERS)

    def test_need_subscribed_empty(self):
        seed_users(always_optin=False, length=LENGTH_USERS)
        infos = Info.need_subscribed()
        self.assertEquals(len(infos), 0)

    def test_need_subscribed_all(self):
        seed_users(always_optin=True, always_real_email=True, length=LENGTH_USERS)
        infos = Info.need_subscribed()
        self.assertEquals(len(infos), LENGTH_USERS)

    def test_need_subscribed_some(self):
        seed_users(length=LENGTH_USERS)
        infos = Info.need_subscribed()
        self.assertEquals(len(infos), 4)
