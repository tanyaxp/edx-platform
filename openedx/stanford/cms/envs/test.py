from cms.envs.test import *


INSTALLED_APPS += (
    'openedx.stanford.djangoapps.register_cme',
)
# Remove sneakpeek during tests to prevent unwanted redirect
MIDDLEWARE_CLASSES = tuple([
    mwc for mwc in MIDDLEWARE_CLASSES
    if mwc != 'openedx.stanford.djangoapps.sneakpeek.middleware.SneakPeekLogoutMiddleware'
])
