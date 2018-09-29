"""
Views handling read (GET) requests for the Discussion tab and inline discussions.
"""

from django.conf import settings
from django.utils.translation import ugettext_noop

import django_comment_client.utils as utils
from courseware.tabs import EnrolledTab
from xmodule.tabs import TabFragmentViewMixin


class DiscussionTab(TabFragmentViewMixin, EnrolledTab):
    """
    A tab for the cs_comments_service forums.
    """

    type = 'discussion'
    title = ugettext_noop('Discussion')
    priority = None
    view_name = 'discussion.views.forum_form_discussion'
    fragment_view_name = 'discussion.views.DiscussionBoardFragmentView'
    is_hideable = settings.FEATURES.get('ALLOW_HIDING_DISCUSSION_TAB', False)
    is_default = False
    is_visible_to_sneak_peek = False
    body_class = 'discussion'
    online_help_token = 'discussions'

    @classmethod
    def is_enabled(cls, course, user=None):
        if not super(DiscussionTab, cls).is_enabled(course, user):
            return False
        return utils.is_discussion_enabled(course.id)
