from opaque_keys.edx.keys import CourseKey
from student.models import CourseAccessRole
from student.models import CourseEnrollment


NON_STUDENT_ROLES = ['instructor', 'staff']


def get_roster(course_id):
    """
    Returns roster with PII of all enrollees in course
    """
    course_key = CourseKey.from_string(course_id)
    # Select appropriate enrollment, user and profile fields for enrolled students.
    enrollments = CourseEnrollment.objects.select_related(
        'user'
    ).select_related(
        'user__profile'
    ).filter(
        course_id=course_key,
        is_active=True,
    ).values(
        'user__id',
        'user__username',
        'user__email',
        'mode',
        'user__profile__name',
    ).order_by(
        'user__username'
    )
    # Find all user_ids with instructor or staff roles in course.
    non_students = CourseAccessRole.objects.filter(
        course_id=course_key,
        role__in=NON_STUDENT_ROLES,
    ).values('user_id').distinct()
    roster = []
    for enrollment in enrollments:
        is_staff = 0
        for non_student in non_students:
            if non_student.values()[0] == enrollment['user__id']:
                is_staff = 1
                break
        roster.append({
            'user_id': enrollment['user__id'],
            'username': enrollment['user__username'],
            'email': enrollment['user__email'],
            'mode': enrollment['mode'],
            'is_staff': is_staff,
            'name': enrollment['user__profile__name'],
        })
    return roster
