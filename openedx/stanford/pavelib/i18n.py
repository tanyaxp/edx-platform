"""
Stanford internationalization tasks
"""

from __future__ import absolute_import

import logging
import sys

from paver.easy import task, needs

from .utils.i18n_helpers import (
    CONFIG,
    clean_pofile,
    extract_platform_django,
    extract_platform_djangojs,
    extract_platform_mako,
    extract_platform_underscore,
    extract_theme_mako,
    extract_theme_tos,
    fix_privacy,
    generate_merged_theme_django,
    git_add,
    merge_translations,
    pull,
    push,
)


LOG = logging.getLogger(__name__)

logging.basicConfig(stream=sys.stdout, level=logging.INFO)


@task
@needs(
    'pavelib.prereqs.install_prereqs',
)
def stanfordi18n_extract_platform():
    """
    Extract platform strings that need translation.
    """
    LOG.info('Extracting platform...')
    helpers = [
        extract_platform_mako,
        extract_platform_underscore,
        extract_platform_django,
        extract_platform_djangojs,
    ]
    for helper in helpers:
        filename = helper()
        clean_pofile(filename)
    LOG.info('Extracted platform.')


@task
@needs(
    'pavelib.prereqs.install_prereqs',
)
def stanfordi18n_extract_theme(options):
    """
    Extract theme strings that need translation.
    """
    LOG.info('Extracting theme...')
    files = set()
    files.add(extract_theme_mako())
    files.update(extract_theme_tos())
    for filename in files:
        clean_pofile(filename)
    LOG.info('Extracted theme.')


@task
@needs('pavelib.i18n.i18n_validate_transifex_config')
def stanfordi18n_transifex_push():
    """
    Push source strings to Transifex for translation
    """
    push()
    merge_translations()


@task
@needs(
    'stanfordi18n_extract_theme',
    'stanfordi18n_extract_platform',
    'stanfordi18n_transifex_push',
)
def stanfordi18n_robot_push():
    """
    Extract source strings and push to Transifex
    """
    LOG.info('Pushed updated source strings to Transifex.')


@task
def stanfordi18n_robot_pull():
    """
    Pull translations from Transifex, generate po and mo files
    """
    languages = CONFIG.translated_locales
    for language in languages:
        pull(language)
        fix_privacy(language)
    generate_merged_theme_django(languages)
    git_add()
