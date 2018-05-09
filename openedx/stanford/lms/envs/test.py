from lms.envs.test import *


FOOTER_DISCLAIMER_TEXT = None
FOOTER_EXTERNAL_COURSES_LINK = None
HIDE_COURSE_INFO_CERTS_TEXT = False
INSTALLED_APPS += (
    'openedx.stanford.djangoapps.register_cme',
)
TIME_ZONE = 'UTC'
