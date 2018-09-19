"""
Tools for stanford i18n tasks
"""

from datetime import datetime
import copy
import fnmatch
import logging
import os
from path import Path
import shutil
import subprocess

import django
from django.conf import settings
from i18n import segment
from i18n.config import Configuration
from i18n.execute import execute
from paver.easy import sh
import polib

from pavelib.utils.cmd import django_cmd

BABEL_COMMAND_TEMPLATE = (
    "pybabel extract --mapping={config} "
    "--add-comments='Translators:' --keyword='interpolate' "
    "--output={output} {template_directory}"
)
BASE_DIR = Path('.').abspath()
CONFIG = Configuration(filename=BASE_DIR / 'conf/locale/stanford_config.yaml')
LOG = logging.getLogger(__name__)


def clean_pofile(filename):
    LOG.info("Cleaning %s", filename)
    pofile = polib.pofile(filename)
    fix_header(pofile)
    fix_metadata(pofile)
    pofile.save()


def compile_js(language):
    sh(django_cmd('lms', 'devstack', 'compilejsi18n', '-l', language))


def _extract_babel(file_config, file_output, template_directory='.', working_directory='.'):
    babel_command = BABEL_COMMAND_TEMPLATE.format(
        config=file_config,
        output=file_output,
        template_directory=template_directory,
    )
    execute(babel_command, working_directory)
    return file_output


def extract_platform_mako():
    mako_config = CONFIG.locale_dir / 'stanford_mako.cfg'
    mako_file = CONFIG.source_messages_dir / 'stanford_mako.po'
    output = _extract_babel(mako_config, mako_file)
    return output


def extract_platform_underscore():
    underscore_config = CONFIG.locale_dir / 'stanford_underscore.cfg'
    underscore_file = CONFIG.source_messages_dir / 'stanford_underscore.po'
    output = _extract_babel(underscore_config, underscore_file)
    return output


def extract_platform_django(file_base='django'):
    filename = CONFIG.source_messages_dir / file_base + '.po'
    filename_backup = filename + '.backup'
    filename_stanford = CONFIG.source_messages_dir / 'stanford_' + file_base + '.po'
    os.rename(filename, filename_backup)
    makemessages = 'django-admin.py makemessages -l en'
    ignores = ' '.join([
        '--ignore="{}/*"'.format(directory)
        for directory in CONFIG.ignore_dirs
    ])
    if ignores:
        makemessages += ' ' + ignores
    if file_base == 'djangojs':
        makemessages += ' -d djangojs'
    execute(makemessages)
    os.rename(filename, filename_stanford)
    os.rename(filename_backup, filename)
    return filename_stanford


def extract_platform_djangojs():
    output = extract_platform_django('djangojs')
    return output


def extract_theme_mako():
    theme_dir = get_theme_dir()
    template_directory = 'lagunita/lms/templates/'
    theme_file = CONFIG.source_messages_dir / 'theme.po'
    mako_config = theme_dir / 'conf/locale/babel_mako.cfg'
    mako_file = '../../edx-platform' / theme_file
    output = _extract_babel(
        mako_config,
        mako_file,
        template_directory=template_directory,
        working_directory=theme_dir,
    )
    return output


def extract_theme_tos():
    segment.segment_pofile = segment_pofile_lazy
    files = segment.segment_pofiles(CONFIG, CONFIG.source_locale)
    return files


def fix_privacy(language):
    LOG.info("Fixing privacy: %s...", language)
    command = 'sed -i "/python-format/d" conf/locale/{language}/LC_MESSAGES/privacy.po'.format(
        language=language,
    )
    sh(command)
    LOG.info("Fixed privacy: %s.", language)


def generate_merged_theme_django(languages):
    sh('i18n_tool generate -c conf/locale/stanford_config.yaml -v 1')
    theme_dir = get_theme_dir()
    for language in languages:
        theme_messages_dir = theme_dir / 'conf/locale/{language}/LC_MESSAGES'.format(
            language=language,
        )
        theme_messages_dir.makedirs_p()
        shutil.move(
            CONFIG.get_messages_dir(language) / 'theme.po',
            theme_messages_dir / 'django.po'
        )
        shutil.move(
            CONFIG.get_messages_dir(language) / 'theme.mo',
            theme_messages_dir / 'django.mo'
        )
        compile_js(language)


def get_theme_dir():
    """
    Fetch the absolute path to the default theme directory
    """
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "openedx.stanford.lms.envs.aws")
    os.environ.setdefault("SERVICE_VARIANT", 'lms')
    django.setup()
    from openedx.core.djangoapps.theming.helpers import get_theme_base_dir
    return get_theme_base_dir(settings.DEFAULT_SITE_THEME)


def git_add():
    sh('git add conf/locale')
    sh('git add lms/static/js/i18n')
    subprocess.check_call(
        'git add conf/locale',
        cwd=get_theme_dir(),
        shell=True,
    )
    LOG.info(
        'Check updated translations files in platform '
        'and theme before committing'
    )


def segment_pofile_lazy(filename, segments):
    """
    Segment a .po file using patterns in `segments`.

    The .po file at `filename` is read, and the occurrence locations of its
    messages are examined.  `segments` is a list of single key-value pairs:
    the keys are segment .po filenames, the values are lists of patterns::

        [
            {'django-studio.po': [
                'cms/*',
                'some-other-studio-place/*',
            ]},
            {'django-weird.po': [
                '*/weird_*.*',
            ]},
        ]

    If ANY of a message's occurrences match the patterns for a segment, then that
    message is written to the new segmented .po file (the first segment with
    matching patterns).

    Any message that matches no segments is written back to
    the original file.

    Arguments:
        filename (path.path): a path object referring to the original .po file.
        segments (list of dicts): specification of the segments to create.

    Returns:
        a set of path objects, all the segment files written.

    """
    source_po = polib.pofile(filename)
    LOG.info('Reading %s entries from %s', len(source_po), filename)

    # A new pofile just like the source, but with no messages. We'll put
    # anything not segmented into this file.
    remaining_po = copy.deepcopy(source_po)
    remaining_po[:] = []

    # Turn the segments list into two structures: segment_patterns is a
    # list of (pattern, segmentfile) pairs.  segment_po_files is a dict mapping
    # segment file names to pofile objects of their contents.
    segment_po_files = {filename.name: remaining_po}
    segment_patterns = []
    for segment in segments:
        segmentfile, patterns = segment.items()[0]
        segment_po_files[segmentfile] = copy.deepcopy(remaining_po)
        segment_patterns.extend((pat, segmentfile) for pat in patterns)

    # Examine each message in the source file. If any of its occurrences match
    # a pattern for a segment, it goes in the first such segment.  Otherwise, it
    # goes in remaining.
    for msg in source_po:
        segment_match = False
        for pat, segment_file in segment_patterns:
            for occ_file, _ in msg.occurrences:
                if fnmatch.fnmatch(occ_file, pat):
                    segment_po_files[segment_file].append(msg)
                    segment_match = True
                    break
            if segment_match:
                break

        if not segment_match:
            remaining_po.append(msg)

    # Write out the results.
    files_written = set()
    for segment_file, pofile in segment_po_files.items():
        out_file = filename.dirname() / segment_file
        if not pofile:
            LOG.error('No messages to write to %s, did you run segment twice?', out_file)
        else:
            LOG.info('Writing %s entries to %s', len(pofile), out_file)
            pofile.save(out_file)
            files_written.add(out_file)

    return files_written


def fix_header(pofile):
    """
    Replace default headers with Stanford headers
    """
    pofile.metadata_is_fuzzy = []
    header = pofile.header
    fixes = (
        ('SOME DESCRIPTIVE TITLE', 'Stanford OpenEdX translation file'),
        ('Translations template for PROJECT.', 'Stanford OpenEdX translation file'),
        ('YEAR', str(datetime.utcnow().year)),
        ('ORGANIZATION', 'Stanford University'),
        ("THE PACKAGE'S COPYRIGHT HOLDER", 'Stanford University'),
        (
            'This file is distributed under the same license as the PROJECT project.',
            'This file is distributed under the GNU AFFERO GENERAL PUBLIC LICENSE.'
        ),
        (
            'This file is distributed under the same license as the PACKAGE package.',
            'This file is distributed under the GNU AFFERO GENERAL PUBLIC LICENSE.'
        ),
        ('FIRST AUTHOR <EMAIL@ADDRESS>', 'Stanford OpenEdX Team'),
    )
    for src, dest in fixes:
        header = header.replace(src, dest)
    pofile.header = header


def fix_metadata(pofile):
    """
    Replace default metadata with Stanford metadata
    """
    fixes = {
        'PO-Revision-Date': datetime.utcnow(),
        'Report-Msgid-Bugs-To': '',
        'Project-Id-Version': 'stanford-openedx',
        'Language': 'en',
        'Last-Translator': '',
        'Language-Team': 'English',
    }
    pofile.metadata.update(fixes)


def merge_translations():
    for language in CONFIG.translated_locales:
        LOG.info("Merging language: %s...", language)
        if not CONFIG.get_messages_dir(language).exists():
            # Language not yet available in code, fetch from upstream Transifex
            LOG.warn("Fetch upstream translations manually for %s", language)
            break
        merge_mappings = {
            'django.po': ['django', 'mako'],
            'djangojs.po': ['djangojs', 'underscore'],
        }
        for existing, targets in merge_mappings.items():
            for target in targets:
                _merge_existing_translations(existing, target, language)
        LOG.info("Merged language: %s.", language)


def _merge_pull(target_source, common_file, language, existing):
    existing_file = CONFIG.get_messages_dir(language) / existing
    command = "msgcomm {existing_file} {target_source} -o {output}".format(
        existing_file=existing_file,
        target_source=target_source,
        output=common_file,
    )
    execute(command)


def _merge_combine(target_source, target_filename, common_file, language):
    output = CONFIG.get_messages_dir(language) / target_filename
    command = "msgmerge --no-fuzzy-matching {common_file} {target_source} -o {output}".format(
        common_file=common_file,
        target_source=target_source,
        output=output,
    )
    execute(command)


def _merge_push(target, language):
    command = "tx push -t -l {language} -r stanford-openedx.{target}".format(
        language=language,
        target=target,
    )
    execute(command)


def _merge_existing_translations(existing, target, language):
    """
    Merge translations from existing file to target file for locale
    language and push up to Transifex
    """
    target_filename = "stanford_" + target + '.po'
    target_source = CONFIG.source_messages_dir / target_filename
    common_file = CONFIG.get_messages_dir(language) / 'common.po'
    _merge_pull(target_source, common_file, language, existing)
    _merge_combine(target_source, target_filename, common_file, language)
    _merge_push(target, language)


def pull(language):
    LOG.info("Pulling language: %s...", language)
    command = 'tx pull -l {language} -r "stanford-openedx.*"'.format(
        language=language,
    )
    execute(command)
    LOG.info("Pulled language: %s.", language)


def push():
    LOG.info('Pushing source files to Transifex...')
    execute('tx push -s -r "stanford-openedx.*"')
    LOG.info('Pushed source files to Transifex.')
