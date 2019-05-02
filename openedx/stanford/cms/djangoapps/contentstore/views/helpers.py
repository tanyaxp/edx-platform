from django.core.urlresolvers import reverse


def reverse_course_url(name, course_id):
    course_id = unicode(course_id)
    url = reverse(
        name,
        kwargs={
            'course_key_string': course_id,
        },
    )
    return url
