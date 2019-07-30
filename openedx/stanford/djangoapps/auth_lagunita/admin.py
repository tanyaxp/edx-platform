"""
Customize admin site for auth_lagunita
"""
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import Info


class InfoAdmin(admin.ModelAdmin):
    """
    Admin interface for Info model.
    """

    list_display = (
        'user',
        'requested_marketing_optin',
        'submitted_marketing_optin',
    )
    readonly_fields = (
        'user',
    )
    search_fields = (
        'user__username',
        'user__email',
        'requested_marketing_optin',
        'submitted_marketing_optin',
    )

    def get_email(self, obj):
        """
        Returns the email of the user object
        """
        return obj.user.email
    get_email.short_description = 'Email address'

    class Meta(object):
        model = Info


admin.site.register(Info, InfoAdmin)
