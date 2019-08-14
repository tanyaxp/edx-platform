from lms.envs.test import *


FOOTER_DISCLAIMER_TEXT = None
FOOTER_EXTERNAL_COURSES_LINK = None
HIDE_COURSE_INFO_CERTS_TEXT = False
INSTALLED_APPS += (
    'openedx.stanford.djangoapps.auth_lagunita',
    'openedx.stanford.djangoapps.register_cme',
)
MKTG_URL_LINK_MAP['BLOG'] = 'blog'
MKTG_URL_LINK_MAP['DONATE'] = 'donate'
TIME_ZONE = 'UTC'
