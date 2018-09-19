"""
A collection of helper methods
"""
from django.contrib.auth.models import User


def get_users_by_email(domain, is_active):
    """
    Fetch users by domain and by active status
    """
    suffix = '@' + domain
    users = User.objects.filter(
        email__endswith=suffix,
        is_active=is_active,
    )
    return users
