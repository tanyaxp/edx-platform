# -*- coding: utf-8 -*-
"""
Build a custom form for extra user data
"""
from __future__ import unicode_literals

from django import forms

from .models import Info


class InfoForm(forms.ModelForm):
    """
    The fields on this form are derived from the Info model
    """
    def __init__(self, *args, **kwargs):
        super(InfoForm, self).__init__(*args, **kwargs)

    class Meta(object):
        fields = (
            'requested_marketing_optin',
        )
        model = Info

    requested_marketing_optin = forms.BooleanField(
        label=(
            'I want to receive email about future learning opportunities '
            'from Stanford Online and I am at least 18 years old.'
        ),
        required=False,
    )
