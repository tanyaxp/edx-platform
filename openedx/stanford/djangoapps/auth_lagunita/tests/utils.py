"""
Provide helpers for app testing
"""
import factory
from json import loads as json_loads
import logging

# pylint: disable=import-error
from student.tests.factories import UserFactory
# pylint: enable=import-error

from ..models import Info


log = logging.getLogger('auth_lagunita')


def seed_users(always_optin=None, always_real_email=None, length=20):
    """
    Seed the database with users (and extra info)
    """
    users = []
    infos = []
    for i in range(length):
        if always_optin is not None:
            optin = always_optin
        else:
            optin = (i % 2 == 0)
        if always_real_email is not None:
            use_real_email = always_real_email
        else:
            use_real_email = (i % 3 == 0)
        if use_real_email:
            email = factory.Sequence(u'robot+test+{0}@edx.org'.format)
        else:
            email = factory.Sequence(u'robot+test+{0}@example.com'.format)
        user = UserFactory.create(email=email)
        info = Info(user_id=user.id, requested_marketing_optin=optin)
        info.save()
        users.append(user)
        infos.append(info)
    return (users, infos)


class MockedResponse(object):
    """
    Mock a basic Http Request
    """

    def __init__(self, status_code, content):
        self.status_code = status_code
        self.content = content

    def __getitem__(self, key):
        json = json_loads(self.content)
        container = json['result'][0]
        log.error(container)
        item = container[key]
        item = container.get(key)
        return item

    def json(self):
        """
        Return content as json-decoded data
        """
        data = json_loads(self.content)
        return data

    def get(self, key):
        """
        Return the key from JSON
        """
        item = self[key]
        return item
