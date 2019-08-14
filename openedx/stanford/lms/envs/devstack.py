from lms.envs.devstack import *
from openedx.core.lib.logsettings import get_logger_config


FEATURES.update({
    'ENABLE_COURSEWARE_SEARCH': False,
    'USE_DJANGO_PIPELINE': False,
})
LOGGING = get_logger_config(
    LOG_DIR,
    logging_env=ENV_TOKENS['LOGGING_ENV'],
    local_loglevel=local_loglevel,
    debug=True,
    service_variant=SERVICE_VARIANT,
)
LOG_OVERRIDES.extend([
    ('py.warnings', logging.CRITICAL),
    ('requests.packages.urllib3.connectionpool', logging.CRITICAL),
])
for log_name, log_level in LOG_OVERRIDES:
    logging.getLogger(log_name).setLevel(log_level)
