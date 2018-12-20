from django.conf import settings
from django.conf.urls import url


urlpatterns = [
    url(
        r'^settings/send_test_enrollment_email/{}$'.format(settings.COURSE_KEY_PATTERN),
        'contentstore.views.send_test_enrollment_email',
        name='send_test_enrollment_email',
    ),
    url(
        r'^utilities/{}$'.format(settings.COURSE_KEY_PATTERN),
        'contentstore.views.utility_handler',
    ),
    url(
        r'^utility/captions/{}$'.format(settings.COURSE_KEY_PATTERN),
        'contentstore.views.utility_captions_handler',
    ),
    url(
        r'^utility/bulksettings/{}$'.format(settings.COURSE_KEY_PATTERN),
        'contentstore.views.utility_bulksettings_handler',
    ),
]
if settings.SHIB_ONLY_SITE:
    urlpatterns += [
        url(
            r'^backup_signup$',
            'contentstore.views.signup',
            name='backup_signup',
        ),
        url(
            r'^backup_signin$',
            'contentstore.views.login_page',
            name='backup_login',
        ),
    ]
