define([
    'domReady', 'jquery', 'gettext'
], function(domReady, $, gettext) {

    'use strict';

    return function (bulkupdateUrl) {
        var $applyMaxAttempts = $('#max-attempts .apply-checkbox'),
            $applyShowAnswer = $('#show-answer .apply-checkbox'),
            $maxAttempts = $('#max-attempts .setting-input'),
            $showAnswer = $('#show-answer .setting-input'),
            $submitBtn = $('.view-bulkupdate .submit-button'),
            $errorMessage = $('.view-bulkupdate .server-message-wrapper .error-server-message'),
            $successMessage = $('.view-bulkupdate .server-message-wrapper .success-server-message'),
            SHOW_ANSWER_OPTIONS = [],
            VALIDATION_ERROR_MESSAGES = {
                maxAttempts: gettext('MaxAttempts must be a non-negative integer. Please enter a different value.'),
                showAnswer: gettext('Not a valid value for showAnswer. Please enter a different value.'),
            };

        // Fill SHOW_ANSWER_OPTIONS with option values from the HTML
        $('#show-answer option').each(function() {
            SHOW_ANSWER_OPTIONS.push($(this).val());
        });

        /**
         * Hides all error and success messages
         */
        function clearFeedbackDisplay() {
            $('.error-message-text').text('');
            $errorMessage.addClass('is-hidden');
            $successMessage.addClass('is-hidden');
        }

        /**
         * Gets setting values from HTML
         * @return {dict} Setting values the user wants changed, empty string
         *                value if they don't want to change that setting
         */
        function getSettingsData() {
            var data = {};
            if ($applyMaxAttempts.is(':checked')) {
                data.maxAttempts = parseInt($maxAttempts.val());
            } else {
                data.maxAttempts = '';
            }
            if ($applyShowAnswer.is(':checked')) {
                data.showAnswer = $showAnswer.val();
            } else {
                data.showAnswer = '';
            }
            return data;
        }

        /**
         * Validates setting values after being processed by getSettingsData()
         * @param {dict} settings data from getSettingsData()
         * @return {bool} false if no settings changed or settings have invalid value
         */
        function validateData(data) {
            var errors = [],
                errorString = '',
                maxAttempts = data.maxAttempts,
                showAnswer = data.showAnswer;

            if (!maxAttempts && maxAttempts !== 0 && !showAnswer) {
                return false;
            }
            if (maxAttempts && maxAttempts < 0) {
                errors.push(VALIDATION_ERROR_MESSAGES.maxAttempts);
            }
            if (showAnswer && SHOW_ANSWER_OPTIONS.indexOf(showAnswer) < 0) {
                errors.push(VALIDATION_ERROR_MESSAGES.showAnswer);
            }
            if (errors.length > 0) {
                errorString = errors.join(' ');
                $('.error-message-text').text(errorString).show();
                return false;
            }
            return true;
        }

        /**
         * Displays error message on request error
         */
        function onError(xhr) {
            var errMsg;
            try {
                var serverMsg = $.parseJSON(xhr.responseText) || {};
                errMsg = serverMsg.ErrMsg;
            } catch(e) {
                errMsg = '';
            }
            $('.error-message-text').text(errMsg);
            $errorMessage.removeClass('is-hidden');
        }

        /**
         * Gets and validates settings data and makes POST request to BulkUpdate
         */
        function onSubmit() {
            var data = getSettingsData();
            clearFeedbackDisplay();
            if (validateData(data)) {
                $submitBtn.prop('disabled', true);
                $.ajax({
                    type: 'POST',
                    data: data,
                    url: bulkupdateUrl,
                    complete: $submitBtn.prop('disabled', false),
                    error: onError(xhr),
                    success: $successMessage.removeClass('is-hidden'),
                    dataType: 'json'
                });
            }
            return false;
        }

        domReady(function () {
            $submitBtn.click(function (e) {
                e.preventDefault();
                onSubmit(e);
            });

            $maxAttempts.change(function() {
                $applyMaxAttempts.prop('checked', true);
            });
            $showAnswer.change(function() {
                $applyShowAnswer.prop('checked', true);
            });
        });
    };
});
