"""
Custom override of SearchFilterGenerator to use course tiles for
discovery search.
"""
from search.filter_generator import SearchFilterGenerator

from branding_stanford.models import TileConfiguration
from lms.lib.courseware_search.lms_filter_generator import LmsSearchFilterGenerator


class TileSearchFilterGenerator(LmsSearchFilterGenerator):
    """
    SearchFilterGenerator for LMS Search.
    """

    def field_dictionary(self, **kwargs):
        """
        Return field filter dictionary for search.
        """
        field_dictionary = super(TileSearchFilterGenerator, self).field_dictionary(**kwargs)
        if not kwargs.get('user'):
            # Adds tile courses for discovery search
            course_tiles_ids = TileConfiguration.objects.filter(
                enabled=True,
            ).values_list('course_id', flat=True).order_by('-change_date')
            field_dictionary['course'] = list(course_tiles_ids)
        return field_dictionary
