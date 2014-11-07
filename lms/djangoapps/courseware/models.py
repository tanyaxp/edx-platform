"""
WE'RE USING MIGRATIONS!

If you make changes to this model, be sure to create an appropriate migration
file and check it in at the same time as your model changes. To do that,

1. Go to the edx-platform dir
2. ./manage.py schemamigration courseware --auto description_of_your_change
3. Add the migration file created in edx-platform/lms/djangoapps/courseware/migrations/


ASSUMPTIONS: modules have unique IDs, even across different module_types

"""
from django.contrib.auth.models import User
from django.conf import settings
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from instructor.views.data_access_constants import INCLUSION, SECTION_FILTERS, PROBLEM_FILTERS, QUERY_TYPE, Query


from xmodule_django.models import CourseKeyField, LocationKeyField


class StudentModule(models.Model):
    """
    Keeps student state for a particular module in a particular course.
    """
    MODEL_TAGS = ['course_id', 'module_type']

    # For a homework problem, contains a JSON
    # object consisting of state
    MODULE_TYPES = (('problem', 'problem'),
                    ('video', 'video'),
                    ('html', 'html'),
                    )
    ## These three are the key for the object
    module_type = models.CharField(max_length=32, choices=MODULE_TYPES, default='problem', db_index=True)

    # Key used to share state. By default, this is the module_id,
    # but for abtests and the like, this can be set to a shared value
    # for many instances of the module.
    # Filename for homeworks, etc.
    module_state_key = LocationKeyField(max_length=255, db_index=True, db_column='module_id')
    student = models.ForeignKey(User, db_index=True)

    course_id = CourseKeyField(max_length=255, db_index=True)

    class Meta:
        unique_together = (('student', 'module_state_key', 'course_id'),)

    ## Internal state of the object
    state = models.TextField(null=True, blank=True)

    ## Grade, and are we done?
    grade = models.FloatField(null=True, blank=True, db_index=True)
    max_grade = models.FloatField(null=True, blank=True)
    DONE_TYPES = (('na', 'NOT_APPLICABLE'),
                    ('f', 'FINISHED'),
                    ('i', 'INCOMPLETE'),
                    )
    done = models.CharField(max_length=8, choices=DONE_TYPES, default='na', db_index=True)

    created = models.DateTimeField(auto_now_add=True, db_index=True)
    modified = models.DateTimeField(auto_now=True, db_index=True)

    @classmethod
    def all_submitted_problems_read_only(cls, course_id):
        """
        Return all model instances that correspond to problems that have been
        submitted for a given course. So module_type='problem' and a non-null
        grade. Use a read replica if one exists for this environment.
        """
        queryset = cls.objects.filter(
            course_id=course_id,
            module_type='problem',
            grade__isnull=False
        )
        if "read_replica" in settings.DATABASES:
            return queryset.using("read_replica")
        else:
            return queryset

    def __repr__(self):
        return 'StudentModule<%r>' % ({
            'course_id': self.course_id,
            'module_type': self.module_type,
            'student': self.student.username,
            'module_state_key': self.module_state_key,
            'state': str(self.state)[:20],
        },)

    def __unicode__(self):
        return unicode(repr(self))


class StudentModuleHistory(models.Model):
    """Keeps a complete history of state changes for a given XModule for a given
    Student. Right now, we restrict this to problems so that the table doesn't
    explode in size."""

    HISTORY_SAVING_TYPES = {'problem'}

    class Meta:
        get_latest_by = "created"

    student_module = models.ForeignKey(StudentModule, db_index=True)
    version = models.CharField(max_length=255, null=True, blank=True, db_index=True)

    # This should be populated from the modified field in StudentModule
    created = models.DateTimeField(db_index=True)
    state = models.TextField(null=True, blank=True)
    grade = models.FloatField(null=True, blank=True)
    max_grade = models.FloatField(null=True, blank=True)

    @receiver(post_save, sender=StudentModule)
    def save_history(sender, instance, **kwargs):  # pylint: disable=no-self-argument, unused-argument
        """
        Checks the instance's module_type, and creates & saves a
        StudentModuleHistory entry if the module_type is one that
        we save.
        """
        if instance.module_type in StudentModuleHistory.HISTORY_SAVING_TYPES:
            history_entry = StudentModuleHistory(student_module=instance,
                                                 version=None,
                                                 created=instance.modified,
                                                 state=instance.state,
                                                 grade=instance.grade,
                                                 max_grade=instance.max_grade)
            history_entry.save()


class XModuleUserStateSummaryField(models.Model):
    """
    Stores data set in the Scope.user_state_summary scope by an xmodule field
    """

    class Meta:
        unique_together = (('usage_id', 'field_name'),)

    # The name of the field
    field_name = models.CharField(max_length=64, db_index=True)

    # The definition id for the module
    usage_id = LocationKeyField(max_length=255, db_index=True)

    # The value of the field. Defaults to None dumped as json
    value = models.TextField(default='null')

    created = models.DateTimeField(auto_now_add=True, db_index=True)
    modified = models.DateTimeField(auto_now=True, db_index=True)

    def __repr__(self):
        return 'XModuleUserStateSummaryField<%r>' % ({
            'field_name': self.field_name,
            'usage_id': self.usage_id,
            'value': self.value,
        },)

    def __unicode__(self):
        return unicode(repr(self))


class XModuleStudentPrefsField(models.Model):
    """
    Stores data set in the Scope.preferences scope by an xmodule field
    """

    class Meta:
        unique_together = (('student', 'module_type', 'field_name'),)

    # The name of the field
    field_name = models.CharField(max_length=64, db_index=True)

    # The type of the module for these preferences
    module_type = models.CharField(max_length=64, db_index=True)

    # The value of the field. Defaults to None dumped as json
    value = models.TextField(default='null')

    student = models.ForeignKey(User, db_index=True)

    created = models.DateTimeField(auto_now_add=True, db_index=True)
    modified = models.DateTimeField(auto_now=True, db_index=True)

    def __repr__(self):
        return 'XModuleStudentPrefsField<%r>' % ({
            'field_name': self.field_name,
            'module_type': self.module_type,
            'student': self.student.username,
            'value': self.value,
        },)

    def __unicode__(self):
        return unicode(repr(self))


class XModuleStudentInfoField(models.Model):
    """
    Stores data set in the Scope.preferences scope by an xmodule field
    """

    class Meta:
        unique_together = (('student', 'field_name'),)

    # The name of the field
    field_name = models.CharField(max_length=64, db_index=True)

    # The value of the field. Defaults to None dumped as json
    value = models.TextField(default='null')

    student = models.ForeignKey(User, db_index=True)

    created = models.DateTimeField(auto_now_add=True, db_index=True)
    modified = models.DateTimeField(auto_now=True, db_index=True)

    def __repr__(self):
        return 'XModuleStudentInfoField<%r>' % ({
            'field_name': self.field_name,
            'student': self.student.username,
            'value': self.value,
        },)

    def __unicode__(self):
        return unicode(repr(self))


class OfflineComputedGrade(models.Model):
    """
    Table of grades computed offline for a given user and course.
    """
    user = models.ForeignKey(User, db_index=True)
    course_id = CourseKeyField(max_length=255, db_index=True)

    created = models.DateTimeField(auto_now_add=True, null=True, db_index=True)
    updated = models.DateTimeField(auto_now=True, db_index=True)

    gradeset = models.TextField(null=True, blank=True)		# grades, stored as JSON

    class Meta:
        unique_together = (('user', 'course_id'), )

    def __unicode__(self):
        return "[OfflineComputedGrade] %s: %s (%s) = %s" % (self.user, self.course_id, self.created, self.gradeset)


class OfflineComputedGradeLog(models.Model):
    """
    Log of when offline grades are computed.
    Use this to be able to show instructor when the last computed grades were done.
    """
    class Meta:
        ordering = ["-created"]
        get_latest_by = "created"

    course_id = CourseKeyField(max_length=255, db_index=True)
    created = models.DateTimeField(auto_now_add=True, null=True, db_index=True)
    seconds = models.IntegerField(default=0)  	# seconds elapsed for computation
    nstudents = models.IntegerField(default=0)

    def __unicode__(self):
        return "[OCGLog] %s: %s" % (self.course_id.to_deprecated_string(), self.created)  # pylint: disable=no-member


class CoursePreference(models.Model):
    """
    This is a place to keep course preferences that are not inherent to the course.  Those should be attributes
    of the course xmodule (advanced settings).
    A good example is whether this course allows nonregistered users to access it.
    """
    course_id = CourseKeyField(max_length=255, db_index=True)
    pref_key = models.CharField(max_length=255)
    pref_value = models.CharField(max_length=255, null=True)

    class Meta:
        unique_together = (('course_id', 'pref_key'))

    @classmethod
    def get_pref_value(cls, course_id, pref_key):
        try:
            return cls.objects.get(course_id=course_id, pref_key=pref_key).pref_value
        except cls.DoesNotExist:
            return None

    @classmethod
    def course_allows_nonregistered_access(cls, course_id):
        return bool(cls.get_pref_value(course_id, 'allow_nonregistered_access'))

    def __unicode__(self):
        return u"{} : {} : {}".format(self.course_id, self.pref_key, self.pref_value)


class GroupedQueries(models.Model):
    title=models.CharField(max_length=255)
    course_id = CourseKeyField(max_length=255, db_index=True)

    def __unicode__(self):
        return "[GroupedQueries] Query %d for Course %s, %s" % (self.id,
                                                                self.course_id,
                                                                self.title)


class QueriesSaved(models.Model):
    inclusions = (
        ('A', INCLUSION.AND),
        ('N', INCLUSION.NOT),
        ('O', INCLUSION.OR),
    )

    course_id = CourseKeyField(max_length=255, db_index=True)
    module_state_key = LocationKeyField(max_length=255, db_index=True, db_column='module_id')
    inclusion = models.CharField(max_length=1, choices=inclusions)
    filter_on = models.CharField(max_length=255)

    def __unicode__(self):
        return "[QueriesSaved] Query %d for %s/%s, %s %s" % (self.id,
                                                             self.course_id,
                                                             self.module_state_key,
                                                             self.get_inclusion_display(),
                                                             self.filter_on)


class QueriesTemporary(models.Model):
    inclusions = (
        ('A', INCLUSION.AND),
        ('N', INCLUSION.NOT),
        ('O', INCLUSION.OR),
    )

    course_id = CourseKeyField(max_length=255, db_index=True)
    module_state_key = LocationKeyField(max_length=255, db_index=True, db_column='module_id')
    inclusion = models.CharField(max_length=1, choices=inclusions)
    filter_on = models.CharField(max_length=255)

    def __unicode__(self):
        return "[QueriesSaved] Query %d for %s/%s, %s %s" % (self.id,
                                                             self.course_id,
                                                             self.module_state_key,
                                                             self.get_inclusion_display(),
                                                             self.filter_on)



class QueriesStudents(models.Model):
    inclusions = (
        ('A', INCLUSION.AND),
        ('N', INCLUSION.NOT),
        ('O', INCLUSION.OR),
    )

    query = models.ForeignKey('QueriesTemporary')
    student = models.ForeignKey(User, db_index=True)
    inclusion = models.CharField(max_length=1, choices=inclusions)

    def __unicode__(self):
        return "[QueriesStudents] Query %d for %s, %s" % (self.query.id,
                                                             self.student,
                                                             self.get_inclusion_display())


class GroupedQueriesStudents(models.Model):
    grouped = models.ForeignKey('GroupedQueries')
    student = models.ForeignKey(User, db_index=True)

    def __unicode__(self):
        return "[GroupedQueriesStudents] Query %d has %s" % (self.grouped.id,
                                                                 self.student)



class GroupedQueriesSubqueries(models.Model):
    """
    Saved queries per course
    """
    grouped = models.ForeignKey('GroupedQueries')
    query = models.ForeignKey('QueriesSaved')

    def __unicode__(self):
        return "[GroupedQueriesSubqueries] Group %d has Query %d" % (self.grouped.id, self.query.id)



