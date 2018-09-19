import json
import logging

from django.conf import settings

from courseware.models import StudentModule

log = logging.getLogger(__name__)


def _iterate_problem_components(course):
    """
    Iterate through all problems in a course
    """
    for section in course.get_children():
        section_name = section.display_name_with_default
        for subsection in section.get_children():
            subsection_name = subsection.display_name_with_default
            for unit in subsection.get_children():
                unit_name = unit.display_name_with_default
                parent_metadata = [section_name, subsection_name, unit_name]
                for component in unit.get_children():
                    if component.category in settings.STUDENT_RESPONSES_REPORT_SUPPORTED_TYPES:
                        yield component, parent_metadata
                    elif component.category in settings.TYPES_WITH_CHILD_PROBLEMS_LIST:
                        for library_problem in component.get_children():
                            if library_problem.category in settings.STUDENT_RESPONSES_REPORT_SUPPORTED_TYPES:
                                yield library_problem, parent_metadata


def student_responses(course):
    """
    Yields student responses for all problems in course for writing out to a CSV file
    """
    order = 1
    for problem_component, parent_metadata in _iterate_problem_components(course):
        problem_component_info = parent_metadata + [
            problem_component.display_name_with_default,
            order,
            problem_component.location,
        ]
        modules = StudentModule.objects.filter(
            course_id=course.id,
            grade__isnull=False,
            module_state_key=problem_component.location,
        ).order_by('student__username')
        if modules:
            has_answer = False
            for module in modules:
                state_dict = {}
                if module.state:
                    try:
                        state_dict = json.loads(module.state)
                    except ValueError:
                        log.error(
                            "Student responses: Could not parse module state for StudentModule id=%s, course=%s",
                            module.id,
                            course.id,
                        )
                        continue
                # Include other problems, e.g. Free Text Response, Submit And Compare Xblocks
                # that write 'student_answer' to the state.
                if 'student_answers' in state_dict:
                    raw_answers = state_dict['student_answers']
                    pretty_answers = u', '.join([
                        u"{problem}={answer}".format(
                            problem=problem,
                            answer=answer,
                        )
                        for (problem, answer) in raw_answers.items()
                    ])
                elif 'student_answer' in state_dict:
                    raw_answer = state_dict['student_answer']
                    pretty_answers = u"{answer}".format(answer=raw_answer)
                elif 'attempted' in state_dict and 'completed' in state_dict:  # problem-builder
                    pretty_answers = "{answer}".format(
                        answer=state_dict,
                    )
                else:
                    raw_answers = {}
                    pretty_answers = None
                yield problem_component_info + [module.student.username, pretty_answers]
                if not has_answer:
                    has_answer = True
            if has_answer:
                order += 1
