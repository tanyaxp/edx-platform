# -*- coding: utf-8 -*-
"""
Record extra lagunita-centric user data
"""
from __future__ import unicode_literals

from django.conf import settings
from django.db import models

USER_MODEL = getattr(settings, 'AUTH_USER_MODEL', 'auth.User')


class Info(models.Model):
    """
    Record extra fields that will be saved when a user registers

    requested_marketing_optin: Track whether user has requested to
        receive additional marketing messages
    submitted_marketing_optin: Track whether system has submitted an
        opt-in for user to receive additional marketing messages
    """
    user = models.OneToOneField(
        USER_MODEL,
    )
    requested_marketing_optin = models.BooleanField(
        default=False,
    )
    submitted_marketing_optin = models.BooleanField(
        default=False,
    )
    created_date = models.DateTimeField(
        auto_now_add=True,
    )
    modified_date = models.DateTimeField(
        auto_now=True,
    )

    def __unicode__(self):
        message = (
            "Info.objects.get("
            "user__email='{email}', "
            "requested_marketing_optin={requested_marketing_optin}, "
            "submitted_marketing_optin={submitted_marketing_optin}"
            ")"
        ).format(
            email=self.user.email,
            requested_marketing_optin=self.requested_marketing_optin,
            submitted_marketing_optin=self.submitted_marketing_optin,
        )
        return message
