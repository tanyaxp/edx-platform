# pylint: disable=missing-docstring
from ddt import ddt, data
from django.test import TestCase

from ..forms import InfoForm


@ddt
class InfoFormTest(TestCase):

    def test_basic(self):
        form = InfoForm()
        self.assertIsNotNone(form)

    @data(
        None,
        True,
        False,
    )
    def test_valid(self, requested_marketing_optin):
        form = InfoForm({
            'requested_marketing_optin': requested_marketing_optin,
        })
        is_valid = form.is_valid()
        self.assertTrue(is_valid)
