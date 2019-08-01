# Instructions

- Add `openedx.stanford.djangoapps.auth_lagunita` to the
  `ADDL_INSTALLED_APPS` list in `lms.env.json`.
- Set `REGISTRATION_EXTENSION_FORM` to
  `openedx.stanford.djangoapps.auth_lagunita.forms.InfoForm` in
  `lms.env.json`.
- Run migrations.
- Start/restart the LMS.
