/* globals _, Logger, Slick, tinyMCE, InstructorDashboard, PendingInstructorTasks, createTaskListTable */

(function() {
    'use strict';
    var IntervalManager, KeywordValidator,
        createEmailContentTable, createEmailMessageViews,
        findAndAssert, pWrapper, plantInterval, plantTimeout,
        sentToFormatter, setupCopyEmailButton, subjectFormatter,
        unknownIfNullFormatter, unknownP,
        anyOf = [].indexOf || function(item) {
            var i, l;
            for (i = 0, l = this.length; i < l; i++) {
                if (i in this && this[i] === item) {
                    return i;
                }
            }
            return -1;
        };

    plantTimeout = function(ms, cb) {
        return setTimeout(cb, ms);
    };

    plantInterval = function(ms, cb) {
        return setInterval(cb, ms);
    };

    findAndAssert = function($root, selector) {
        var item, msg;
        item = $root.find(selector);
        if (item.length !== 1) {
            msg = 'Failed Element Selection';
            throw msg;
        } else {
            return item;
        }
    };

    this.statusAjaxError = function(handler) {
        return function(jqXHR, textStatus, errorThrown) { //  eslint-disable-line no-unused-vars
            return handler.apply(this, arguments);
        };
    };

    this.createTaskListTable = function($tableTasks, tasksData) {
        var $tablePlaceholder, columns, options, tableData;
        $tableTasks.empty();
        options = {
            enableCellNavigation: true,
            enableColumnReorder: false,
            autoHeight: true,
            rowHeight: 100,
            forceFitColumns: true
        };
        columns = [
            {
                id: 'task_type',
                field: 'task_type',
        /*
        Translators: a "Task" is a background process such as grading students or sending email
        */

                name: gettext('Task Type'),
                minWidth: 102
            }, {
                id: 'task_input',
                field: 'task_input',
        /*
        Translators: a "Task" is a background process such as grading students or sending email
        */

                name: gettext('Task inputs'),
                minWidth: 150
            }, {
                id: 'task_id',
                field: 'task_id',
        /*
        Translators: a "Task" is a background process such as grading students or sending email
        */

                name: gettext('Task ID'),
                minWidth: 150
            }, {
                id: 'requester',
                field: 'requester',
        /*
        Translators: a "Requester" is a username that requested a task such as sending email
        */

                name: gettext('Requester'),
                minWidth: 80
            }, {
                id: 'created',
                field: 'created',
        /*
        Translators: A timestamp of when a task (eg, sending email) was submitted appears after this
        */

                name: gettext('Submitted'),
                minWidth: 120
            }, {
                id: 'duration_sec',
                field: 'duration_sec',
        /*
        Translators: The length of a task (eg, sending email) in seconds appears this
        */

                name: gettext('Duration (sec)'),
                minWidth: 80
            }, {
                id: 'task_state',
                field: 'task_state',
        /*
        Translators: The state (eg, "In progress") of a task (eg, sending email) appears after this.
        */

                name: gettext('State'),
                minWidth: 80
            }, {
                id: 'status',
                field: 'status',
        /*
        Translators: a "Task" is a background process such as grading students or sending email
        */

                name: gettext('Task Status'),
                minWidth: 80
            }, {
                id: 'task_message',
                field: 'task_message',
        /*
        Translators: a "Task" is a background process such as grading students or sending email
        */

                name: gettext('Task Progress'),
                minWidth: 120
            }
        ];
        tableData = tasksData;
        $tablePlaceholder = $('<div/>', {
            class: 'slickgrid'
        });
        $tableTasks.append($tablePlaceholder);
        return new Slick.Grid($tablePlaceholder, tableData, columns, options);
    };

    subjectFormatter = function(row, cell, value) {
        var subjectText;
        if (value === null) {
            return gettext('An error occurred retrieving your email. Please try again later, and contact technical support if the problem persists.');  // eslint-disable-line max-len
        }
        subjectText = $('<span>').text(value.subject).html();
        return edx.HtmlUtils.joinHtml(edx.HtmlUtils.HTML(
            '<p><a href="#email_message_'), value.id, edx.HtmlUtils.HTML(
                '" id="email_message_'), value.id, edx.HtmlUtils.HTML('_trig">'),
                subjectText, edx.HtmlUtils.HTML('</a></p>')
            );
    };

    pWrapper = function(value) {
        return edx.HtmlUtils.joinHtml(edx.HtmlUtils.HTML('<p>'), value, edx.HtmlUtils.HTML('</p>'));
    };

    unknownP = function() {
        return pWrapper(gettext('Unknown'));
    };

    sentToFormatter = function(row, cell, value) {
        if (value === null) {
            return unknownP();
        } else {
            return pWrapper(value.join(', '));
        }
    };

    unknownIfNullFormatter = function(row, cell, value) {
        if (value === null) {
            return unknownP();
        } else {
            return pWrapper(value);
        }
    };

    createEmailContentTable = function($tableEmails, $tableEmailsInner, emailData) {
        var $tablePlaceholder, columns, options, tableData;
        $tableEmailsInner.empty();
        $tableEmails.show();
        options = {
            enableCellNavigation: true,
            enableColumnReorder: false,
            autoHeight: true,
            rowHeight: 50,
            forceFitColumns: true
        };
        columns = [
            {
                id: 'email',
                field: 'email',
                name: gettext('Subject'),
                minWidth: 80,
                cssClass: 'email-content-cell',
                formatter: subjectFormatter
            }, {
                id: 'requester',
                field: 'requester',
                name: gettext('Sent By'),
                minWidth: 80,
                maxWidth: 100,
                cssClass: 'email-content-cell',
                formatter: unknownIfNullFormatter
            }, {
                id: 'sent_to',
                field: 'sent_to',
                name: gettext('Sent To'),
                minWidth: 80,
                maxWidth: 100,
                cssClass: 'email-content-cell',
                formatter: sentToFormatter
            }, {
                id: 'created',
                field: 'created',
                name: gettext('Time Sent'),
                minWidth: 80,
                cssClass: 'email-content-cell',
                formatter: unknownIfNullFormatter
            }, {
                id: 'number_sent',
                field: 'number_sent',
                name: gettext('Number Sent'),
                minwidth: 100,
                maxWidth: 150,
                cssClass: 'email-content-cell',
                formatter: unknownIfNullFormatter
            }
        ];
        tableData = emailData;
        $tablePlaceholder = $('<div/>', {
            class: 'slickgrid'
        });
        $tableEmailsInner.append($tablePlaceholder);
        Slick.Grid($tablePlaceholder, tableData, columns, options);
        return $tableEmails.append($('<br/>'));
    };

    createEmailMessageViews = function($messagesWrapper, emails) {
        var $closeButton, $created, $emailContent, $emailContentHeader,
            $emailHeader, $emailWrapper, $message, $messageContent,
            $requester, $sentTo, $subject, emailId, emailInfo, interpolateHeader, i, len;
        $messagesWrapper.empty();
        for (i = 0, len = emails.length; i < len; i++) {
            emailInfo = emails[i];
            if (!emailInfo.email) {
                return;
            }
            emailId = emailInfo.email.id;
            $messageContent = $('<section>', {
                'aria-hidden': 'true',
                class: 'modal email-modal',
                id: 'email_message_' + emailId
            });
            $emailWrapper = $('<div>', {
                class: 'inner-wrapper email-content-wrapper'
            });
            $emailHeader = $('<div>', {
                class: 'email-content-header'
            });
            $emailHeader.append($('<input>', {
                type: 'button',
                name: 'copy-email-body-text',
                value: gettext('Copy Email To Editor'),
                id: 'copy_email_' + emailId
            }));
            $closeButton = $('<a>', {
                href: '#',
                class: 'close-modal'
            });
            $closeButton.append($('<i>', {
                class: 'icon fa fa-times'
            }));
            $emailHeader.append($closeButton);
            interpolateHeader = function(title, value) {
                return edx.HtmlUtils.setHtml($('<h2>', {
                    class: 'message-bold'
                }), edx.HtmlUtils.joinHtml(edx.HtmlUtils.HTML('<em>'), title, edx.HtmlUtils.HTML('</em>'), value));
            };
            $subject = interpolateHeader(gettext('Subject:'), emailInfo.email.subject);
            $requester = interpolateHeader(gettext('Sent By:'), emailInfo.requester);
            $created = interpolateHeader(gettext('Time Sent:'), emailInfo.created);
            $sentTo = interpolateHeader(gettext('Sent To:'), emailInfo.sent_to.join(', '));
            $emailHeader.append($subject);
            $emailHeader.append($requester);
            $emailHeader.append($created);
            $emailHeader.append($sentTo);
            $emailWrapper.append($emailHeader);
            $emailWrapper.append($('<hr>'));
            $emailContent = $('<div>', {
                class: 'email-content-message'
            });
            $emailContentHeader = edx.HtmlUtils.setHtml($('<h2>', {
                class: 'message-bold'
            }), edx.HtmlUtils.joinHtml(edx.HtmlUtils.HTML('<em>'), gettext('Message:'), edx.HtmlUtils.HTML('</em>')));
            $emailContent.append($emailContentHeader);
            $message = edx.HtmlUtils.setHtml($('<div>'), edx.HtmlUtils.HTML(emailInfo.email.html_message));
            $emailContent.append($message);
            $emailWrapper.append($emailContent);
            $messageContent.append($emailWrapper);
            $messagesWrapper.append($messageContent);
            $('#email_message_' + emailInfo.email.id + '_trig').leanModal({
                closeButton: '.close-modal',
                copyEmailButton: '#copy_email_' + emailId
            });
            setupCopyEmailButton(emailId, emailInfo.email.html_message, emailInfo.email.subject);
        }
    };

    setupCopyEmailButton = function(emailId, htmlMessage, subject) {
        return $('#copy_email_' + emailId).click(function() {
            var editor;
            editor = tinyMCE.get('mce_0');
            editor.setContent(htmlMessage);
            return $('#id_subject').val(subject);
        });
    };

    IntervalManager = (function() {
        function intervalManager(ms, fn) {
            this.ms = ms;
            this.fn = fn;
            this.intervalID = null;
        }

        intervalManager.prototype.start = function() {
            this.fn();
            if (this.intervalID === null) {
                this.intervalID = setInterval(this.fn, this.ms);
                return this.intervalID;
            }
            return this.intervalID;
        };

        intervalManager.prototype.stop = function() {
            clearInterval(this.intervalID);
            this.intervalID = null;
            return this.intervalID;
        };

        return intervalManager;
    }());

    this.PendingInstructorTasks = (function() {
        function PendingInstructorTasks($section) {
            var TASK_LIST_POLL_INTERVAL,
                ths = this;
            this.$section = $section;
            this.reload_running_tasks_list = function() {
                return PendingInstructorTasks.prototype.reload_running_tasks_list.apply(
                    ths, arguments
                );
            };
            this.$running_tasks_section = findAndAssert(this.$section, '.running-tasks-section');
            this.$table_running_tasks = findAndAssert(this.$section, '.running-tasks-table');
            this.$no_tasks_message = findAndAssert(this.$section, '.no-pending-tasks-message');
            if (this.$table_running_tasks.length) {
                TASK_LIST_POLL_INTERVAL = 20000;
                this.reload_running_tasks_list();
                this.task_poller = new IntervalManager(TASK_LIST_POLL_INTERVAL, function() {
                    return ths.reload_running_tasks_list();
                });
            }
        }

        PendingInstructorTasks.prototype.reload_running_tasks_list = function() {
            var listEndpoint,
                ths = this;
            listEndpoint = this.$table_running_tasks.data('endpoint');
            return $.ajax({
                type: 'POST',
                dataType: 'json',
                url: listEndpoint,
                success: function(data) {
                    if (data.tasks.length) {
                        createTaskListTable(ths.$table_running_tasks, data.tasks);
                        ths.$no_tasks_message.hide();
                        return ths.$running_tasks_section.show();
                    } else {
                        ths.$running_tasks_section.hide();
                        ths.$no_tasks_message.empty();
                        ths.$no_tasks_message.append($('<p>').text(gettext('No tasks currently running.')));
                        return ths.$no_tasks_message.show();
                    }
                }
            });
        };

        return PendingInstructorTasks;
    }());

    KeywordValidator = (function() {
        function keywordValidator() {}

        keywordValidator.keyword_regex = /%%+[^%]+%%/g;

        keywordValidator.keywords = [
            '%%USERNAME%%', '%%COURSE_ID%%', '%%COURSE_START_DATE%%',
            '%%USER_ID%%', '%%USER_FULLNAME%%', '%%COURSE_DISPLAY_NAME%%', '%%COURSE_END_DATE%%'
        ];

        keywordValidator.validate_string = function(string) {
            var foundKeyword, foundKeywords, invalidKeywords, isValid,
                keywords, regexMatch, validation, i, len;
            regexMatch = string.match(KeywordValidator.keyword_regex);
            foundKeywords = regexMatch === null ? [] : regexMatch;
            invalidKeywords = [];
            isValid = true;
            keywords = KeywordValidator.keywords;
            validation = function(foundkeyword) {
                if (anyOf.call(keywords, foundkeyword) < 0) {
                    return invalidKeywords.push(foundkeyword);
                } else {
                    return invalidKeywords;
                }
            };
            for (i = 0, len = foundKeywords.length; i < len; i++) {
                foundKeyword = foundKeywords[i];
                validation(foundKeyword);
            }
            if (invalidKeywords.length !== 0) {
                isValid = false;
            }
            return {
                isValid: isValid,
                invalidKeywords: invalidKeywords
            };
        };

        return keywordValidator;
    }).call(this);

    this.ReportDownloads = (function() {
      /* Report Downloads -- links expire quickly, so we refresh every 5 mins
      */

        function ReportDownloads($section) {
            var POLL_INTERVAL,
                reportdownloads = this;
            this.$section = $section;
            this.$report_downloads_table = this.$section.find('.report-downloads-table');
            var reports = this.$section.find('.reports-download-container');
            this.$reports_request_response = reports.find('.request-response');
            this.$reports_request_response_error = reports.find('.request-response-error');
            this.$delete_endpoint = $('.report-downloads-delete').data('endpoint');
            this.$graph_endpoint = $(".report-downloads-graph").data('endpoint');
            this.$clicked_name;
            POLL_INTERVAL = 20000;
            this.downloads_poller = new InstructorDashboard.util.IntervalManager(POLL_INTERVAL, function() {
                return reportdownloads.reload_report_downloads();
            });
        }

        ReportDownloads.prototype.reload_report_downloads = function() {
            var endpoint,
                ths = this;
            endpoint = this.$report_downloads_table.data('endpoint');
            return $.ajax({
                type: 'POST',
                dataType: 'json',
                url: endpoint,
                success: function(data) {
                    if (data.downloads.length) {
                        return ths.create_report_downloads_table(data.downloads);
                    } else {
                        return false;
                    }
                }
            });
        };

        ReportDownloads.prototype.create_report_downloads_table = function(reportDownloadsData) {
            var $tablePlaceholder, columns, grid, options;
            var ths = this;
            this.$report_downloads_table.empty();
            options = {
                enableCellNavigation: true,
                enableColumnReorder: false,
                rowHeight: 50,
                forceFitColumns: true
            };
            columns = [
                {
                    id: 'link',
                    field: 'link',
                    name: gettext('File Name'),
                    toolTip: gettext('Links are generated on demand and expire within 5 minutes due to the sensitive nature of student information.'), //  eslint-disable-line max-len
                    sortable: false,
                    minWidth: 150,
                    cssClass: 'file-download-link',
                    formatter: function(row, cell, value, columnDef, dataContext) {
                        return edx.HtmlUtils.joinHtml(edx.HtmlUtils.HTML(
                            '<a class="report-link" target="_blank" href="'), dataContext.url,
                            edx.HtmlUtils.HTML('">'), dataContext.name,
                            edx.HtmlUtils.HTML('</a>'));
                    }
                },
                {
                    id: 'actions',
                    field: 'actions',
                    name: gettext('Actions'),
                    toolTip: gettext('Row actions are found here: ie. Deletion.'),
                    sortable: false,
                    maxWidth: 100,
                    cssClass: 'file-actions',
                    formatter: function(row, cell, value, columnDef, dataContext) {
                        var delete_button, graph_button;
                        delete_button = edx.HtmlUtils.HTML('<a class="delete-report"><i class="fa fa-times-circle"></i>Delete</a>');
                        if (dataContext['name'].indexOf("course_forums") > -1) {
                            graph_button = edx.HtmlUtils.HTML('<a class="graph-forums"><i class="fa fa-bar-chart"></i>Graph This</a>');
                        }
                        return edx.HtmlUtils.joinHtml(delete_button, graph_button);
                    }
                }
            ];
            $tablePlaceholder = $('<div/>', {
                class: 'slickgrid'
            });
            ths.$report_downloads_table.append($tablePlaceholder);
            grid = new Slick.Grid($tablePlaceholder, reportDownloadsData, columns, options);
            grid.onClick.subscribe(function(event) {
                var reportUrl;
                reportUrl = event.target.href;
                if (reportUrl) {
                    return Logger.log('edx.instructor.report.downloaded', {
                        report_url: reportUrl
                    });
                }
                return Logger.log('edx.instructor.report.downloaded', {
                    report_url: reportUrl
                });
            });

            $(".graph-forums").click(function() {
                var filename_cell, table_row;
                table_row = $(this).parent().parent()
                filename_cell = table_row.find('.report-link');
                ths.$clicked_name = filename_cell.text();
                ths.graph_forums();
            });

            $('#report-downloads-table .delete-report').click(function() {
                var file_to_delete, filename_cell, table_row;
                table_row = $(this).parent().parent();
                filename_cell = table_row.find('.report-link');
                file_to_delete = filename_cell.text();
                if (confirm(gettext('Are you sure you want to delete the file ' + file_to_delete + '? This cannot be undone.'))) {
                    function successCallback() {
                        ths.remove_row_from_ui(table_row);
                        ths.display_file_delete_success(file_to_delete);
                    };
                    function failureCallback() {
                        ths.display_file_delete_failure(file_to_delete);
                    };
                    ths.delete_report(file_to_delete, successCallback, failureCallback);
                }
            });

            ths.$reports_request_response.hide();
            ths.$reports_request_response_error.hide();

            return grid.autosizeColumns();
        };

        ReportDownloads.prototype.get_forum_csv = function(callback) {
            var that = this;
            return $.ajax({
                dataType: 'json',
                url: that.$graph_endpoint,
                type: 'POST',
                data: {
                    "clicked_on": that.$clicked_name
                },
                success: function(data) {
                    return typeof callback === "function" ? callback(null, data) : void 0;
                },
                error: function(std_ajax_err) {
                    return typeof callback === "function" ? callback(gettext('Error getting forum csv')) : void 0;
                }
            });
        }
        ReportDownloads.prototype.graph_forums = function(graphEndpoint) {
            var that = this;
            return this.get_forum_csv(function(error, forums) {
                var data, error_str, file_name, graph_classname;
                if (error) {
                    return that.show_graph_errors(error);
                }
                data = forums['data'];
                file_name = forums['filename'];
                graph_classname = "report-downloads-graph";
                if (data === 'failure') {
                    error_str = "No Data To Graph. The file might have expired; please refresh and try again";
                    $(".report-downloads-graph-title").html(error_str);
                    $("." + graph_classname).html("");
                    return 'No data to Graph';
                }
                $(".report-downloads-graph-title").html(file_name);
                return d3_graph_data_download(data, "report-downloads-graph");
            });
        },
        ReportDownloads.prototype.show_graph_errors = function(msg) {
            var ref;
            return (ref = this.$error_section) != null ? ref.text(msg) : void 0;
        }

        ReportDownloads.prototype.remove_row_from_ui = function(row) {
            var currX, currY, i, len, results, row_height, rows_after, sib_row;
            row_height = row.height();
            rows_after = row.nextAll();
            row.remove();
            results = [];
            for (i = 0, len = rows_after.length; i < len; i++) {
                sib_row = $(rows_after[i]);
                currX = sib_row.offset().left;
                currY = sib_row.offset().top;
                results.push(sib_row.offset({
                    top: currY - row_height,
                    left: currX
                }));
            }
            return results;
        };
        ReportDownloads.prototype.display_file_delete_success = function(file_to_delete) {
            this.$reports_request_response.text(gettext('The file ' + file_to_delete + ' was successfully deleted.'));
            this.$reports_request_response.show();
        };
        ReportDownloads.prototype.display_file_delete_failure = function(file_to_delete) {
            this.$reports_request_response_error.text(gettext('Error deleting the file ' + file_to_delete + '. Please try again.'));
            this.$reports_request_response_error.show();
        };
        ReportDownloads.prototype.delete_report = function(file_to_delete, successCallback, failureCallback) {
            return $.ajax({
                url: this.$delete_endpoint,
                type: 'POST',
                data: {
                    'filename': file_to_delete
                },
                dataType: 'json',
                success: function(data) {
                    return successCallback();
                },
                error: function(std_ajax_err) {
                    return failureCallback();
                }
            });
        };

        return ReportDownloads;
    }());

    if (typeof _ !== 'undefined' && _ !== null) {
        _.defaults(window, {
            InstructorDashboard: {}
        });
        window.InstructorDashboard.util = {
            plantTimeout: plantTimeout,
            plantInterval: plantInterval,
            statusAjaxError: this.statusAjaxError,
            IntervalManager: IntervalManager,
            createTaskListTable: createTaskListTable,
            createEmailContentTable: createEmailContentTable,
            createEmailMessageViews: createEmailMessageViews,
            PendingInstructorTasks: PendingInstructorTasks,
            KeywordValidator: KeywordValidator,
            ReportDownloads: this.ReportDownloads
        };
    }
}).call(this);
