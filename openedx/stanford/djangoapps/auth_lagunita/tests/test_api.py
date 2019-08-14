# pylint: disable=missing-docstring
# pylint: disable=protected-access
from json import dumps as json_dumps
import logging

from ddt import ddt, data, unpack
from django.test import TestCase
from mock import patch
from mock import Mock
import requests

from student.tests.factories import UserFactory

from .utils import MockedResponse
from ..api import MarketoApi


log = logging.getLogger('auth_lagunita')


HTTP_CODE_SUCCESS = 200
VALID_LEAD_ID = 8675309
VALID_LIST_ID = 666
DATA = {
    'access_token': {
        'access_token': 'foobar',
    },
    'error': {
        'success': False,
        'errors': [
            {
                'code': 1013,
                'message': 'Object not found',
            },
        ],
        'result': [
        ],
    },
    'exists': {
        'success': True,
        'errors': [
        ],
        'result': [
            {
                'status': 'skipped',
            },
        ],
    },
    'expired': {
        'success': False,
        'errors': [
            {
                'code': 602,
                'message': 'Access token expired',
            },
        ],
        'result': [
        ],
    },
    'missing': {
    },
    'nonexisting': {
        'success': True,
        'errors': [
        ],
        'result': [
        ],
    },
    'success': {
        'success': True,
        'errors': [
        ],
        'result': [
            {
                'status': 'success',
                'id': VALID_LEAD_ID,
            },
        ],
    },
    'updated': {
        'result': [
            {
                'id': VALID_LEAD_ID,
                'status': 'updated',
            },
        ],
        'success': True,
    },
}
RESPONSES = {
    key: MockedResponse(HTTP_CODE_SUCCESS, json_dumps(value))
    for key, value in DATA.items()
}
RESPONSES.update({
    'malformed': MockedResponse(HTTP_CODE_SUCCESS, '{"foobar"'),
    'empty': MockedResponse(HTTP_CODE_SUCCESS, ''),
    'http_error': MockedResponse(404, ''),
    'none': MockedResponse(HTTP_CODE_SUCCESS, None),
})


class BaseTest(TestCase):

    def setUp(self):
        super(BaseTest, self).setUp()
        self.api = MarketoApi(
            'localhost',
            access_token='foobar',
        )
        self.user = UserFactory.create()
        self.list_id = VALID_LIST_ID


class FakedAuthBaseTest(BaseTest):

    def setUp(self):
        super(FakedAuthBaseTest, self).setUp()
        self.api.refresh_access_token = Mock(return_value=self.api.access_token)


@ddt
class AuthTokenTest(BaseTest):

    @data(
        ('access_token', False),
        ('empty', True),
        ('malformed', True),
        ('missing', True),
    )
    @unpack
    def test_data(self, data_type, should_be_none):
        mocked_data = RESPONSES[data_type]
        with patch('requests.get', return_value=mocked_data):
            token = self.api.refresh_access_token()
            if should_be_none:
                self.assertIsNone(token)
            else:
                self.assertIsNotNone(token)


@ddt
class CreateLeadTest(FakedAuthBaseTest):

    @data(
        ('error', True),
        ('success', False),
        ('updated', False),
    )
    @unpack
    def test_data(self, data_type, should_be_none):
        mocked_data = RESPONSES[data_type]
        with patch('requests.post', return_value=mocked_data):
            result, error = self.api._create_lead(self.user)
            if should_be_none:
                self.assertIsNone(result)
                self.assertIsNotNone(error)
            else:
                self.assertIsNotNone(result)
                self.assertIsNone(error)


@ddt
class LookupTest(FakedAuthBaseTest):

    @data(
        ('empty', True),
        ('error', True),
        ('http_error', True),
        ('nonexisting', True),
        ('success', False),
    )
    @unpack
    def test_data(self, data_type, should_be_none):
        mocked_data = RESPONSES[data_type]
        with patch('requests.get', return_value=mocked_data):
            lead = self.api.lookup_lead(self.user.email)
            if should_be_none:
                self.assertIsNone(lead)
            else:
                self.assertIsNotNone(lead)


class RequestTest(BaseTest):

    def test_http_error(self):
        with patch('requests.get', side_effect=requests.exceptions.HTTPError):
            with patch('requests.post', side_effect=requests.exceptions.HTTPError):
                token = self.api.refresh_access_token()
                self.assertIsNone(token)
                self.api.access_token = 'not-none'
                lead = self.api.lookup_lead(self.user.email)
                self.assertIsNone(lead)
                result, error = self.api._create_lead(self.user)
                self.assertIsNone(result)
                self.assertIsNotNone(error)


class RetryTest(FakedAuthBaseTest):

    def test_retry_auth_token(self):
        with patch('requests.get', return_value=RESPONSES['expired']):
            _lead = self.api.lookup_lead(self.user.email)
            self.assertTrue(self.api.refresh_access_token.called)


@ddt
class SubscribeTest(FakedAuthBaseTest):

    @data(
        ('error', True, VALID_LEAD_ID),
        ('none', True, None),
        ('success', False, VALID_LEAD_ID),
    )
    @unpack
    def test_data(self, data_type, should_be_none, return_value):
        mocked_data = RESPONSES[data_type]
        with patch.object(self.api, 'upsert_lead', return_value=return_value):
            with patch('requests.post', return_value=mocked_data):
                lead_id = self.api.subscribe(self.user, self.list_id)
                if should_be_none:
                    self.assertIsNone(lead_id)
                else:
                    self.assertIsNotNone(lead_id)


@ddt
class UpsertTest(FakedAuthBaseTest):

    @data(
        ('error', True, '1013: Object not found'),
        ('success', False, None),
        ('updated', False, None),
    )
    @unpack
    def test_data(self, data_type, should_be_none, error):
        result = (RESPONSES[data_type], error)
        with patch.object(self.api, '_create_lead', return_value=result):
            lead_id = self.api.upsert_lead(self.user)
            if should_be_none:
                self.assertIsNone(lead_id)
            else:
                self.assertIsNotNone(lead_id)
                self.assertEqual(lead_id, VALID_LEAD_ID)
