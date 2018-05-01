

(function (globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function (n) {
    var v=0;
    if (typeof(v) == 'boolean') {
      return v ? 1 : 0;
    } else {
      return v;
    }
  };
  

  
  /* gettext library */

  django.catalog = {
    " learner does not exist in LMS and not added to the exception list": "\u5b66\u4e60\u8005\u4e0d\u5b58\u5728\u7cfb\u7edf\u4e2d\uff0c\u5c06\u4e0d\u52a0\u5230\u4f8b\u5916\u5217\u8868\u4e2d", 
<<<<<<< HEAD
    " learner is already white listed and not added to the exception list": "\u5b66\u4e60\u8005\u5df2\u88ab\u5217\u5165\u767d\u8272\u6e05\u5355\uff0c\u4f46\u5e76\u672a\u6dfb\u52a0\u5230\u4f8b\u5916\u5217\u8868\u4e2d", 
    " learner is not enrolled in course and not added to the exception list": "\u5b66\u4e60\u8005\u6ca1\u6709\u8fdb\u5165\u8bfe\u7a0b, \u4e5f\u6ca1\u6709\u6dfb\u52a0\u5230\u4f8b\u5916\u5217\u8868\u4e2d\u3002", 
    " learner is successfully added to the exception list": "\u5b66\u4e60\u8005\u5df2\u7ecf\u6210\u529f\u5730\u52a0\u5165\u5230\u4f8b\u5916\u5217\u8868", 
    " learners are already white listed and not added to the exception list": "\u5b66\u4e60\u8005\u5df2\u88ab\u5217\u4e3a\u767d\u8272\u6e05\u5355, \u672a\u6dfb\u52a0\u5230\u4f8b\u5916\u5217\u8868\u4e2d", 
    " learners are not enrolled in course and not added to the exception list": "\u5b66\u4e60\u8005\u4e0d\u4f1a\u5728\u8bfe\u7a0b\u4e2d\u6ce8\u518c, \u4e5f\u4e0d\u4f1a\u6dfb\u52a0\u5230\u4f8b\u5916\u5217\u8868\u4e2d\u3002", 
    " learners are successfully added to exception list": "\u5b66\u4e60\u8005\u5df2\u7ecf\u6210\u529f\u5730\u52a0\u5165\u5230\u4f8b\u5916\u5217\u8868", 
    " learners do not exist in LMS and not added to the exception list": "\u5b66\u4e60\u8005\u4e0d\u5b58\u5728\u4e8e LMS \u4e2d, \u4e5f\u6ca1\u6709\u6dfb\u52a0\u5230\u5f02\u5e38\u5217\u8868\u4e2d", 
    " record is not in correct format and not added to the exception list": "\u8bb0\u5f55\u7684\u683c\u5f0f\u4e0d\u6b63\u786e\u4e14\u672a\u6dfb\u52a0\u5230\u5f02\u5e38\u5217\u8868\u4e2d", 
    " records are not in correct format and not added to the exception list": "\u8bb0\u5f55\u7684\u683c\u5f0f\u4e0d\u6b63\u786e\u4e14\u672a\u6dfb\u52a0\u5230\u5f02\u5e38\u5217\u8868\u4e2d", 
=======
    " learner is successfully added to the exception list": "\u5b66\u4e60\u8005\u5df2\u7ecf\u6210\u529f\u5730\u52a0\u5165\u5230\u4f8b\u5916\u5217\u8868", 
    " learners are successfully added to exception list": "\u5b66\u4e60\u8005\u5df2\u7ecf\u6210\u529f\u5730\u52a0\u5165\u5230\u4f8b\u5916\u5217\u8868", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "#Replies": "\u56de\u590d", 
    "%(comments_count)s %(span_sr_open)scomments %(span_close)s": "%(comments_count)s %(span_sr_open)s\u8bc4\u8bba %(span_close)s", 
    "%(comments_count)s %(span_sr_open)scomments (%(unread_comments_count)s unread comments)%(span_close)s": "%(comments_count)s %(span_sr_open)s\u8bc4\u8bba (%(unread_comments_count)s \u672a\u8bfb\u8bc4\u8bba)%(span_close)s", 
    "%(courseName)s Home Page.": "%(courseName)s\u4e3b\u9875", 
    "%(download_link_start)sDownload this image (right-click or option-click, save as)%(link_end)s and then %(upload_link_start)supload%(link_end)s it to your backpack.</li>": "%(download_link_start)s\u4e0b\u8f7d\u6b64\u56fe\u50cf\uff08\u53f3\u51fb\u6216\u5355\u51fb\u9009\u9879\uff0c\u53e6\u5b58\u4e3a\uff09%(link_end)s\uff0c\u968f\u540e%(upload_link_start)s\u4e0a\u4f20%(link_end)s\u81f3\u4f60\u7684 backpack \u4e2d\u3002</li>", 
    "%(earned)s/%(possible)s point (graded)": [
      "%(earned)s/%(possible)s\u8981\u70b9\uff08\u5206\u7ea7\uff09"
    ], 
    "%(earned)s/%(possible)s point (ungraded)": [
      "%(earned)s/%(possible)s\u8981\u70b9\uff08\u8bc4\u5206\uff09"
    ], 
    "%(errorCount)s error found in form.": [
      "\u8868\u683c\u4e2d\u53d1\u73b0 %(errorCount)s \u4e2a\u9519\u8bef\u3002"
    ], 
    "%(field)s can only contain up to %(count)d characters.": "%(field)s \u6700\u591a\u53ea\u80fd\u6709 %(count)d \u4e2a\u5b57\u7b26\u3002", 
    "%(field)s must have at least %(count)d characters.": "%(field)s \u81f3\u5c11\u8981\u6709 %(count)d \u5b57\u7b26\u3002", 
    "%(num_points)s point possible (graded)": [
      "%(num_points)s\u53ef\u80fd\u7684\u70b9 (\u5206\u7ea7)"
    ], 
    "%(num_points)s point possible (graded, results hidden)": [
      "%(num_points)s\u53ef\u80fd\u7684\u70b9 (\u5206\u7ea7, \u7ed3\u679c\u9690\u85cf)"
    ], 
    "%(num_points)s point possible (ungraded)": [
      "%(num_points)s\u53ef\u80fd\u7684\u70b9\uff08\u8bc4\u5206\uff09"
    ], 
    "%(num_points)s point possible (ungraded, results hidden)": [
      "%(num_points)s\u53ef\u80fd\u7684\u70b9 (\u8bc4\u5206, \u7ed3\u679c\u9690\u85cf)"
    ], 
    "%(num_questions)s question": [
      "%(num_questions)s \u4e2a\u95ee\u9898"
    ], 
    "%(num_students)s student": [
      "%(num_students)s \u4e2a\u5b66\u751f"
    ], 
    "%(num_students)s student opened Subsection": [
      "%(num_students)s \u4e2a\u5b66\u751f\u5df2\u6253\u5f00\u5206\u9879"
    ], 
<<<<<<< HEAD
    "%(post_type)s posted %(time_ago)s by %(author)s": "\u7531%(author)s\u53d1\u8868\u4e8e%(time_ago)s\u7684%(post_type)s", 
    "%(programName)s Home Page.": "%(programName)s\u4e3b\u9875", 
=======
    "%(team_count)s Team": [
      "%(team_count)s \u4e2a\u56e2\u961f"
    ], 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "%(value)s hour": [
      "%(value)s \u5c0f\u65f6"
    ], 
    "%(value)s minute": [
      "%(value)s \u5206\u949f"
    ], 
    "%(value)s second": [
      "%(value)s \u79d2\u949f"
    ], 
    "%d day": [
      "%d \u5929"
    ], 
    "%d minute": [
      "%d \u5206\u949f"
    ], 
    "%d month": [
      "%d \u4e2a\u6708"
    ], 
    "%d year": [
      "%d \u5e74"
    ], 
    "%s ago": "%s \u4ee5\u524d", 
    "%s from now": "\u8ddd\u73b0\u5728:%s", 
    "%s result": [
      "%s \u4e2a\u7ed3\u679c"
    ], 
    "(Caption will be displayed when you start playing the video.)": "(\u5f53\u89c6\u9891\u5f00\u59cb\u64ad\u653e\u65f6\u5c06\u663e\u793a\u5b57\u5e55)", 
    "<%= user %> already in exception list.": "<%= user %> \u5df2\u5728\u7279\u4f8b\u540d\u5355\u4e2d\u3002", 
    "<%= user %> has been successfully added to the exception list. Click Generate Exception Certificate below to send the certificate.": "\u5df2\u7ecf\u6210\u529f\u65b0\u589e<%= user %>\u5230\u7279\u4f8b\u540d\u5355\u4e2d\u3002\u8bf7\u70b9\u51fb\u4e0b\u9762\u7684\u4ea7\u751f\u7279\u4f8b\u8bc1\u4e66\u5e76\u53d1\u9001\u8bc1\u4e66\u3002", 
    "About Me": "\u4e2a\u4eba\u8d44\u6599", 
    "About me": "\u4e2a\u4eba\u7b80\u4ecb", 
    "Accomplishments": "\u6210\u7ee9", 
    "Accomplishments Pagination": "\u6210\u7ee9\u5206\u9875", 
    "Account Information": "\u5e10\u6237\u4fe1\u606f", 
    "Account Settings": "\u8d26\u6237\u8bbe\u7f6e", 
    "Account Settings page.": "\u8d26\u6237\u8bbe\u7f6e\u9875\u9762\u3002", 
    "Actions": "\u64cd\u4f5c", 
    "Activating a link in this group will skip to the corresponding point in the video.": "\u6fc0\u6d3b\u672c\u7ec4\u4e2d\u7684\u94fe\u63a5\u5c06\u8df3\u8f6c\u81f3\u89c6\u9891\u4e2d\u76f8\u5e94\u7684\u5730\u65b9\u3002", 
    "Add Cohort": "\u6dfb\u52a0\u7fa4\u7ec4", 
    "Add Country": "\u6dfb\u52a0\u56fd\u5bb6", 
<<<<<<< HEAD
    "Add a Post": "\u6dfb\u52a0\u4e00\u4e2a\u8ba8\u8bba\u5e16", 
    "Add a Response": "\u6dfb\u52a0\u56de\u590d", 
    "Add a clear and descriptive title to encourage participation.": "\u6dfb\u52a0\u4e00\u4e2a\u6e05\u6670\u5e76\u4e14\u751f\u52a8\u7684\u6807\u9898\u6765\u5438\u5f15\u5927\u5bb6\u53c2\u4e0e\u3002", 
=======
    "Add Students": "\u6dfb\u52a0\u5b66\u751f", 
    "Add a New Cohort": "\u6dfb\u52a0\u65b0\u7fa4\u7ec4", 
    "Add a Response": "\u6dfb\u52a0\u56de\u590d", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Add a comment": "\u6dfb\u52a0\u8bc4\u8bba", 
    "Add a response:": "\u6dfb\u52a0\u4e00\u6761\u56de\u590d\uff1a", 
    "Add a user to the whitelist for a course": "\u5c06\u7528\u6237\u6dfb\u52a0\u5230\u8bfe\u7a0b\u7684\u4f18\u826f\u540d\u5355\u4e2d", 
    "Add language": "\u6dfb\u52a0\u8bed\u8a00", 
    "Add to Dictionary": "\u52a0\u5165\u5230\u5b57\u5178", 
<<<<<<< HEAD
    "Add your post to a relevant topic to help others find it.": "\u628a\u60a8\u7684\u5e16\u5b50\u53d1\u5e03\u5230\u76f8\u5e94\u7684\u5206\u7c7b\u8bdd\u9898\uff0c\u4ee5\u4fbf\u4e8e\u522b\u4eba\u5feb\u901f\u627e\u5230\u3002", 
=======
    "Add to Exception List": "\u6dfb\u52a0\u5230\u7279\u6b8a\u5904\u7406\u5217\u8868", 
    "Adding": "\u6b63\u5728\u6dfb\u52a0", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Adding the selected course to your cart": "\u6b63\u5728\u5c06\u60a8\u6240\u9009\u7684\u8bfe\u7a0b\u6dfb\u52a0\u5230\u60a8\u7684\u8d2d\u7269\u8f66", 
    "Additional Information": "\u5176\u4ed6\u4fe1\u606f", 
    "Additional posts could not be loaded. Refresh the page and try again.": "\u65e0\u6cd5\u52a0\u8f7d\u5176\u4ed6\u804c\u4f4d\u3002\u8bf7\u5237\u65b0\u8be5\u9875\u5e76\u91cd\u8bd5\u3002", 
    "Additional responses could not be loaded. Refresh the page and try again.": "\u65e0\u6cd5\u52a0\u8f7d\u5176\u4ed6\u54cd\u5e94\u3002\u8bf7\u5237\u65b0\u8be5\u9875\u5e76\u91cd\u8bd5\u3002", 
    "Adjust video speed": "\u8c03\u6574\u89c6\u9891\u64ad\u653e\u901f\u5ea6", 
    "Adjust video volume": "\u8c03\u6574\u89c6\u9891\u97f3\u91cf", 
    "Advanced": "\u9ad8\u7ea7", 
    "Align center": "\u5c45\u4e2d\u5bf9\u9f50", 
    "Align left": "\u5de6\u5bf9\u9f50", 
    "Align right": "\u53f3\u5bf9\u9f50", 
    "Alignment": "\u5bf9\u9f50\u65b9\u5f0f", 
    "All Groups": "\u6240\u6709\u5206\u7ec4", 
    "All Posts": "\u5168\u90e8\u5e16\u5b50", 
    "All Time Zones": "\u5168\u90e8\u65f6\u533a", 
    "All Topics": "\u6240\u6709\u4e3b\u9898", 
    "All accounts were created successfully.": "\u6240\u6709\u8d26\u6237\u521b\u5efa\u6210\u529f\u3002", 
    "All flags have been removed. To undo, uncheck the box.": "\u6240\u6709\u6807\u8bb0\u5df2\u79fb\u9664\u3002\u53d6\u6d88\u9009\u4e2d\u6b64\u9009\u6846\u4ee5\u64a4\u9500\u3002", 
    "All learners in the {cohort_name} cohort": "{cohort_name} \u961f\u5217\u4e2d\u7684\u6240\u6709\u5b66\u4e60\u8005", 
    "All learners who are enrolled in this course": "\u6240\u6709\u5728\u672c\u8bfe\u7a0b\u4e2d\u6ce8\u518c\u7684\u5b66\u4e60\u8005", 
    "All payment options are currently unavailable.": "\u6240\u6709\u7684\u4ed8\u6b3e\u65b9\u5f0f\u76ee\u524d\u4e0d\u53ef\u7528\u3002", 
    "All subsections": "\u6240\u6709\u8282", 
    "All units": "\u6240\u6709\u5355\u5143", 
    "Allow students to generate certificates for this course?": "\u662f\u5426\u5141\u8bb8\u5b66\u751f\u751f\u6210\u8be5\u8bfe\u7a0b\u8bc1\u4e66\uff1f", 
    "Already have an account?": "\u5df2\u6709\u8d26\u6237\uff1f", 
    "Alternative source": "\u5907\u7528\u6e90", 
    "An error has occurred. Check your Internet connection and try again.": "\u9519\u8bef\u53d1\u751f\u3002\u8bf7\u68c0\u67e5\u60a8\u7684\u7f51\u7edc\u8fde\u63a5\u60c5\u51b5\uff0c\u5e76\u4e14\u91cd\u8bd5\u4e00\u6b21\u3002", 
    "An error has occurred. Make sure that you are connected to the Internet, and then try refreshing the page.": "\u51fa\u73b0\u4e86\u4e00\u4e2a\u9519\u8bef\u3002\u8bf7\u786e\u4fdd\u60a8\u5df2\u8054\u7f51\uff0c\u7136\u540e\u5237\u65b0\u9875\u9762\u3002", 
    "An error has occurred. Please try again later.": "\u53d1\u751f\u4e86\u4e00\u4e2a\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002", 
    "An error has occurred. Please try again.": "\u53d1\u751f\u4e86\u4e00\u4e2a\u672a\u77e5\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5\u3002", 
    "An error has occurred. Please try reloading the page.": "\u53d1\u751f\u4e86\u4e00\u4e2a\u9519\u8bef\u3002\u8bf7\u91cd\u65b0\u52a0\u8f7d\u8fd9\u4e2a\u9875\u9762\u3002", 
    "An error has occurred. Refresh the page, and then try again.": "\u53d1\u751f\u4e86\u4e00\u4e2a\u9519\u8bef\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u540e\u91cd\u8bd5\u3002", 
    "An error has occurred. Try refreshing the page, or check your Internet connection.": "\u53d1\u751f\u9519\u8bef\u3002\u8bf7\u5c1d\u8bd5\u5237\u65b0\u9875\u9762\uff0c\u6216\u68c0\u67e5\u60a8\u7684\u7f51\u7edc\u8fde\u63a5\u60c5\u51b5\u3002", 
    "An error occurred retrieving your email. Please try again later, and contact technical support if the problem persists.": "\u83b7\u53d6\u90ae\u4ef6\u53d1\u751f\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002\u5982\u95ee\u9898\u6301\u7eed\u53d1\u751f\uff0c\u8bf7\u54a8\u8be2\u6280\u672f\u652f\u6301\u3002", 
<<<<<<< HEAD
    "An error occurred when signing you in to %s.": "\u5c06\u60a8\u7b7e\u5165%s \u65f6\u51fa\u9519\u3002", 
    "An error occurred.": "\u53d1\u751f\u4e86\u4e00\u4e2a\u9519\u8bef\u3002", 
=======
    "An error occurred while removing the member from the team. Try again.": "\u79fb\u9664\u6210\u5458\u65f6\u53d1\u751f\u9519\u8bef\u3002\u8bf7\u91cd\u8bd5\u4e00\u6b21\u3002", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "An error occurred. Make sure that the student's username or email address is correct and try again.": "\u53d1\u751f\u4e86\u4e00\u4e2a\u9519\u8bef\uff0c\u8bf7\u786e\u8ba4\u5b66\u751f\u7528\u6237\u540d\u6216\u7535\u5b50\u90ae\u4ef6\u5730\u5740\u6b63\u786e\u5e76\u518d\u6b21\u5c1d\u8bd5\u3002", 
    "An error occurred. Please reload the page.": "\u53d1\u751f\u4e86\u4e00\u4e2a\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u52a0\u8f7d\u9875\u9762\u3002", 
    "An error occurred. Please try again later.": "\u51fa\u73b0\u4e86\u4e00\u4e2a\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002", 
    "An error occurred. Please try again.": "\u53d1\u751f\u4e86\u4e00\u4e2a\u672a\u77e5\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5\u3002", 
    "An error occurred. Try loading the page again.": "\u51fa\u73b0\u4e00\u4e2a\u9519\u8bef\u3002\u5c1d\u8bd5\u91cd\u8bd5\u52a0\u8f7d\u9875\u9762\u3002", 
    "An unexpected error occurred.  Please try again.": "\u610f\u5916\u9519\u8bef\u53d1\u751f\uff0c\u8bf7\u91cd\u8bd5\u3002", 
    "Anchor": "\u951a\u70b9", 
    "Anchors": "\u951a\u70b9", 
    "Annotation": "\u6279\u6ce8", 
    "Annotation Text": "\u6279\u6ce8\u6587\u672c", 
    "Answers to this problem are now shown. Navigate through the problem to review it with answers inline.": "\u73b0\u5728\u663e\u793a\u8fd9\u4e2a\u95ee\u9898\u7684\u7b54\u6848\u3002\u5bfc\u822a\u5230\u8fd9\u4e2a\u95ee\u9898\u4ee5\u5ba1\u67e5\u7b54\u6848\u3002", 
    "Are you sure you want to delete the file ": "\u662f\u5426\u786e\u5b9e\u8981\u5220\u9664\u8be5\u6587\u4ef6", 
    "Are you sure you want to delete this comment?": "\u60a8\u786e\u5b9a\u8981\u5220\u9664\u8fd9\u6761\u8bc4\u8bba\u5417\uff1f", 
    "Are you sure you want to delete this post?": "\u60a8\u786e\u5b9a\u8981\u5220\u9664\u8fd9\u4e2a\u5e16\u5b50\uff1f", 
    "Are you sure you want to delete this response?": "\u60a8\u786e\u5b9a\u8981\u5220\u9664\u8fd9\u4e2a\u56de\u590d\u5417", 
    "Assign students to cohorts by uploading a CSV file.": "\u4e0a\u4f20\u4e00\u4e2a CSV \u6587\u4ef6\u4ee5\u5c06\u5b66\u751f\u5206\u914d\u5230\u7fa4\u7ec4\u4e2d\u3002", 
    "Author": "\u4f5c\u8005", 
    "Average": "\u5e73\u5747", 
    "Back to Dashboard": "\u56de\u5230\u63a7\u5236\u9762\u677f", 
    "Back to sign in": "\u8fd4\u56de\u767b\u5f55", 
    "Background color": "\u80cc\u666f\u8272", 
    "Basic Account Information": "\u57fa\u672c\u8d26\u6237\u4fe1\u606f", 
    "Below is a list of accounts you have linked to your {platform_name} account.": "\u4e0b\u9762\u662f\u60a8\u94fe\u63a5\u5230 {platform_name} \u5e10\u6237\u7684\u5e10\u6237\u5217\u8868\u3002", 
    "Blockquote": "\u5f15\u7528", 
    "Blockquote (Ctrl+Q)": "\u5f15\u7528(Ctrl+Q)", 
    "Blocks": "\u5757", 
    "Body": "\u4e3b\u4f53", 
    "Bold": "\u7c97\u4f53", 
    "Bold (Ctrl+B)": "\u7c97\u4f53(Ctrl+B)", 
    "Bookmark this page": "\u6536\u85cf\u672c\u9875", 
    "Bookmarked": "\u5df2\u6536\u85cf", 
    "Bookmarked on": "\u6807\u8bb0\u4e66\u7b7e", 
    "Border": "\u8fb9\u6846", 
    "Border color": "\u8fb9\u6846\u8272", 
    "Bottom": "\u5e95\u7aef", 
    "Browse recently launched courses and see what\\'s new in your favorite subjects": "\u6d4f\u89c8\u6700\u65b0\u4e0a\u7ebf\u7684\u8bfe\u7a0b\u5e76\u67e5\u770b\u60a8\u6700\u559c\u7231\u79d1\u76ee\u7684\u66f4\u65b0\u60c5\u51b5", 
    "Bullet list": "\u9879\u76ee\u7b26\u53f7\u5217\u8868", 
    "Bulleted List (Ctrl+U)": "\u7b26\u53f7\u5217\u8868(Ctrl+U)", 
    "Cancel": "\u53d6\u6d88", 
    "Cancel enrollment code": "\u53d6\u6d88\u9009\u8bfe\u7801", 
    "Caption": "\u6807\u9898", 
    "Cell": "\u5355\u5143\u683c", 
    "Cell padding": "\u5355\u5143\u683c\u8fb9\u8ddd", 
    "Cell properties": "\u5355\u5143\u683c\u5c5e\u6027", 
    "Cell spacing": "\u5355\u5143\u683c\u95f4\u8ddd", 
    "Cell type": "\u5355\u5143\u683c\u7c7b\u578b", 
    "Center": "\u5c45\u4e2d\u5bf9\u9f50", 
    "Certificate has been successfully invalidated for <%= user %>.": " <%= user %> \u7684\u8bc1\u4e66\u5df2\u6210\u529f\u5730\u8f6c\u4e3a\u5931\u6548", 
    "Certificate of <%= user %> has already been invalidated. Please check your spelling and retry.": " <%= user %> \u7684\u8bc1\u4e66\u5df2\u7ecf\u65e0\u6548\u3002\u8bf7\u786e\u8ba4\u60a8\u7684\u62fc\u5199\u5e76\u518d\u8bd5\u4e00\u6b21\u3002", 
    "Change My Email Address": "\u66f4\u6539\u6211\u7684\u7535\u5b50\u90ae\u4ef6", 
    "Change image": "\u4fee\u6539\u56fe\u7247", 
    "Check Your Email": "\u68c0\u67e5\u4f60\u7684\u7535\u5b50\u90ae\u4ef6", 
    "Check the box to remove %(count)s flag.": [
      "\u9009\u4e2d\u6b64\u9009\u6846\u4ee5\u79fb\u9664 %(count)s \u4e2a\u6807\u8bb0\u3002"
    ], 
    "Check the box to remove %(totalFlags)s flag.": [
      "\u9009\u4e2d\u6b64\u9009\u6846\u4ee5\u79fb\u9664\u6240\u6709 %(totalFlags)s \u4e2a\u6807\u8bb0\u3002"
    ], 
    "Check the box to remove all flags.": "\u9009\u4e2d\u6b64\u9009\u6846\u4ee5\u79fb\u9664\u6240\u6709\u6807\u8bb0", 
    "Check this box to receive an email digest once a day notifying you about new, unread activity from posts you are following.": "\u52fe\u9009\u6b64\u9879\uff0c\u6bcf\u5929\u63a5\u6536\u4e00\u5c01\u90ae\u4ef6\uff0c\u901a\u77e5\u60a8\u6240\u5173\u6ce8\u7684\u8ba8\u8bba\u5e16\u7684\u6700\u65b0\u672a\u8bfb\u60c5\u51b5\u3002", 
    "Checkout": "\u4ed8\u6b3e", 
    "Checkout with PayPal": "\u4f7f\u7528PayPal\u4ed8\u6b3e", 
    "Checkout with {processor}": "\u4f7f\u7528{processor}\u4ed8\u6b3e", 
    "Choose Course Date": "\u9009\u62e9\u8bfe\u7a0b\u65e5\u671f", 
    "Choose File": "\u9009\u62e9\u6587\u4ef6", 
    "Choose a .csv file": "\u9009\u62e9\u4e00\u4e2a.csv\u7684\u6587\u4ef6", 
<<<<<<< HEAD
=======
    "Choose a content group to associate": "\u9009\u62e9\u4e00\u4e2a\u5185\u5bb9\u7ec4\u6765\u5173\u8054", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Choose one": "\u8bf7\u9009\u62e9", 
    "Choose your institution from the list below:": "\u4ece\u4ee5\u4e0b\u5217\u8868\u4e2d\u9009\u62e9\u60a8\u7684\u673a\u6784\uff1a", 
    "Circle": "\u7a7a\u5fc3\u5706", 
    "Clear": "\u6e05\u9664", 
    "Clear All": "\u6e05\u9664\u6240\u6709", 
    "Clear formatting": "\u6e05\u9664\u683c\u5f0f", 
    "Clear search": "\u6e05\u7a7a\u641c\u7d22\u7ed3\u679c", 
    "Clear search results": "\u6e05\u7a7a\u641c\u7d22\u7ed3\u679c", 
    "Click OK to have your e-mail address sent to a 3rd party application.\n\nClick Cancel to return to this page without sending your information.": "\u5355\u51fb\u786e\u5b9a\uff0c\u5c06\u60a8\u7684\u7535\u5b50\u90ae\u4ef6\u5730\u5740\u53d1\u9001\u7ed9\u7b2c\u4e09\u65b9\u5e94\u7528\u7a0b\u5e8f\u3002\n\n\u5355\u51fb\u53d6\u6d88\uff0c\u53d6\u6d88\u53d1\u9001\u4fe1\u606f\u5e76\u8fd4\u56de\u672c\u9875\u3002", 
    "Click OK to have your username and e-mail address sent to a 3rd party application.\n\nClick Cancel to return to this page without sending your information.": "\u5355\u51fb\u786e\u5b9a\uff0c\u5c06\u60a8\u7684\u7528\u6237\u540d\u548c\u7535\u5b50\u90ae\u4ef6\u5730\u5740\u53d1\u9001\u7ed9\u7b2c\u4e09\u65b9\u5e94\u7528\u7a0b\u5e8f\u3002\n\n\u5355\u51fb\u53d6\u6d88\uff0c\u53d6\u6d88\u53d1\u9001\u4fe1\u606f\u5e76\u8fd4\u56de\u672c\u9875\u3002", 
    "Click OK to have your username sent to a 3rd party application.\n\nClick Cancel to return to this page without sending your information.": "\u5355\u51fb\u786e\u5b9a\uff0c\u5c06\u60a8\u7684\u7528\u6237\u540d\u53d1\u9001\u7ed9\u7b2c3\u65b9\u5e94\u7528\u7a0b\u5e8f\u3002\n\n\u5355\u51fb\u53d6\u6d88\uff0c\u53d6\u6d88\u53d1\u9001\u4fe1\u606f\u5e76\u8fd4\u56de\u672c\u9875\u3002", 
    "Click on this button to mute or unmute this video or press UP or DOWN buttons to increase or decrease volume level.": "\u8bf7\u70b9\u51fb\u6b64\u6309\u94ae\u4ee5\u5bf9\u8be5\u89c6\u9891\u9759\u97f3\uff0f\u53d6\u6d88\u9759\u97f3, \u6216\u8005\u4f7f\u7528\u952e\u76d8\u7684\u4e0a\u4e0b\u65b9\u5411\u952e\u589e\u5927\u6216\u51cf\u5c0f\u97f3\u91cf\u3002", 
    "Click to change": "\u70b9\u51fb\u66f4\u6539", 
    "Click to edit": "\u70b9\u51fb\u4ee5\u7f16\u8f91", 
    "Close": "\u5173\u95ed", 
    "Close Calculator": "\u5173\u95ed\u8ba1\u7b97\u5668", 
    "Closed": "\u5df2\u5173\u95ed", 
    "Code": "\u4ee3\u7801", 
    "Code Sample (Ctrl+K)": "\u4ee3\u7801\u793a\u4f8b(Ctrl+K)", 
    "Code block": "\u4ee3\u7801\u5757", 
    "Cohorts Disabled": "\u7fa4\u7ec4\u5df2\u7981\u7528", 
    "Cohorts Enabled": "\u7fa4\u7ec4\u5df2\u542f\u7528", 
    "Collapse Instructions": "\u6298\u53e0\u8bf4\u660e", 
    "Color": "\u989c\u8272", 
    "Cols": "\u5217", 
    "Column": "\u5217", 
    "Column group": "\u5217\u7ec4", 
    "Coming Soon": "\u5373\u5c06\u4e0a\u7ebf", 
    "Commentary": "\u8bc4\u6ce8", 
    "Community TA": "\u793e\u533a\u52a9\u6559", 
    "Confirm": "\u786e\u8ba4", 
    "Congratulations! You have earned a certificate for this course.": "\u606d\u559c\uff01\u60a8\u5df2\u7ecf\u83b7\u5f97\u4e86\u8fd9\u95e8\u8bfe\u7a0b\u7684\u5b8c\u6210\u8bc1\u660e\u3002", 
    "Constrain proportions": "\u4fdd\u6301\u7eb5\u6a2a\u6bd4", 
    "Copy": "\u590d\u5236", 
    "Copy Email To Editor": "\u590d\u5236\u90ae\u4ef6\u81f3\u7f16\u8f91\u5668", 
    "Copy row": "\u590d\u5236\u884c", 
    "Could not find Certificate Exception in white list. Please refresh the page and try again": "\u5728\u8bb8\u53ef\u540d\u5355\u4e2d\u627e\u4e0d\u5230\u8bc1\u4e66\u7279\u4f8b\u7684\u4eba\u3002\u8bf7\u91cd\u65b0\u8f7d\u5165\u9875\u9762\u6216\u518d\u8bd5\u4e00\u6b21\u3002", 
    "Could not find Certificate Invalidation in the list. Please refresh the page and try again": "\u65e0\u6cd5\u5728\u8fd9\u4efd\u5217\u8868\u4e2d\u627e\u5230\u8bc1\u4e66\u5931\u6548\u8bc1\u660e\u3002\u8bf7\u91cd\u65b0\u8f7d\u5165\u9875\u9762\u6216\u518d\u8bd5\u4e00\u6b21\u3002", 
    "Could not find a user with username or email address '<%- identifier %>'.": "\u627e\u4e0d\u5230\u5177\u6709\u7528\u6237\u540d\u6216\u7535\u5b50\u90ae\u4ef6\u5730\u5740 \"<%-identifier%>\" \u7684\u7528\u6237\u3002", 
    "Could not find the specified string.": "\u65e0\u6cd5\u627e\u5230\u6307\u5b9a\u7684\u5b57\u7b26\u4e32\u3002", 
    "Could not find users associated with the following identifiers:": "\u672a\u80fd\u627e\u5230\u4e0e\u4ee5\u4e0b\u8bc6\u522b\u7801\u5173\u8054\u7684\u7528\u6237\uff1a", 
    "Could not grade your answer. The submission was aborted.": "\u65e0\u6cd5\u8bc4\u5206\u4f60\u7684\u7b54\u6848\u3002\u63d0\u4ea4\u5df2\u4e2d\u6b62\u3002", 
    "Could not retrieve payment information": "\u65e0\u6cd5\u8bfb\u53d6\u652f\u4ed8\u4fe1\u606f", 
    "Could not submit order": "\u8ba2\u5355\u63d0\u4ea4\u5931\u8d25", 
    "Could not submit photos": "\u7167\u7247\u63d0\u4ea4\u5931\u8d25", 
    "Country": "\u56fd\u5bb6\uff0f\u5730\u533a", 
    "Country or Region": "\u56fd\u5bb6\u6216\u5730\u533a", 
<<<<<<< HEAD
=======
    "Course End": "\u8bfe\u7a0b\u7ed3\u675f", 
    "Course ID": "\u8bfe\u7a0bID", 
    "Course Index": "\u8bfe\u7a0b\u7d22\u5f15", 
    "Course Key": "\u8bfe\u7a0b\u6807\u8bc6", 
    "Course Start": "\u8bfe\u7a0b\u5f00\u59cb", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Course is not yet visible to students.": "\u8be5\u8bfe\u7a0b\u5c1a\u672a\u5bf9\u5b66\u751f\u516c\u5f00", 
    "Create a %(link_start)sMozilla Backpack%(link_end)s account, or log in to your existing account": "\u521b\u5efa\u4e00\u4e2a %(link_start)sMozilla Backpack%(link_end)s \u5e10\u6237\uff0c\u6216\u767b\u5f55\u60a8\u5df2\u6709\u7684\u5e10\u6237", 
    "Create a new account": "\u521b\u5efa\u65b0\u8d26\u6237", 
    "Create account using %(providerName)s.": "\u4f7f\u7528 %(providerName)s \u521b\u5efa\u5e10\u6237\u3002", 
    "Create an account": "\u521b\u5efa\u8d26\u6237", 
    "Create an account using": "\u4f7f\u7528\u4ee5\u4e0b\u65b9\u5f0f\u521b\u5efa\u8d26\u6237", 
    "Create your account": "\u521b\u5efa\u60a8\u7684\u8d26\u6237", 
    "Creating missing groups": "\u6b63\u5728\u521b\u5efa\u7f3a\u5931\u7684\u7ec4\u3002", 
    "Current conversation": "\u5f53\u524d\u5bf9\u8bdd", 
    "Current tab": "\u5f53\u524d\u6807\u7b7e", 
    "Custom color": "\u81ea\u5b9a\u4e49\u989c\u8272", 
    "Custom...": "\u81ea\u5b9a\u4e49\u2026", 
    "Cut": "\u526a\u5207", 
    "Cut row": "\u526a\u5207\u884c", 
    "Dashboard": "\u4e3b\u63a7\u9762\u677f", 
    "Date posted": "\u53d1\u8868\u65e5\u671f", 
    "De-whitelist a user": "\u53d6\u6d88\u4f18\u826f\u540d\u5355\u7528\u6237", 
    "Decrease indent": "\u51cf\u5c11\u7f29\u8fdb", 
    "Default": "\u9ed8\u8ba4", 
    "Default (Local Time Zone)": "\u9ed8\u8ba4\u503c (\u672c\u5730\u65f6\u533a)", 
    "Delete": "\u5220\u9664", 
    "Delete column": "\u5220\u9664\u5217", 
    "Delete row": "\u5220\u9664\u884c", 
<<<<<<< HEAD
    "Delete student '<%- student_id %>'s state on problem '<%- problem_id %>'?": "\u662f\u5426\u5220\u9664\u5b66\u751f \"<%-student_id%> \u95ee\u9898\u7684\u72b6\u6001\" <%-problem_id%>\uff1f", 
=======
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Delete table": "\u5220\u9664\u8868\u683c", 
    "Description": "\u63cf\u8ff0", 
    "Dimensions": "\u5c3a\u5bf8", 
    "Disc": "\u5b9e\u5fc3\u5706", 
    "Discussion": "\u8ba8\u8bba", 
    "Discussion Home": "\u8ba8\u8bba\u533a", 
    "Discussion admins, moderators, and TAs can make their posts visible to all students or specify a single cohort.": "\u8ba8\u8bba\u533a\u7ba1\u7406\u5458\u3001\u7248\u4e3b\u4ee5\u53ca\u52a9\u6559\u53ef\u4ee5\u5c06\u5b83\u4eec\u7684\u5e16\u5b50\u8bbe\u7f6e\u4e3a\u5bf9\u6240\u6709\u5b66\u751f\u53ef\u89c1\u6216\u8005\u4ec5\u5bf9\u67d0\u4e2a\u7fa4\u7ec4\u53ef\u89c1\u3002", 
    "Div": "Div \u6807\u7b7e", 
    "Do not show again": "\u4e0d\u518d\u663e\u793a", 
    "Do you want to allow this student ('{student_id}') to skip the entrance exam?": "\u60a8\u662f\u5426\u5141\u8bb8\u8be5\u5b66\u751f('{student_id}')\u8df3\u8fc7\u5165\u5b66\u8003\u8bd5\uff1f", 
    "Document properties": "\u6587\u6863\u5c5e\u6027", 
    "Donate": "\u6350\u8d60", 
    "Double-check that your webcam is connected and working to continue.": "\u7ee7\u7eed\u524d\u8bf7\u518d\u6b21\u786e\u8ba4\u60a8\u7684\u6444\u50cf\u5934\u5df2\u7ecf\u8fde\u63a5\u5e76\u4e14\u53ef\u4ee5\u6b63\u5e38\u4f7f\u7528\u3002", 
    "Drop target image": "\u62d6\u653e\u7684\u76ee\u6807\u56fe\u50cf", 
    "Due date cannot be before start date.": "\u8bfe\u7a0b\u7684\u7ed3\u675f\u65e5\u671f\u4e0d\u80fd\u5728\u5f00\u59cb\u65e5\u671f\u4e4b\u524d\u3002", 
    "Duration (sec)": "\u6301\u7eed\u65f6\u95f4(\u79d2)", 
    "Earned %(created)s.": "\u5df2\u83b7\u5f97 %(created)s\u3002", 
    "Edit": "\u7f16\u8f91", 
    "Edit HTML": "\u7f16\u8f91 HTML", 
    "Edit your post below.": "\u7f16\u8f91\u4e0b\u9762\u7684\u5e16\u5b50\u3002", 
    "Editable": "\u53ef\u7f16\u8f91", 
    "Editing comment": "\u7f16\u8f91\u8bc4\u8bba", 
    "Editing post": "\u7f16\u8f91\u8ba8\u8bba\u5e16", 
    "Editing response": "\u7f16\u8f91\u56de\u590d", 
<<<<<<< HEAD
=======
    "Editing: %(title)s": "\u7f16\u8f91\uff1a%(title)s", 
    "Editor": "\u7f16\u8f91\u5668", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Education Completed": "\u6559\u80b2\u7a0b\u5ea6", 
    "Email": "\u7535\u5b50\u90ae\u4ef6", 
    "Email Address": "\u7535\u5b50\u90ae\u4ef6\u5730\u5740", 
    "Emails successfully sent. The following users are no longer enrolled in the course:": "\u90ae\u4ef6\u53d1\u9001\u6210\u529f\uff0c\u4ee5\u4e0b\u7528\u6237\u5df2\u4e0d\u518d\u9009\u4fee\u672c\u8bfe\u7a0b\uff1a", 
    "Embed": "\u5185\u5d4c", 
    "Emoticons": "\u8868\u60c5", 
    "Encoding": "\u7f16\u7801", 
    "End": "\u7ed3\u675f", 
    "End My Exam": "\u7ed3\u675f\u6211\u7684\u8003\u8bd5", 
    "End of transcript. Skip to the start.": "\u5b57\u5e55\u7ed3\u5c3e\u3002\u8df3\u8f6c\u81f3\u5f00\u59cb\u3002", 
    "Endorse": "\u652f\u6301", 
    "Engage with posts": "\u53c2\u4e0e\u8ba8\u8bba", 
    "Enroll Now": "\u73b0\u5728\u9009\u8bfe", 
    "Enrolling you in the selected course": "\u5c06\u60a8\u52a0\u5165\u5230\u9009\u5b9a\u7684\u8bfe\u7a0b", 
    "Enrollment Opens on": "\u9009\u8bfe\u5f00\u653e", 
    "Enter Due Date and Time": "\u8f93\u5165\u622a\u6b62\u65e5\u671f", 
    "Enter Start Date and Time": "\u8f93\u5165\u5f00\u59cb\u65e5\u671f\u4e0e\u65f6\u95f4", 
    "Enter a student's username or email address.": "\u8f93\u5165\u5b66\u751f\u7684\u7528\u6237\u540d\u6216\u7535\u5b50\u90ae\u4ef6\u5730\u5740\u3002", 
    "Enter a username or email.": "\u8f93\u5165\u7528\u6237\u540d\u6216\u7535\u5b50\u90ae\u4ef6\u5730\u5740\u3002", 
    "Enter the enrollment code.": "\u8f93\u5165\u9009\u8bfe\u7801\u3002", 
    "Enter the page number you'd like to quickly navigate to.": "\u8f93\u5165\u60a8\u9700\u8981\u5feb\u901f\u524d\u5f80\u7684\u9875\u7801\u3002", 
    "Enter username or email": "\u8f93\u5165\u7528\u6237\u540d\u6216\u8005\u7535\u5b50\u90ae\u4ef6\u5730\u5740", 
    "Entrance exam attempts is being reset for student '{student_id}'.": "\u6b63\u5728\u91cd\u7f6e\u5b66\u751f\u201c{student_id}\u201d\u7684\u5165\u5b66\u8003\u8bd5\u5c1d\u8bd5\u6b21\u6570\u3002", 
    "Entrance exam state is being deleted for student '{student_id}'.": "\u5b66\u751f'{student_id}'\u7684\u5165\u5b66\u8003\u8bd5\u7684\u72b6\u6001\u5df2\u88ab\u5220\u9664\u3002", 
    "Error": "\u9519\u8bef", 
    "Error adding students.": "\u6dfb\u52a0\u5b66\u751f\u51fa\u73b0\u9519\u8bef", 
    "Error adding/removing users as beta testers.": "\u6dfb\u52a0\uff0f\u5220\u9664beta\u6d4b\u8bd5\u7528\u6237\u51fa\u9519\u3002", 
    "Error changing user's permissions.": "\u66f4\u6539\u7528\u6237\u6743\u9650\u51fa\u9519\u3002", 
    "Error deleting entrance exam state for student '{student_id}'. Make sure student identifier is correct.": "\u5220\u9664\u5b66\u751f'{student_id}'\u7684\u5165\u5b66\u8003\u8bd5\u72b6\u6001\u65f6\u51fa\u9519\u4e86\uff0c\u8bf7\u786e\u8ba4\u5b66\u751f\u7f16\u53f7\u65e0\u8bef\u3002", 
<<<<<<< HEAD
    "Error deleting student '<%- student_id %>'s state on problem '<%- problem_id %>'. Make sure that the problem and student identifiers are complete and correct.": "\u5220\u9664\u5b66\u751f \"<%-student_id%> \u95ee\u9898\u7684\u72b6\u6001\" <%-problem_id%> \u65f6\u51fa\u9519\u3002\u8bf7\u786e\u4fdd\u95ee\u9898\u548c\u5b66\u751f\u6807\u8bc6\u7b26\u662f\u5b8c\u6574\u548c\u6b63\u786e\u7684\u3002", 
    "Error deleting the file ": "\u5220\u9664\u6587\u4ef6\u65f6\u51fa\u9519", 
=======
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Error enrolling/unenrolling users.": "\u7528\u6237\u9009\u8bfe\uff0f\u653e\u5f03\u9009\u8bfe\u65f6\u51fa\u9519\u3002", 
    "Error generating ORA data report. Please try again.": "\u4ea7\u751fORA\u6570\u636e\u62a5\u544a\u65f6\u53d1\u751f\u9519\u8bef\u3002\u8bf7\u91cd\u65b0\u518d\u8bd5\u3002", 
    "Error generating grades. Please try again.": "\u751f\u6210\u8bc4\u5206\u7ed3\u679c\u65f6\u53d1\u751f\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5\u3002", 
    "Error generating list of students who may enroll. Please try again.": "\u83b7\u53d6\u53ef\u80fd\u9009\u8bfe\u7684\u5b66\u751f\u5217\u8868\u65f6\u51fa\u73b0\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5\u3002", 
    "Error generating problem grade report. Please try again.": "\u751f\u6210\u8bc4\u5206\u7ed3\u679c\u62a5\u544a\u65f6\u53d1\u751f\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5\u3002", 
    "Error generating proctored exam results. Please try again.": "\u4ea7\u751f\u8003\u8bd5\u6210\u7ee9\u9519\u8bef\u3002 \u8bf7\u518d\u8bd5\u4e00\u6b21\u3002", 
    "Error generating student profile information. Please try again.": "\u751f\u6210\u5b66\u751f\u6863\u6848\u4fe1\u606f\u65f6\u53d1\u751f\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5\u3002", 
    "Error generating survey results. Please try again.": "\u4ea7\u751f\u8c03\u67e5\u7ed3\u679c\u65f6\u53d1\u751f\u9519\u8bef\u3002 \u8bf7\u518d\u8bd5\u4e00\u6b21\u3002", 
    "Error getting entrance exam task history for student '{student_id}'. Make sure student identifier is correct.": "\u83b7\u53d6\u5b66\u751f'{student_id}'\u7684\u5165\u5b66\u8003\u8bd5\u4efb\u52a1\u5386\u53f2\u65f6\u51fa\u9519\u4e86\uff0c\u8bf7\u786e\u8ba4\u5b66\u751f\u7f16\u53f7\u65e0\u8bef\u3002", 
    "Error getting forum csv": "\u83b7\u53d6\u8bba\u575b csv \u65f6\u51fa\u9519", 
    "Error getting issued certificates list.": "\u83b7\u53d6\u5df2\u9881\u53d1\u8bc1\u4e66\u7684\u5217\u8868\u65f6\u53d1\u751f\u9519\u8bef", 
    "Error getting student list.": "\u83b7\u53d6\u5b66\u751f\u5217\u8868\u65f6\u53d1\u751f\u9519\u8bef", 
<<<<<<< HEAD
    "Error getting student progress url for '<%- student_id %>'. Make sure that the student identifier is spelled correctly.": "\u83b7\u53d6 \"<%-student_id%>\" \u7684\u5b66\u751f\u8fdb\u5ea6 url \u65f6\u51fa\u9519\u3002\u8bf7\u786e\u4fdd\u5b66\u751f\u6807\u8bc6\u7b26\u62fc\u5199\u6b63\u786e\u3002", 
    "Error getting task history for problem '<%- problem_id %>' and student '<%- student_id %>'. Make sure that the problem and student identifiers are complete and correct.": "\u83b7\u53d6\u95ee\u9898 \"<%-problem_id%>\" \u548c \"\u5b66\u751f\" <%-student_id%> \u7684\u4efb\u52a1\u5386\u53f2\u8bb0\u5f55\u65f6\u51fa\u9519\u3002\u8bf7\u786e\u4fdd\u95ee\u9898\u548c\u5b66\u751f\u6807\u8bc6\u7b26\u662f\u5b8c\u6574\u548c\u6b63\u786e\u7684\u3002", 
=======
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Error listing task history for this student and problem.": "\u663e\u793a\u6b64\u5b66\u751f\u4e0e\u95ee\u9898\u7684\u4efb\u52a1\u5386\u53f2\u65f6\u53d1\u751f\u9519\u8bef\u3002", 
    "Error posting your message.": "\u53d1\u5e03\u90ae\u4ef6\u65f6\u51fa\u9519\u3002", 
    "Error resetting entrance exam attempts for student '{student_id}'. Make sure student identifier is correct.": "\u91cd\u7f6e\u5b66\u751f'{student_id}'\u7684\u5165\u5b66\u8003\u8bd5\u5c1d\u8bd5\u6b21\u6570\u65f6\u51fa\u9519\u4e86\uff0c\u8bf7\u786e\u8ba4\u5b66\u751f\u7f16\u53f7\u65e0\u8bef\u3002", 
<<<<<<< HEAD
    "Error resetting problem attempts for problem '<%= problem_id %>' and student '<%- student_id %>'. Make sure that the problem and student identifiers are complete and correct.": "\u91cd\u7f6e\u95ee\u9898 \"<%= problem_id%>\" \u548c \"\u5b66\u751f\" <%-student_id%> \u95ee\u9898\u5c1d\u8bd5\u65f6\u51fa\u9519\u3002\u8bf7\u786e\u4fdd\u95ee\u9898\u548c\u5b66\u751f\u6807\u8bc6\u7b26\u662f\u5b8c\u6574\u548c\u6b63\u786e\u7684\u3002", 
    "Error retrieving grading configuration.": "\u53d6\u5f97\u8bc4\u5206\u6807\u51c6\u65f6\u9519\u8bef\u3002", 
    "Error sending email.": "\u53d1\u9001\u7535\u5b50\u90ae\u4ef6\u65f6\u51fa\u9519\u3002", 
    "Error starting a task to rescore entrance exam for student '{student_id}'. Make sure that entrance exam has problems in it and student identifier is correct.": "\u4e3a\u5b66\u751f'{student_id}'\u5f00\u59cb\u8fd0\u884c\u91cd\u65b0\u8ba1\u7b97\u5165\u5b66\u8003\u8bd5\u5206\u6570\u7684\u4efb\u52a1\u65f6\u51fa\u9519\u4e86\uff0c\u8bf7\u786e\u8ba4\u8be5\u5165\u5b66\u8003\u8bd5\u4e2d\u6709\u9898\u76ee\u5e76\u4e14\u5b66\u751f\u7f16\u53f7\u65e0\u8bef\u3002", 
    "Error starting a task to rescore problem '<%- problem_id %>' for student '<%- student_id %>'. Make sure that the the problem and student identifiers are complete and correct.": "\u542f\u52a8\u4efb\u52a1\u4ee5\u91cd\u65b0\u8bc4\u5206 \u95ee\u9898 \"<%-problem_id%>\" \u4e3a\u5b66\u751f \"<%-student_id%>\" \u65f6\u51fa\u9519\u3002\u8bf7\u786e\u4fdd\u95ee\u9898\u548c\u5b66\u751f\u6807\u8bc6\u7b26\u662f\u5b8c\u6574\u548c\u6b63\u786e\u7684\u3002", 
    "Error starting a task to rescore problem '<%- problem_id %>'. Make sure that the problem identifier is complete and correct.": "\u542f\u52a8\u4efb\u52a1\u4ee5 \u91cd\u65b0\u8bc4\u5206\u95ee\u9898 \"<%-problem_id%>\" \u65f6\u51fa\u9519\u3002\u8bf7\u786e\u4fdd\u95ee\u9898\u6807\u8bc6\u7b26\u662f\u5b8c\u6574\u7684\u548c\u6b63\u786e\u7684\u3002", 
    "Error starting a task to reset attempts for all students on problem '<%- problem_id %>'. Make sure that the problem identifier is complete and correct.": "\u542f\u52a8\u4efb\u52a1\u4ee5\u91cd\u7f6e\u95ee\u9898 \"<%-problem_id%>\" \u4e0a\u7684\u6240\u6709\u5b66\u751f\u7684\u5c1d\u8bd5\u65f6\u51fa\u9519\u3002\u8bf7\u786e\u4fdd\u95ee\u9898\u6807\u8bc6\u7b26\u662f\u5b8c\u6574\u7684\u548c\u6b63\u786e\u7684\u3002", 
=======
    "Error retrieving grading configuration.": "\u53d6\u5f97\u8bc4\u5206\u6807\u51c6\u65f6\u9519\u8bef\u3002", 
    "Error sending email.": "\u53d1\u9001\u7535\u5b50\u90ae\u4ef6\u65f6\u51fa\u9519\u3002", 
    "Error starting a task to rescore entrance exam for student '{student_id}'. Make sure that entrance exam has problems in it and student identifier is correct.": "\u4e3a\u5b66\u751f'{student_id}'\u5f00\u59cb\u8fd0\u884c\u91cd\u65b0\u8ba1\u7b97\u5165\u5b66\u8003\u8bd5\u5206\u6570\u7684\u4efb\u52a1\u65f6\u51fa\u9519\u4e86\uff0c\u8bf7\u786e\u8ba4\u8be5\u5165\u5b66\u8003\u8bd5\u4e2d\u6709\u9898\u76ee\u5e76\u4e14\u5b66\u751f\u7f16\u53f7\u65e0\u8bef\u3002", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Error while generating certificates. Please try again.": "\u751f\u6210\u8bc1\u4e66\u671f\u95f4\u51fa\u73b0\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5\u3002", 
    "Error while regenerating certificates. Please try again.": "\u4ea7\u751f\u9519\u8bef\u8bc1\u4e66\u3002 \u8bf7\u518d\u8bd5\u4e00\u6b21\u3002", 
    "Error: User '<%- username %>' has not yet activated their account. Users must create and activate their accounts before they can be assigned a role.": "\u9519\u8bef: \u7528\u6237 \"<%-username%>\" \u5c1a\u672a\u6fc0\u6d3b\u5176\u5e10\u6237\u3002\u7528\u6237\u5fc5\u987b\u5148\u521b\u5efa\u5e76\u6fc0\u6d3b\u4ed6\u4eec\u7684\u5e10\u6237, \u7136\u540e\u624d\u80fd\u5206\u914d\u89d2\u8272\u3002", 
    "Error: You cannot remove yourself from the Instructor group!": "\u9519\u8bef\uff1a\u60a8\u4e0d\u53ef\u4ee5\u5c06\u81ea\u5df1\u4ece\u6559\u5e08\u7ec4\u4e2d\u5220\u9664\u3002", 
    "Errors": "\u9519\u8bef", 
    "Everyone who has staff privileges in this course": "\u5728\u672c\u8bfe\u7a0b\u4e2d\u62e5\u6709\u5458\u5de5\u7279\u6743\u7684\u6bcf\u4e2a\u4eba", 
    "Execute Command": "\u6267\u884c\u547d\u4ee4", 
    "Exit full browser": "\u9000\u51fa\u5168\u5c4f", 
    "Expand Instructions": "\u5c55\u5f00\u8bf4\u660e", 
<<<<<<< HEAD
=======
    "Explain if other.": "\u5982\u5176\u4ed6\u539f\u56e0\uff0c\u8bf7\u89e3\u91ca\u3002", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Explanation": "\u89e3\u91ca", 
    "Explore New Programs": "\u6d4f\u89c8\u65b0\u7a0b\u5e8f", 
    "Explore Programs": "\u6d4f\u89c8\u7a0b\u5e8f", 
    "Failed to delete student state for user.": "\u672a\u80fd\u5220\u9664\u7528\u6237\u7684\u5b66\u751f\u72b6\u6001\u3002", 
    "Failed to rescore problem for user.": "\u672a\u80fd\u4e3a\u7528\u6237\u91cd\u65b0\u8bc4\u5206\u95ee\u9898\u3002", 
    "Failed to rescore problem to improve score for user.": "\u672a\u80fd\u91cd\u65b0\u8bc4\u5206\u95ee\u9898\u4ee5\u63d0\u9ad8\u7528\u6237\u8bc4\u5206\u3002", 
    "Failed to reset attempts for user.": "\u65e0\u6cd5\u91cd\u7f6e\u7528\u6237\u7684\u5c1d\u8bd5\u3002", 
    "File": "\u6587\u4ef6", 
    "File Name": "\u6587\u4ef6\u540d", 
    "Fill browser": "\u5168\u5c4f", 
    "Filter and sort topics": "\u8fc7\u6ee4\u548c\u6574\u7406\u8bdd\u9898", 
    "Financial Assistance": "\u7ecf\u6d4e\u8865\u52a9", 
    "Find": "\u67e5\u627e", 
    "Find a course": "\u627e\u5230\u4e00\u4e2a\u8bfe\u7a0b", 
    "Find and replace": "\u67e5\u627e\u548c\u66ff\u6362", 
    "Find discussions": "\u641c\u7d22\u8ba8\u8bba\u5e16", 
    "Find next": "\u67e5\u627e\u4e0b\u4e00\u4e2a", 
    "Find previous": "\u67e5\u627e\u4e0a\u4e00\u4e2a", 
    "Finish": "\u5b8c\u6210", 
    "First Attempt": "\u7b2c\u4e00\u6b21\u5c1d\u8bd5", 
    "Follow": "\u5173\u6ce8", 
    "Follow or unfollow posts": "\u5173\u6ce8\u6216\u53d6\u6d88\u5173\u6ce8\u53d1\u5e16", 
    "Following": "\u5173\u6ce8", 
    "Font Family": "\u5b57\u4f53", 
    "Font Sizes": "\u5b57\u53f7", 
    "Footer": "\u811a\u6ce8", 
    "Forgot password?": "\u5fd8\u8bb0\u5bc6\u7801\uff1f", 
    "Format": "\u683c\u5f0f", 
    "Formats": "\u683c\u5f0f", 
    "Full Name": "\u5168\u540d", 
    "Full Profile": "\u5168\u90e8\u8d44\u6599", 
    "Fullscreen": "\u5168\u5c4f", 
    "Gender": "\u6027\u522b", 
    "General": "\u4e00\u822c", 
    "Generate a single certificate": "\u751f\u6210\u5355\u4e2a\u8bc1\u4e66", 
    "H Align": "\u6c34\u5e73\u5bf9\u9f50", 
    "HTML preview of post": "\u5e16\u5b50\u7684 HTML \u9884\u89c8", 
    "HTML source code": "HTML \u6e90\u4ee3\u7801", 
    "Header": "\u8868\u5934", 
    "Header 1": "\u6807\u9898 1", 
    "Header 2": "\u6807\u9898 2", 
    "Header 3": "\u6807\u9898 3", 
    "Header 4": "\u6807\u9898 4", 
    "Header 5": "\u6807\u9898 5", 
    "Header 6": "\u6807\u9898 6", 
    "Header cell": "\u8868\u5934\u5355\u5143\u683c", 
    "Headers": "\u6807\u9898", 
    "Heading": "\u6807\u9898", 
    "Heading (Ctrl+H)": "\u6807\u9898(Ctrl+H)", 
    "Heading 1": "\u6807\u9898 1", 
    "Heading 2": "\u6807\u9898 2", 
    "Heading 3": "\u6807\u9898 3", 
    "Heading 4": "\u6807\u9898 4", 
    "Heading 5": "\u6807\u9898 5", 
    "Heading 6": "\u6807\u9898 6", 
    "Headings": "\u6807\u9898", 
    "Height": "\u9ad8\u5ea6", 
    "Hide Annotations": "\u9690\u85cf\u6279\u6ce8", 
    "Hide Discussion": "\u9690\u85cf\u8ba8\u8bba", 
    "Hide closed captions": "\u9690\u85cfCC\u5b57\u5e55", 
    "Hide notes": "\u9690\u85cf\u6ce8\u91ca", 
    "High Definition": "\u9ad8\u7ea7\u5b9a\u4e49", 
    "Highlighted text": "\u91cd\u8981\u6587\u672c", 
    "Horizontal Rule (Ctrl+R)": "\u6c34\u5e73\u7ebf(Ctrl+R)", 
    "Horizontal line": "\u6c34\u5e73\u7ebf", 
    "Horizontal space": "\u6c34\u5e73\u95f4\u8ddd", 
    "How to create useful text alternatives.": "\u5982\u4f55\u5efa\u7acb\u6709\u7528\u7684\u6587\u5b57\u66ff\u4ee3\u7269\u3002", 
    "How to use %(platform_name)s discussions": "\u5982\u4f55\u4f7f\u7528 %(platform_name)s \u8ba8\u8bba", 
    "Hyperlink (Ctrl+L)": "\u8d85\u94fe\u63a5(Ctrl+L)", 
    "If you do not yet have an account, use the button below to register.": "\u5982\u679c\u60a8\u5c1a\u65e0\u5e10\u6237\uff0c\u8bf7\u4f7f\u7528\u4ee5\u4e0b\u6309\u94ae\u8fdb\u884c\u6ce8\u518c\u3002", 
    "If you use the Advanced Editor, this problem will be converted to XML and you will not be able to return to the Simple Editor Interface.\n\nProceed to the Advanced Editor and convert this problem to XML?": "\u5982\u679c\u60a8\u4f7f\u7528\u9ad8\u7ea7\u7f16\u8f91\u5668\uff0c\u8be5\u95ee\u9898\u5c06\u8f6c\u4e3aXML\uff0c\u540c\u65f6\u60a8\u4e5f\u65e0\u6cd5\u518d\u56de\u5230\u7b80\u6613\u7f16\u8f91\u5668\u754c\u9762\u3002\n\n\u8981\u7ee7\u7eed\u4f7f\u7528\u9ad8\u7ea7\u7f16\u8f91\u5668\u5e76\u5c06\u8be5\u95ee\u9898\u8f6c\u4e3aXML\u5417\uff1f", 
    "Ignore": "\u5ffd\u7565", 
    "Ignore all": "\u5168\u90e8\u5ffd\u7565", 
    "Image": "\u56fe\u50cf", 
    "Image (Ctrl+G)": "\u56fe\u7247(Ctrl+G)", 
    "Image Description": "\u56fe\u7247\u63cf\u8ff0", 
    "Image Upload Error": "\u56fe\u7247\u4e0a\u4f20\u9519\u8bef", 
    "Image description": "\u56fe\u7247\u63cf\u8ff0", 
    "In Progress": "\u6b63\u5728\u8fdb\u884c\u4e2d", 
    "Increase indent": "\u589e\u52a0\u7f29\u8fdb", 
    "Inline": "\u5bf9\u9f50", 
    "Insert": "\u63d2\u5165", 
    "Insert Hyperlink": "\u63d2\u5165\u8d85\u94fe\u63a5", 
    "Insert Image (upload file or type URL)": "\u63d2\u5165\u56fe\u7247 (\u4e0a\u4f20\u6587\u4ef6\u6216\u8f93\u5165URL)", 
    "Insert column after": "\u5728\u53f3\u4fa7\u63d2\u5165\u5217", 
    "Insert column before": "\u5728\u5de6\u4fa7\u63d2\u5165\u5217", 
    "Insert date/time": "\u63d2\u5165\u65e5\u671f\uff0f\u65f6\u95f4", 
    "Insert image": "\u63d2\u5165\u56fe\u7247", 
    "Insert link": "\u63d2\u5165\u94fe\u63a5", 
    "Insert row after": "\u5728\u4e0b\u65b9\u63d2\u5165\u884c", 
    "Insert row before": "\u5728\u4e0a\u65b9\u63d2\u5165\u884c", 
    "Insert table": "\u63d2\u5165\u8868\u683c", 
    "Insert template": "\u63d2\u5165\u6a21\u677f", 
    "Insert video": "\u63d2\u5165\u89c6\u9891", 
    "Insert/edit image": "\u63d2\u5165\uff0f\u7f16\u8f91\u56fe\u7247", 
    "Insert/edit link": "\u63d2\u5165\uff0f\u7f16\u8f91\u94fe\u63a5", 
    "Insert/edit video": "\u63d2\u5165\uff0f\u7f16\u8f91\u89c6\u9891", 
    "Instructor": "\u6559\u5e08", 
    "Is this OK?": "\u597d\u4e86\u5417", 
    "Italic": "\u659c\u4f53", 
    "Italic (Ctrl+I)": "\u659c\u4f53(Ctrl+I)", 
    "Justify": "\u4e24\u7aef\u5bf9\u9f50", 
    "KB": "KB", 
    "Keywords": "\u5173\u952e\u5b57", 
    "LEARN MORE": "\u4e86\u89e3\u66f4\u591a", 
    "Language": "\u8bed\u8a00", 
    "Large": "\u5927", 
    "Last Attempt": "\u4e0a\u6b21\u5c1d\u8bd5", 
    "Last Edited:": "\u6700\u540e\u4fee\u6539\uff1a", 
    "Left": "\u5de6\u5bf9\u9f50", 
    "Left to right": "\u4ece\u5de6\u5411\u53f3", 
    "Less": "\u6536\u8d77", 
    "Limited Profile": "\u90e8\u5206\u8d44\u6599", 
    "Link Description": "\u94fe\u63a5\u7684\u63cf\u8ff0", 
    "Link Your Account": "\u5173\u8054\u60a8\u7684\u8d26\u6237", 
    "Link your {accountName} account": "\u5173\u8054\u60a8\u7684{accountName}\u5e10\u6237", 
    "Link your {accountName} account to your {platformName} account and use {accountName} to sign in to {platformName}.": "\u5c06 {accountName} \u5e10\u6237\u94fe\u63a5\u5230 {platformName} \u5e10\u6237, \u5e76\u4f7f\u7528 {accountName} \u767b\u5f55\u5230 {platformName}\u3002", 
    "Linked Accounts": "\u5173\u8054\u7684\u5e10\u6237", 
    "Linking": "\u5173\u8054\u4e2d", 
    "Links are generated on demand and expire within 5 minutes due to the sensitive nature of student information.": "\u7531\u4e8e\u5305\u542b\u6d89\u53ca\u5b66\u751f\u7684\u654f\u611f\u4fe1\u606f\uff0c\u751f\u6210\u7684\u94fe\u63a5\u5c06\u57285\u5206\u949f\u540e\u5931\u6548\u3002", 
    "List item": "\u5217\u8868\u9879", 
    "Load all responses": "\u8f7d\u5165\u6240\u6709\u7684\u56de\u590d", 
    "Load more": "\u52a0\u8f7d\u66f4\u591a", 
    "Load next %(num_items)s result": [
      "\u52a0\u8f7d\u4e0b\u4e00\u4e2a %(num_items)s \u7ed3\u679c"
    ], 
    "Load next {numResponses} responses": "\u52a0\u8f7d\u4e0b\u4e00\u4e2a {numResponses} \u54cd\u5e94", 
    "Loading": "\u6b63\u5728\u52a0\u8f7d", 
    "Loading content": "\u6b63\u5728\u52a0\u8f7d\u5185\u5bb9", 
    "Loading data...": "\u8f7d\u5165\u6570\u636e\u4e2d......", 
    "Loading more threads": "\u8f7d\u5165\u66f4\u591a\u7684\u4e3b\u9898", 
<<<<<<< HEAD
    "Loading posts list": "\u52a0\u8f7d\u5e16\u5b50\u5217\u8868", 
=======
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Loading your courses": "\u6b63\u5728\u52a0\u8f7d\u60a8\u7684\u8bfe\u7a0b", 
    "Location in Course": "\u8bfe\u7a0b\u4e2d\u7684\u4f4d\u7f6e", 
    "Loud": "\u97f3\u91cf\u9ad8", 
    "Low": "\u4f4e", 
    "Lower Alpha": "\u5c0f\u5199\u5b57\u6bcd", 
    "Lower Greek": "\u5c0f\u5199\u5e0c\u814a\u5b57\u6bcd", 
    "Lower Roman": "\u5c0f\u5199\u7f57\u9a6c\u5b57\u6bcd", 
    "MB": "MB", 
    "Mark Exam As Completed": "\u6807\u8bb0\u5b8c\u6210\u8003\u8bd5", 
    "Mark as Answer": "\u6807\u8bb0\u7b54\u6848", 
    "Mark enrollment code as unused": "\u6807\u8bb0\u9009\u8bfe\u7801\u4e3a\u5c1a\u672a\u4f7f\u7528\u7684", 
    "Markdown Editing Help": "Markdown\u7f16\u8f91\u5e2e\u52a9", 
    "Match case": "\u5339\u914d\u5927\u5c0f\u5199", 
    "Maximum": "\u6700\u5927\u6570\u503c", 
    "Merge cells": "\u5408\u5e76\u5355\u5143\u683c", 
    "Message:": "\u6d88\u606f\uff1a", 
    "Middle": "\u4e2d\u95f4", 
    "Module state successfully deleted.": "\u5df2\u6210\u529f\u5220\u9664\u6a21\u5757\u72b6\u6001\u3002", 
    "More": "\u66f4\u591a", 
    "Mute": "\u9759\u97f3", 
    "Muted": "\u9759\u97f3", 
    "My Notes": "\u6211\u7684\u7b14\u8bb0", 
    "My Orders": "\u6211\u7684\u6307\u4ee4", 
    "Name": "\u540d\u79f0", 
    "New Address": "\u65b0\u5730\u5740", 
    "New document": "\u65b0\u5efa\u6587\u6863", 
    "New to %(platformName)s?": "\u65b0\u5e10\u6237%(platformName)s\uff1f", 
    "New window": "\u65b0\u5efa\u7a97\u53e3", 
    "Next": "\u4e0b\u4e00\u4e2a", 
    "No Flash Detected": "\u6ca1\u6709\u53d1\u73b0Flash", 
    "No Webcam Detected": "\u6ca1\u6709\u68c0\u6d4b\u5230\u6444\u50cf\u5934", 
    "No color": "\u65e0\u989c\u8272", 
    "No posts matched your query.": "\u6ca1\u6709\u4e0e\u60a8\u7684\u67e5\u8be2\u5339\u914d\u7684\u5e16\u5b50\u3002", 
    "No results found for \"%(query_string)s\". Please try searching again.": "\u672a\u627e\u5230\u6709\u5173\"%(query_string)s\"\u7684\u4efb\u4f55\u7ed3\u679c\u3002\u8bf7\u91cd\u65b0\u641c\u7d22\u3002", 
    "No results found for {original_query}. Showing results for {suggested_query}.": "\u627e\u4e0d\u5230 {original_query} \u7684\u7ed3\u679c\u3002\u663e\u793a {suggested_query} \u7684\u7ed3\u679c\u3002", 
    "No tasks currently running.": "\u6ca1\u6709\u6b63\u5728\u6267\u884c\u7684\u4efb\u52a1", 
    "Nonbreaking space": "\u4e0d\u95f4\u65ad\u7a7a\u683c", 
    "None": "\u65e0", 
    "Not Currently Available": "\u5f53\u524d\u4e0d\u53ef\u7528", 
    "Note": "\u7b14\u8bb0", 
    "Noted in:": "\u6807\u8bb0\u4e8e\uff1a", 
    "Notes hidden": "\u6ce8\u91ca\u5df2\u9690\u85cf", 
    "Notes visible": "\u6ce8\u91ca\u53ef\u89c1", 
    "Number Sent": "\u53d1\u9001\u6570\u76ee", 
    "Number of Students": "\u5b66\u751f\u6570\u76ee", 
    "Numbered List (Ctrl+O)": "\u6709\u5e8f\u5217\u8868(Ctrl+O)", 
    "Numbered list": "\u7f16\u53f7\u5217\u8868", 
    "OK": "\u662f\u7684", 
    "ORDER NAME": "\u8ba2\u5355\u540d\u79f0", 
    "ORDER NUMBER": "\u8ba2\u5355\u7f16\u53f7", 
    "ORDER PLACED": "\u8ba2\u5355\u653e\u7f6e", 
    "Ok": "\u786e\u5b9a", 
    "Only properly formatted .csv files will be accepted.": "\u53ea\u6709\u6807\u51c6\u7684CSV\u683c\u5f0f\u6587\u4ef6\u4f1a\u88ab\u63a5\u53d7\u3002", 
    "Open": "\u6253\u5f00", 
    "Open Calculator": "\u6253\u5f00\u8ba1\u7b97\u5668", 
    "Open language menu": "\u5f00\u542f\u8bed\u8a00\u529f\u80fd\u83dc\u5355", 
    "Order Details": "\u8ba2\u5355\u7ec6\u8282", 
    "Order History": "\u8ba2\u5355\u8bb0\u5f55", 
    "Overall Score": "\u603b\u5206", 
    "Page break": "\u5206\u9875\u7b26", 
    "Page number out of %(total_pages)s": "\u9875\u7801\uff08\u5171 %(total_pages)s \u9875\uff09", 
    "Pagination": "\u9875\u7801", 
    "Paragraph": "\u6bb5\u843d", 
    "Password": "\u5bc6\u7801", 
    "Password assistance": "\u5bc6\u7801\u5e2e\u52a9", 
    "Password reset email sent. Follow the link in the email to change your password.": "\u5bc6\u7801\u91cd\u7f6e\u90ae\u4ef6\u5df2\u7ecf\u53d1\u9001\u3002\u8bf7\u901a\u8fc7\u70b9\u51fb\u90ae\u4ef6\u4e2d\u7684\u94fe\u63a5\u66f4\u6539\u4f60\u7684\u5bc6\u7801\u3002", 
    "Paste": "\u7c98\u8d34", 
    "Paste as text": "\u7c98\u8d34\u4e3a\u6587\u672c", 
    "Paste is now in plain text mode. Contents will now be pasted as plain text until you toggle this option off.": "\u5f53\u524d\u4e3a\u7eaf\u6587\u672c\u7c98\u8d34\u6a21\u5f0f\uff0c\u6240\u6709\u5185\u5bb9\u90fd\u5c06\u4ee5\u7eaf\u6587\u672c\u5f62\u5f0f\u7c98\u8d34\u3002\u5173\u95ed\u8be5\u9009\u9879\u4ee5\u56de\u5230\u666e\u901a\u7c98\u8d34\u6a21\u5f0f\u3002", 
    "Paste row after": "\u5728\u4e0b\u65b9\u7c98\u8d34\u884c", 
    "Paste row before": "\u5728\u4e0a\u65b9\u7c98\u8d34\u884c", 
    "Paste your embed code below:": "\u5c06\u5185\u5d4c\u4ee3\u7801\u7c98\u8d34\u5230\u4e0b\u65b9\uff1a", 
    "Pause": "\u6682\u505c", 
    "Photo Captured successfully.": "\u7167\u7247\u83b7\u53d6\u6210\u529f\uff01", 
    "Pin": "\u5904\u7406", 
    "Pinned": "\u5df2\u56fa\u5b9a", 
    "Placeholder": "\u5360\u4f4d\u7b26", 
    "Play": "\u5f00\u59cb", 
    "Play video": "\u64ad\u653e\u89c6\u9891", 
    "Please check your email to confirm the change": "\u8bf7\u68c0\u67e5\u60a8\u7684\u90ae\u4ef6\u4ee5\u786e\u8ba4\u4fee\u6539", 
    "Please describe this image or agree that it has no contextual value by checking the checkbox.": "\u8bf7\u63cf\u8ff0\u672c\u56fe\u7247\u6216\u52fe\u9009\u590d\u9009\u6846\u8868\u793a\u56fe\u7247\u4e0d\u542b\u4e0e\u5185\u5bb9\u76f8\u5173\u7684\u4ef7\u503c\u3002", 
    "Please do not use any spaces in this field.": "\u6b64\u5b57\u6bb5\u7684\u5185\u5bb9\u4e0d\u80fd\u5305\u542b\u7a7a\u683c\u3002", 
    "Please do not use any spaces or special characters in this field.": "\u6b64\u5b57\u6bb5\u7684\u5185\u5bb9\u4e0d\u80fd\u5305\u542b\u7a7a\u683c\u6216\u7279\u6b8a\u5b57\u7b26\u3002", 
    "Please enter a problem location.": "\u8bf7\u8f93\u5165\u95ee\u9898\u7684\u4f4d\u7f6e\u3002", 
    "Please enter a student email address or username.": "\u8bf7\u8f93\u5165\u5b66\u751f\u7684\u90ae\u4ef6\u5730\u5740\u6216\u7528\u6237\u540d\u3002", 
    "Please enter a term in the {anchorStart} search field{anchorEnd}.": "\u8bf7\u5728 {anchorStart} \u641c\u7d22\u5b57\u6bb5 {anchorEnd} \u3002", 
    "Please enter a username or email.": "\u8bf7\u8f93\u5165\u4e00\u4e2a\u7528\u6237\u540d\u6216\u8005\u7535\u5b50\u90ae\u4ef6\u3002", 
    "Please enter a valid donation amount.": "\u8bf7\u8f93\u5165\u4e00\u4e2a\u6709\u6548\u7684\u6350\u52a9\u91d1\u989d\u3002", 
    "Please enter a valid email address": "\u8bf7\u8f93\u5165\u4e00\u4e2a\u6709\u6548\u7684\u7535\u5b50\u90ae\u4ef6\u5730\u5740\u3002", 
    "Please enter a valid password": "\u8bf7\u8f93\u5165\u4e00\u4e2a\u6709\u6548\u7684\u5bc6\u7801\u3002", 
    "Please enter valid start date and time.": "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u5f00\u59cb\u65e5\u671f\u4e0e\u65f6\u95f4", 
    "Please enter your %(field)s.": "\u8bf7\u8f93\u5165\u60a8\u7684 %(field)s.", 
    "Please enter your email address below and we will send you instructions for setting a new password.": "\u8bf7\u5728\u4e0b\u9762\u8f93\u5165\u60a8\u7684\u7535\u5b50\u90ae\u4ef6\u4ee5\u4fbf\u6211\u4eec\u7ed9\u60a8\u53d1\u9001\u5982\u4f55\u8bbe\u7f6e\u65b0\u5bc6\u7801\u7684\u8bf4\u660e\u3002", 
    "Please provide a description of the link destination.": "\u8bf7\u63d0\u4f9b\u94fe\u63a5\u7684\u63cf\u8ff0\u3002", 
    "Please provide a valid URL.": "\u8bf7\u63d0\u4f9b\u4e00\u4e2a\u6709\u6548\u7684\u7f51\u5740\u3002", 
    "Please select a course date": "\u8bf7\u9009\u62e9\u8bfe\u7a0b\u65e5\u671f", 
    "Please specify a reason.": "\u8bf7\u8bf4\u660e\u539f\u56e0\u3002", 
    "Please verify that you have uploaded a valid image (PNG and JPEG).": "\u8bf7\u9a8c\u8bc1\u60a8\u5df2\u4e0a\u4f20\u4e86\u4e00\u5f20\u6709\u6548\u7684\u56fe\u7247(PNG\u6216JPEG\u683c\u5f0f)\u3002", 
    "Please verify that your webcam is connected and that you have allowed your browser to access it.": "\u8bf7\u68c0\u67e5\u60a8\u7684\u6444\u50cf\u5934\u5df2\u8fde\u63a5\u5e76\u4e14\u5141\u8bb8\u6d4f\u89c8\u5668\u4f7f\u7528\u3002", 
    "Post body": "\u5e16\u5b50\u5185\u5bb9", 
<<<<<<< HEAD
    "Post type": "\u5e16\u5b50\u7c7b\u578b:", 
=======
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Poster": "\u5c01\u9762", 
    "Pre": "Pre \u6807\u7b7e", 
    "Preferred Language": "\u9996\u9009\u8bed\u8a00", 
    "Preformatted": "\u9884\u8bbe\u683c\u5f0f", 
    "Press UP to enter the speed menu then use the UP and DOWN arrow keys to navigate the different speeds, then press ENTER to change to the selected speed.": "\u6309\u5411\u4e0a\u952e\u6253\u5f00\u901f\u5ea6\u83dc\u5355\uff0c\u518d\u6309\u4e0a\u4e0b\u65b9\u5411\u952e\u6765\u8c03\u6574\u901f\u5ea6\uff0c\u7136\u540e\u6309\u56de\u8f66\u952e\u5207\u6362\u5230\u9009\u5b9a\u901f\u5ea6\u3002", 
    "Press the UP arrow key to enter the language menu then use UP and DOWN arrow keys to navigate language options. Press ENTER to change to the selected language.": "\u6309\u5411\u4e0a\u952e\u6253\u5f00\u8bed\u8a00\u529f\u80fd\u83dc\u5355\uff0c\u7136\u540e\u4f7f\u7528\u4e0a\u4e0b\u65b9\u5411\u952e\u6765\u9009\u62e9\u8bed\u8a00\u9009\u9879\u3002\u6309\u56de\u8f66\u952e\u4ee5\u5207\u6362\u5230\u6240\u9009\u62e9\u7684\u8bed\u8a00\u3002", 
    "Prev": "\u4e0a\u4e00\u4e2a", 
    "Prevent students from generating certificates in this course?": "\u662f\u5426\u963b\u6b62\u5b66\u751f\u751f\u6210\u8be5\u8bfe\u7a0b\u8bc1\u4e66\uff1f", 
    "Preview": "\u9884\u89c8", 
    "Preview this query": "\u9884\u89c8\u8be5\u67e5\u8be2", 
    "Previous": "\u4e0a\u4e00\u6b65", 
    "Print": "\u6253\u5370", 
    "Professional Education": "\u4e13\u4e1a\u6559\u80b2", 
    "Professional Education Verified Certificate": "\u4e13\u4e1a\u6559\u80b2\u8ba4\u8bc1\u8bc1\u4e66", 
    "Profile": "\u7528\u6237\u8d44\u6599", 
    "Profile Image": "\u8d44\u6599\u7167\u7247", 
    "Profile image for {username}": "{username} \u7684\u5934\u50cf", 
    "Program Certificates": "\u8bc1\u660e\u7a0b\u5e8f", 
    "Programs": "\u9879\u76ee", 
    "Public": "\u516c\u5f00", 
    "Put a request on the queue to recreate the certificate for a particular user in a particular course": "\u5728\u961f\u5217\u4e2d\u653e\u7f6e\u4e00\u4e2a\u8bf7\u6c42, \u4ee5\u4fbf\u5728\u7279\u5b9a\u8bfe\u7a0b\u4e2d\u4e3a\u7279\u5b9a\u7528\u6237\u91cd\u65b0\u521b\u5efa\u8bc1\u4e66", 
    "Question": "\u95ee\u9898", 
<<<<<<< HEAD
    "Questions raise issues that need answers. Discussions share ideas and start conversations.": "\u63d0\u51fa\u8bae\u9898\uff0c\u5171\u540c\u63a2\u8ba8\uff0c\u4ea4\u6d41\u60f3\u6cd5\u3002", 
=======
    "Queued": "\u5df2\u6392\u961f", 
    "Reason": "\u539f\u56e0", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Reason field should not be left blank.": "\u539f\u56e0\u4e0d\u80fd\u4e3a\u7a7a\u3002", 
    "Receive updates": "\u63a5\u6536\u66f4\u65b0", 
    "Recent Activity": "\u8fd1\u671f\u6d3b\u52a8", 
    "Redo": "\u91cd\u505a", 
    "Redo (Ctrl+Shift+Z)": "\u91cd\u505a(Ctrl+Shift+Z)", 
    "Redo (Ctrl+Y)": "\u91cd\u505a(Ctrl+Y)", 
    "Register through edX": "\u901a\u8fc7edX\u6ce8\u518c", 
    "Register with Institution/Campus Credentials": "\u4f7f\u7528\u673a\u6784/\u6821\u56ed\u5e10\u53f7\u6ce8\u518c", 
    "Related to: %(courseware_title_linked)s": "\u4e0e%(courseware_title_linked)s\u76f8\u5173", 
    "Removal is in progress. To avoid errors, stay on this page until the process is complete.": "\u6b63\u5728\u79fb\u9664\u3002\u4e3a\u907f\u514d\u53d1\u751f\u9519\u8bef\uff0c\u5728\u4e0a\u4f20\u5b8c\u6210\u524d\u8bf7\u4e0d\u8981\u79bb\u5f00\u672c\u9875\u3002", 
    "Remove": "\u79fb\u9664", 
    "Remove a user from the whitelist for a course": "\u4ece\u4f18\u826f\u540d\u5355\u4e2d\u5220\u9664\u8bfe\u7a0b\u7684\u7528\u6237", 
    "Remove link": "\u79fb\u9664\u94fe\u63a5", 
    "Removing": "\u79fb\u9664\u4e2d", 
    "Replace": "\u66ff\u6362", 
    "Replace all": "\u5168\u90e8\u66ff\u6362", 
    "Replace with": "\u66ff\u6362\u4e3a", 
    "Reply": "\u56de\u590d", 
    "Reply to Annotation": "\u56de\u590d\u6279\u6ce8", 
    "Report": "\u62a5\u544a", 
    "Report abuse": "\u62a5\u544a\u4e0d\u5f53\u7528\u9014", 
    "Report abuse, topics, and responses": "\u4e3e\u62a5\u4e0d\u5f53\u7684\u7528\u9014\u3001\u8bdd\u9898\u548c\u56de\u590d", 
    "Report annotation as inappropriate or offensive.": "\u62a5\u544a\u6b64\u6279\u6ce8\u4e0d\u6070\u5f53\u6216\u5177\u6709\u653b\u51fb\u6027\u3002", 
    "Reported": "\u5df2\u62a5\u544a", 
    "Requester": "\u8bf7\u6c42\u8005", 
    "Required field": "\u5fc5\u586b\u9879\u76ee", 
    "Required field.": "\u5fc5\u586b\u5b57\u6bb5\u3002", 
<<<<<<< HEAD
    "Rescore problem '<%- problem_id %>' for all students?": "\u5bf9\u6240\u6709\u5b66\u751f\u91cd\u65b0\u8bc4\u5206\u95ee\u9898 \"<%-problem_id%>\"\uff1f", 
    "Reset Password": "\u91cd\u8bbe\u5bc6\u7801", 
    "Reset Your Password": "\u91cd\u7f6e\u60a8\u7684\u5bc6\u7801", 
    "Reset attempts for all students on problem '<%- problem_id %>'?": "\u662f\u5426\u5728\u95ee\u9898 \"<%-problem_id%>\" \u4e0a\u5c1d\u8bd5\u91cd\u7f6e\u6240\u6709\u5b66\u751f\uff1f", 
=======
    "Reset Password": "\u91cd\u8bbe\u5bc6\u7801", 
    "Reset Your Password": "\u91cd\u7f6e\u60a8\u7684\u5bc6\u7801", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Reset my password": "\u91cd\u8bbe\u6211\u7684\u5bc6\u7801", 
    "Responses could not be loaded. Refresh the page and try again.": "\u65e0\u6cd5\u52a0\u8f7d\u54cd\u5e94\u3002\u8bf7\u5237\u65b0\u8be5\u9875\u5e76\u91cd\u8bd5\u3002", 
    "Restore enrollment code": "\u6062\u590d\u9009\u8bfe\u7801", 
    "Restore last draft": "\u6062\u590d\u4e0a\u4e00\u7248\u8349\u7a3f", 
    "Review your info": "\u5ba1\u6838\u60a8\u7684\u4fe1\u606f", 
    "Revoke access": "\u53d6\u6d88\u6388\u6743", 
    "Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help": "\u4e30\u5bcc\u6587\u672c\u533a\u57df\u3002\u6309 ALT-F9 \u6253\u5f00\u83dc\u5355\uff0c\u6309 ALT-F10 \u6253\u5f00\u5de5\u5177\u680f\uff0c\u6309 ALT-0 \u67e5\u770b\u5e2e\u52a9", 
    "Right": "\u53f3\u5bf9\u9f50", 
    "Right to left": "\u4ece\u53f3\u5411\u5de6", 
    "Robots": "\u673a\u5668\u4eba", 
    "Row": "\u884c", 
    "Row actions are found here: ie. Deletion.": "\u5728\u8fd9\u91cc\u627e\u5230\u884c\u64cd\u4f5c ie\u3002\u5220\u9664.", 
    "Row group": "\u884c\u7ec4", 
    "Row properties": "\u884c\u5c5e\u6027", 
    "Row type": "\u884c\u7c7b\u578b", 
    "Rows": "\u884c", 
    "Save": "\u4fdd\u5b58", 
    "Save changes": "\u4fdd\u5b58\u4fee\u6539", 
    "Saved cohort": "\u5df2\u4fdd\u5b58\u7684\u7fa4\u7ec4", 
    "Saving": "\u6b63\u5728\u4fdd\u5b58", 
    "Saving your email preference": "\u6b63\u5728\u4fdd\u5b58\u60a8\u7684\u7535\u5b50\u90ae\u4ef6\u504f\u597d", 
    "Scope": "\u8303\u56f4", 
    "Search": "\u641c\u7d22", 
    "Search Results": "\u641c\u7d22\u7ed3\u679c", 
    "Search all posts": "\u641c\u7d22\u6240\u6709\u5e16\u5b50", 
    "Select Course Run": "\u9009\u62e9\u8bfe\u7a0b\u8fd0\u884c", 
    "Select a chapter": "\u9009\u62e9\u4e00\u7ae0", 
    "Select all": "\u5168\u9009", 
    "Select the time zone for displaying course dates. If you do not specify a time zone, course dates, including assignment deadlines, will be displayed in your browser's local time zone.": "\u9009\u62e9\u7528\u4e8e\u663e\u793a\u8bfe\u7a0b\u65e5\u671f\u7684\u65f6\u533a\u3002\u5982\u679c\u672a\u6307\u5b9a\u65f6\u533a, \u5219\u8bfe\u7a0b\u65e5\u671f (\u5305\u62ec\u5de5\u4f5c\u5206\u914d\u622a\u6b62\u65f6\u95f4) \u5c06\u663e\u793a\u5728\u6d4f\u89c8\u5668\u7684\u672c\u5730\u65f6\u533a\u4e2d\u3002", 
    "Selected tab": "\u9009\u4e2d\u7684\u6807\u7b7e", 
    "Send to:": "\u53d1\u81f3\uff1a", 
    "Sent By": "\u53d1\u9001\u4eba", 
    "Sent By:": "\u53d1\u4ef6\u4eba", 
    "Sent To": "\u53d1\u9001\u5230", 
    "Sent To:": "\u53d1\u9001\u81f3", 
    "Sequence error! Cannot navigate to %(tab_name)s in the current SequenceModule. Please contact the course staff.": "\u5e8f\u5217\u9519\u8bef\uff01 \u65e0\u6cd5\u5bfc\u822a\u5230\u5f53\u524d\u5e8f\u5217\u6a21\u5757\u4e2d\u7684%(tab_name)s\uff0c\u8bf7\u8054\u7cfb\u8bfe\u7a0b\u5de5\u4f5c\u4eba\u5458\u3002", 
    "Server Error, Please refresh the page and try again.": "\u670d\u52a1\u5668\u9519\u8bef\u3002\u8bf7\u5237\u65b0\u9875\u9762\u5e76\u518d\u8bd5\u4e00\u6b21\u3002", 
    "Share": "\u5206\u4eab", 
    "Share on Mozilla Backpack": "\u5206\u4eab\u5230 Mozilla Backpack \u4e0a", 
    "Share your \"%(display_name)s\" award": "\u5206\u4eab\u60a8\u7684 \"%(display_name)s\" \u5956\u52b1", 
    "Short explanation": "\u7b80\u8981\u8bf4\u660e", 
    "Show Annotations": "\u663e\u793a\u6279\u6ce8", 
    "Show Comment (%(num_comments)s)": [
      "\u663e\u793a\u8bc4\u8bba (%(num_comments)s)"
    ], 
    "Show Discussion": "\u663e\u793a\u8ba8\u8bba", 
    "Show blocks": "\u663e\u793a\u5757", 
    "Show invisible characters": "\u663e\u793a\u4e0d\u53ef\u89c1\u5b57\u7b26", 
    "Show me other ways to sign in or register": "\u663e\u793a\u5176\u4ed6\u767b\u5f55\u6216\u6ce8\u518c\u65b9\u5f0f", 
    "Show notes": "\u663e\u793a\u6ce8\u91ca", 
    "Show posts by {username}.": "\u6309 {username} \u663e\u793a\u5e16\u5b50\u3002", 
    "Showing all responses": "\u663e\u793a\u6240\u6709\u7684\u56de\u590d", 
    "Showing first response": [
      "\u663e\u793a\u7b2c\u4e00\u4e2a {numResponses} \u54cd\u5e94"
    ], 
    "Showing {firstIndex} out of {numItems} total": "\u663e\u793a {firstIndex} \u51fa {numItems} \u603b\u8ba1", 
    "Showing {firstIndex}-{lastIndex} out of {numItems} total": "\u663e\u793a{firstIndex}-{lastIndex} \u51fa {numItems} \u603b\u8ba1", 
    "Sign in": "\u767b\u5f55", 
    "Sign in here using your email address and password, or use one of the providers listed below.": "\u4f7f\u7528\u60a8\u7684\u7535\u5b50\u90ae\u4ef6\u548c\u5bc6\u7801\u6216\u4f7f\u7528\u4ee5\u4e0b\u5217\u51fa\u7684\u4e00\u4e2a\u65b9\u5f0f\u5728\u6b64\u5904\u767b\u5f55\u3002", 
    "Sign in here using your email address and password.": "\u5728\u8fd9\u91cc\u4f7f\u7528\u4f60\u7684\u7535\u5b50\u90ae\u4ef6\u548c\u5bc6\u7801\u767b\u5f55\u3002", 
    "Sign in using %(providerName)s": "\u4f7f\u7528 %(providerName)s \u767b\u5f55", 
    "Sign in with %(providerName)s": "\u4f7f\u7528 %(providerName)s \u767b\u5f55", 
    "Sign in with Institution/Campus Credentials": "\u4f7f\u7528\u673a\u6784/\u6821\u56ed\u5e10\u53f7\u767b\u5f55", 
    "Skip": "\u8df3\u8fc7", 
    "Some images in this post have been omitted": "\u8fd9\u7bc7\u6587\u7ae0\u4e2d\u7684\u4e00\u4e9b\u56fe\u7247\u5df2\u88ab\u7701\u7565", 
    "Something went wrong changing this enrollment. Please try again.": "\u5728\u53d8\u66f4\u8fd9\u9879\u6ce8\u518c\u65f6\u51fa\u73b0\u4e86\u4e00\u4e9b\u95ee\u9898\u3002\u8bf7\u518d\u8bd5\u4e00\u6b21\u3002", 
    "Sorry, no results were found.": "\u5bf9\u4e0d\u8d77\uff0c\u672a\u627e\u5230\u641c\u7d22\u7ed3\u679c\u3002", 
    "Sorted by": "\u6392\u5217", 
    "Source": "\u6e90", 
    "Source code": "\u6e90\u4ee3\u7801", 
    "Special character": "\u7279\u6b8a\u5b57\u7b26", 
    "Speed": "\u901f\u5ea6", 
    "Spellcheck": "\u62fc\u5199\u68c0\u67e5", 
    "Split cell": "\u62c6\u5206\u5355\u5143\u683c", 
    "Square": "\u6b63\u65b9\u5f62", 
    "Staff": "\u6559\u5458", 
    "Start": "\u5f00\u59cb", 
    "Start generating certificates for all students in this course?": "\u662f\u5426\u5f00\u59cb\u4e3a\u8be5\u8bfe\u7a0b\u7684\u6240\u6709\u5b66\u751f\u751f\u6210\u8bc1\u4e66\uff1f", 
    "Start of transcript. Skip to the end.": "\u5b57\u5e55\u5f00\u59cb\u3002\u8df3\u8f6c\u81f3\u7ed3\u5c3e\u3002", 
    "Start regenerating certificates for students in this course?": "\u786e\u5b9a\u91cd\u65b0\u4ea7\u751f\u6b64\u8bfe\u7a0b\u6240\u6709\u5b66\u751f\u7684\u8bc1\u4e66\uff1f", 
    "Start search": "\u5f00\u59cb\u641c\u7d22", 
    "Start working toward your next learning goal.": "\u5f00\u59cb\u5411\u60a8\u7684\u4e0b\u4e00\u4e2a\u5b66\u4e60\u76ee\u6807\u8fc8\u8fdb\u3002", 
<<<<<<< HEAD
    "Started entrance exam rescore task for student '{student_id}'. Click the 'Show Task Status' button to see the status of the task.": "\u5f00\u59cb\u5165\u5b66\u8003\u8bd5\u91cd\u65b0\u8bc4\u5206\u5b66\u751f \"{student_id}\" \u7684\u4efb\u52a1\u3002\u5355\u51fb \"\u663e\u793a\u4efb\u52a1\u72b6\u6001\" \u6309\u94ae\u4ee5\u67e5\u770b\u4efb\u52a1\u7684\u72b6\u6001\u3002", 
    "Started rescore problem task for problem '<%- problem_id %>' and student '<%- student_id %>'. Click the 'Show Task Status' button to see the status of the task.": "\u5df2\u5f00\u59cb\u91cd\u65b0\u8bc4\u5206\u95ee\u9898 \"<%-problem_id%>\" \u548c \"\u5b66\u751f\" <%-student_id%> \u7684\u95ee\u9898\u4efb\u52a1\u3002\u5355\u51fb \"\u663e\u793a\u4efb\u52a1\u72b6\u6001\" \u6309\u94ae\u4ee5\u67e5\u770b\u4efb\u52a1\u7684\u72b6\u6001\u3002", 
=======
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Starts": "\u5f00\u59cb", 
    "Starts %(start)s": "\u5f00\u59cb\u4e8e%(start)s", 
    "Starts: %(start_date)s": "\u5f00\u59cb\u4e8e\uff1a%(start_date)s", 
    "State": "\u72b6\u6001", 
    "Strikethrough": "\u5220\u9664\u7ebf", 
    "Student Removed from certificate white list successfully.": "\u5b66\u751f\u5df2\u4ece\u8bc1\u4e66\u8bb8\u53ef\u540d\u5355\u4e2d\u79fb\u9664\u6210\u529f\u3002", 
<<<<<<< HEAD
    "Student username/email field is required and can not be empty. Kindly fill in username/email and then press \"Add to Exception List\" button.": "\u5b66\u751f\u7528\u6237\u540d/\u7535\u5b50\u90ae\u4ef6\u5b57\u6bb5\u662f\u5fc5\u9700\u7684, \u4e0d\u80fd\u4e3a\u7a7a\u3002\u8bf7\u586b\u5199\u7528\u6237\u540d/\u7535\u5b50\u90ae\u4ef6, \u7136\u540e\u6309 \"\u6dfb\u52a0\u5230\u4f8b\u5916\u5217\u8868 \" \u6309\u94ae\u3002", 
    "Student username/email field is required and can not be empty. Kindly fill in username/email and then press \"Invalidate Certificate\" button.": "\u5b66\u751f\u7528\u6237\u540d/\u7535\u5b50\u90ae\u4ef6\u5b57\u6bb5\u662f\u5fc5\u9700\u7684, \u4e0d\u80fd\u4e3a\u7a7a\u3002\u8bf7\u586b\u5199\u7528\u6237\u540d/\u7535\u5b50\u90ae\u4ef6, \u7136\u540e\u6309 \"\u65e0\u6548\u8bc1\u4e66 \" \u6309\u94ae\u3002", 
=======
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Style": "\u6837\u5f0f", 
    "Subject": "\u6807\u9898", 
    "Subject:": "\u6807\u9898", 
    "Submission aborted! Sorry, your browser does not support file uploads. If you can, please use Chrome or Safari which have been verified to support file uploads.": "\u63d0\u4ea4\u4e2d\u6b62\uff01\u62b1\u6b49\uff0c\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u6587\u4ef6\u4e0a\u4f20\u3002\u5982\u679c\u53ef\u4ee5\uff0c\u8bf7\u4f7f\u7528\u5df2\u9a8c\u8bc1\u652f\u6301\u6587\u4ef6\u4e0a\u4f20\u7684Chrome\u6216Safari\u3002", 
    "Submit": "\u63d0\u4ea4", 
    "Submitted": "\u5df2\u63d0\u4ea4", 
    "Subscript": "\u4e0b\u6807", 
    "Success": "\u6210\u529f", 
<<<<<<< HEAD
    "Success! Problem attempts reset for problem '<%- problem_id %>' and student '<%- student_id %>'.": "\u6210\u529f!\u95ee\u9898\u5c1d\u8bd5\u91cd\u7f6e\u4e3a\u95ee\u9898 \"<%-problem_id%>\" \u548c \"\u5b66\u751f\" <%-student_id%> \"\u3002", 
=======
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Successfully deleted student state for user {user}": "\u6210\u529f\u5220\u9664\u5b66\u751f{user}\u7684\u72b6\u6001", 
    "Successfully enrolled and sent email to the following users:": "\u4ee5\u4e0b\u7528\u6237\u5df2\u6210\u529f\u9009\u8bfe\uff0c\u5e76\u5411\u4ed6\u4eec\u53d1\u9001\u7535\u5b50\u90ae\u4ef6\uff1a", 
    "Successfully enrolled the following users:": "\u4ee5\u4e0b\u7528\u6237\u5df2\u7ecf\u6210\u529f\u9009\u8bfe\uff1a", 
    "Successfully rescored problem for user {user}": "\u6210\u529f\u91cd\u8bc4\u7528\u6237 {user}\u5f97\u5206", 
    "Successfully rescored problem to improve score for user {user}": "\u6210\u529f\u91cd\u65b0\u8bc4\u5206\u95ee\u9898\u4ee5\u63d0\u9ad8\u7528\u6237 {user} \u7684\u8bc4\u5206", 
    "Successfully reset the attempts for user {user}": "\u6210\u529f\u91cd\u7f6e\u7528\u6237{user}\u7684\u8bf7\u6c42", 
    "Successfully sent enrollment emails to the following users. They will be allowed to enroll once they register:": "\u9009\u8bfe\u90ae\u4ef6\u5df2\u6210\u529f\u53d1\u9001\u81f3\u4ee5\u4e0b\u7528\u6237\uff0c\u4ed6\u4eec\u6ce8\u518c\u540e\u5373\u53ef\u9009\u8bfe\uff1a", 
    "Successfully sent enrollment emails to the following users. They will be enrolled once they register:": "\u9009\u8bfe\u90ae\u4ef6\u5df2\u6210\u529f\u53d1\u9001\u81f3\u8fd9\u4e9b\u7528\u6237\uff0c\u4ed6\u4eec\u6ce8\u518c\u540e\u5373\u5df2\u9009\u8bfe\uff1a", 
<<<<<<< HEAD
    "Successfully started task to rescore problem '<%- problem_id %>' for all students. Click the 'Show Task Status' button to see the status of the task.": "\u5df2\u6210\u529f\u542f\u52a8\u4efb\u52a1\u4ee5\u91cd\u65b0\u8bc4\u5206\u6240\u6709\u5b66\u751f\u7684\u95ee\u9898 \"<%-problem_id%>\"\u3002\u5355\u51fb \"\u663e\u793a\u4efb\u52a1\u72b6\u6001\" \u6309\u94ae\u4ee5\u67e5\u770b\u4efb\u52a1\u7684\u72b6\u6001\u3002", 
    "Successfully started task to reset attempts for problem '<%- problem_id %>'. Click the 'Show Task Status' button to see the status of the task.": "\u5df2\u6210\u529f\u542f\u52a8\u4efb\u52a1\u4ee5\u91cd\u7f6e\u95ee\u9898 \"<%-problem_id%>\" \u7684\u5c1d\u8bd5\u3002\u5355\u51fb \"\u663e\u793a\u4efb\u52a1\u72b6\u6001\" \u6309\u94ae\u4ee5\u67e5\u770b\u4efb\u52a1\u7684\u72b6\u6001\u3002", 
=======
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Successfully unlinked.": "\u89e3\u7ed1\u6210\u529f\u3002", 
    "Superscript": "\u4e0a\u6807", 
    "TOTAL": "\u603b\u8ba1", 
    "Table": "\u8868\u683c", 
    "Table properties": "\u8868\u683c\u5c5e\u6027", 
    "Tags": "\u6807\u7b7e", 
    "Tags:": "\u6807\u7b7e\uff1a", 
    "Take a photo of your ID": "\u62cd\u6444\u4e00\u5f20\u60a8\u7684\u8eab\u4efd\u8bc1\u4ef6\u7684\u7167\u7247", 
    "Target": "\u76ee\u6807", 
    "Task ID": "\u4efb\u52a1ID", 
    "Task Progress": "\u4efb\u52a1\u8fdb\u5ea6", 
    "Task Status": "\u4efb\u52a1\u72b6\u6001", 
    "Task Type": "\u4efb\u52a1\u7c7b\u578b", 
    "Task inputs": "\u4efb\u52a1\u8f93\u5165", 
    "Teaching Assistant": "\u52a9\u6559", 
    "Tell other learners a little about yourself: where you live, what your interests are, why you're taking courses, or what you hope to learn.": "\u5411\u5176\u4ed6\u7528\u6237\u7b80\u5355\u4ecb\u7ecd\u4e0b\u4f60\u81ea\u5df1\uff1a\u5982\u5c45\u4f4f\u5730\u3001\u5174\u8da3\u7231\u597d\u3001\u4e3a\u4ec0\u4e48\u9009\u62e9\u8fd9\u4e9b\u8bfe\u7a0b\uff0c\u53ca\u4f60\u5e0c\u671b\u5b66\u4e60\u54ea\u65b9\u9762\u7684\u77e5\u8bc6", 
    "Templates": "\u6a21\u677f", 
    "Text": "\u6587\u672c", 
    "Text color": "\u6587\u672c\u989c\u8272", 
    "Text to display": "\u8981\u663e\u793a\u7684\u6587\u5b57", 
    "The URL you entered seems to be an email address. Do you want to add the required mailto: prefix?": "\u8f93\u5165\u7684URL\u53ef\u80fd\u662f\u4e00\u4e2a\u7535\u5b50\u90ae\u4ef6\u5730\u5740\uff0c\u60a8\u60f3\u52a0\u4e0a\u5fc5\u8981\u7684\u201cmailto:\u201d\u524d\u7f00\u5417\uff1f", 
    "The URL you entered seems to be an external link. Do you want to add the required http:// prefix?": "\u8f93\u5165\u7684 URL \u53ef\u80fd\u662f\u4e00\u4e2a\u5916\u90e8\u94fe\u63a5\uff0c\u60a8\u60f3\u52a0\u4e0a\u5fc5\u8981\u7684 http:// \u524d\u7f00\u5417\uff1f", 
    "The certificate for this learner has been re-validated and the system is re-running the grade for this learner.": "\u8fd9\u540d\u5b66\u751f\u7684\u8bc1\u4e66\u5df2\u7ecf\u91cd\u65b0\u9a8c\u8bc1\u53ca\u7cfb\u7edf\u91cd\u65b0\u8ba1\u7b97\u8be5\u540d\u5b66\u751f\u7684\u6210\u7ee9\u3002", 
    "The cohort cannot be added": "\u8be5\u7fa4\u7ec4\u4e0d\u80fd\u6dfb\u52a0", 
    "The cohort cannot be saved": "\u8be5\u7fa4\u7ec4\u4e0d\u80fd\u4fdd\u5b58", 
    "The data could not be saved.": "\u8be5\u6570\u636e\u65e0\u6cd5\u4fdd\u5b58\u3002", 
    "The email address you use to sign in. Communications from {platform_name} and your courses are sent to this address.": "\u7528\u4e8e\u767b\u5f55\u3001\u63a5\u6536\u6765\u81ea {platform_name} \u53ca\u60a8\u7684\u6ce8\u518c\u8bfe\u7a0b\u4fe1\u606f\u7684\u7535\u5b50\u90ae\u7bb1\u3002", 
    "The email address you've provided isn't formatted correctly.": "\u60a8\u6240\u63d0\u4f9b\u7684\u7535\u5b50\u90ae\u4ef6\u5730\u5740\u7684\u683c\u5f0f\u4e0d\u6b63\u786e\u3002", 
    "The file ": "\u8be5\u6587\u4ef6", 
    "The file must be at least {size} in size.": "\u6587\u4ef6\u5fc5\u987b\u5927\u4e8e {size}", 
    "The file must be smaller than {size} in size.": "\u6587\u4ef6\u5fc5\u987b\u5c0f\u4e8e {size} ", 
    "The following email addresses and/or usernames are invalid:": "\u4ee5\u4e0b\u7535\u5b50\u90ae\u4ef6\u5730\u5740\uff0f\u7528\u6237\u540d\u65e0\u6548\uff1a", 
    "The following errors were generated:": "\u51fa\u73b0\u4ee5\u4e0b\u9519\u8bef\uff1a", 
    "The following users are no longer enrolled in the course:": "\u4ee5\u4e0b\u7528\u6237\u5df2\u4e0d\u518d\u9009\u4fee\u672c\u8bfe\u7a0b\uff1a", 
    "The following warnings were generated:": "\u51fa\u73b0\u4ee5\u4e0b\u8b66\u544a\uff1a", 
    "The grading process is still running. Refresh the page to see updates.": "\u8bc4\u5206\u8fc7\u7a0b\u4ecd\u5728\u8fdb\u884c\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u67e5\u770b\u66f4\u65b0\u3002", 
    "The language used throughout this site. This site is currently available in a limited number of languages.": "\u6574\u4e2a\u7f51\u7ad9\u663e\u793a\u7684\u8bed\u8a00\u3002\u76ee\u524d\u4ec5\u9650\u4e8e\u51e0\u79cd\u8bed\u8a00\u3002", 
    "The name that appears on your Statements of Accomplishment. Other learners never see your full name.": "\u51fa\u73b0\u5728\u60a8\u7684\u7ed3\u4e1a\u8bc1\u660e\u4e2d\u7684\u540d\u79f0\u3002\u5176\u4ed6\u5b66\u4e60\u8005\u6c38\u8fdc\u770b\u4e0d\u60a8\u7684\u5168\u540d\u3002", 
    "The name that identifies you throughout {platform_name}. You cannot change your username.": "\u8be5\u540d\u79f0\u4e3a\u60a8\u5728\u6574\u4e2a {platform_name}\u7684\u6807\u8bc6\u3002\u786e\u8ba4\u540e\u65e0\u6cd5\u66f4\u6539\u60a8\u7684\u7528\u6237\u540d\u3002", 
    "The post you selected has been deleted.": "\u60a8\u9009\u62e9\u7684\u5e16\u5b50\u5df2\u88ab\u5220\u9664\u3002", 
    "The selected content group does not exist": "\u9009\u53d6\u7684\u5185\u5bb9\u7ec4\u4e0d\u5b58\u5728\u3002", 
    "The {cohortGroupName} cohort has been created. You can manually add students to this cohort below.": "{cohortGroupName}\u7fa4\u7ec4\u5df2\u7ecf\u521b\u5efa\uff0c\u60a8\u53ef\u4ee5\u624b\u52a8\u6dfb\u52a0\u5b66\u751f\u5230\u8fd9\u4e2a\u7fa4\u7ec4\u3002", 
<<<<<<< HEAD
    "There are invalid keywords in your email. Check the following keywords and try again.": "\u60a8\u7684\u7535\u5b50\u90ae\u4ef6\u4e2d\u6709\u65e0\u6548\u7684\u5173\u952e\u8bcd\u3002\u8bf7\u68c0\u67e5\u4ee5\u4e0b\u5173\u952e\u5b57\u5e76\u91cd\u8bd5\u3002", 
    "There are invalid keywords in your email. Please check the following keywords and try again:": "\u60a8\u7684\u7535\u5b50\u90ae\u4ef6\u4e2d\u6709\u65e0\u6548\u7684\u5173\u952e\u5b57\u3002\u8bf7\u68c0\u67e5\u4ee5\u4e0b\u5173\u952e\u5b57\u5e76\u91cd\u8bd5\uff1a", 
=======
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "There has been an error processing your survey.": "\u5728\u5904\u7406\u60a8\u7684\u8c03\u67e5\u65f6\u51fa\u73b0\u4e86\u4e00\u4e2a\u9519\u8bef\u3002", 
    "There is no email history for this course.": "\u672c\u8bfe\u7a0b\u5c1a\u65e0\u53d1\u9001\u7535\u5b50\u90ae\u4ef6\u8bb0\u5f55\u3002", 
    "There was a problem creating the report. Select \"Create Executive Summary\" to try again.": "\u521b\u5efa\u62a5\u544a\u65f6\u53d1\u751f\u95ee\u9898\uff0c\u8bf7\u9009\u62e9\u201c\u521b\u5efa\u6267\u884c\u6458\u8981\u201d\u91cd\u65b0\u5c1d\u8bd5\u3002", 
<<<<<<< HEAD
=======
    "There was an error changing the user's role": "\u66f4\u6539\u7528\u6237\u89d2\u8272\u8fc7\u7a0b\u4e2d\u51fa\u73b0\u9519\u8bef", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "There was an error obtaining email content history for this course.": "\u5b58\u5728\u80fd\u83b7\u53d6\u8be5\u8bfe\u7a0b\u90ae\u4ef6\u5185\u5bb9\u5386\u53f2\u8bb0\u5f55\u7684\u9519\u8bef", 
    "There was an error obtaining email task history for this course.": "\u83b7\u53d6\u8be5\u8bfe\u7a0b\u7684\u90ae\u4ef6\u4efb\u52a1\u5386\u53f2\u8bb0\u5f55\u65f6\u53d1\u751f\u9519\u8bef\u3002", 
    "There was an error when trying to add students:": [
      "\u5c1d\u8bd5\u6dfb\u52a0\u5b66\u751f\u65f6\u51fa\u73b0 {numErrors} \u4e2a\u9519\u8bef\uff1a"
    ], 
    "There was an error, try searching again.": "\u51fa\u9519\u4e86\uff0c\u8bf7\u5c1d\u8bd5\u91cd\u65b0\u641c\u7d20\u3002", 
    "These settings include basic information about your account. You can also specify additional information and see your linked social accounts on this page.": "\u8fd9\u4e9b\u8bbe\u7f6e\u5305\u542b\u4e86\u5173\u4e8e\u4f60\u8d26\u6237\u7684\u57fa\u672c\u4fe1\u606f\uff0c\u4f60\u4e5f\u53ef\u4ee5\u5728\u672c\u9875\u4e2d\u7ed9\u51fa\u989d\u5916\u7684\u4fe1\u606f\u5e76\u67e5\u770b\u5df2\u8fde\u63a5\u7684\u793e\u4ea4\u7f51\u7edc\u8d26\u6237\u3002", 
    "These users were not added as beta testers:": "\u8fd9\u4e9b\u7528\u6237\u672a\u6dfb\u52a0\u4e3abeta\u6d4b\u8bd5\u8005\uff1a", 
    "These users were not affiliated with the course so could not be unenrolled:": "\u8fd9\u4e9b\u7528\u6237\u5e76\u4e0d\u5c5e\u4e8e\u672c\u8bfe\u7a0b\u5b66\u5458\uff0c\u56e0\u6b64\u65e0\u6cd5\u4f7f\u5176\u653e\u5f03\u9009\u4fee\uff1a", 
    "These users were not removed as beta testers:": "\u8fd9\u4e9b\u7528\u6237\u672a\u4ecebeta\u6d4b\u8bd5\u8005\u4e2d\u5220\u9664\uff1a", 
    "These users were successfully added as beta testers:": "\u8fd9\u4e9b\u7528\u6237\u5df2\u7ecf\u6dfb\u52a0\u4e3abeta\u6d4b\u8bd5\u8005\uff1a", 
    "These users were successfully removed as beta testers:": "\u8fd9\u4e9b\u7528\u6237\u4e0d\u518d\u662fbeta\u6d4b\u8bd5\u8005\uff1a", 
    "These users will be allowed to enroll once they register:": "\u8fd9\u4e9b\u7528\u6237\u4e00\u65e6\u6ce8\u518c\u5373\u53ef\u9009\u8bfe\uff1a", 
    "These users will be enrolled once they register:": "\u8fd9\u4e9b\u7528\u6237\u6ce8\u518c\u540e\u5373\u5df2\u9009\u8bfe\uff1a", 
    "This annotation has %(count)s flag.": [
      "\u6b64\u6ce8\u91ca\u5e26\u6709 %(count)s \u4e2a\u6807\u8bb0\u3002"
    ], 
    "This browser cannot play .mp4, .ogg, or .webm files.": "\u5f53\u524d\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u64ad\u653e MP4\u3001OGG \u6216 WEBM \u683c\u5f0f\u7684\u6587\u4ef6\u3002", 
    "This comment could not be deleted. Refresh the page and try again.": "\u65e0\u6cd5\u5220\u9664\u6b64\u6ce8\u91ca\u3002\u8bf7\u5237\u65b0\u8be5\u9875\u5e76\u91cd\u8bd5\u3002", 
    "This course has automatic cohorting enabled for verified track learners, but cohorts are disabled. You must enable cohorts for the feature to work.": "\u8fd9\u95e8\u8bfe\u7a0b\u4e3a\u8981\u83b7\u53d6\u8ba4\u8bc1\u8bc1\u4e66\u7684\u5b66\u751f\u81ea\u52a8\u5206\u7ec4\uff0c\u4f46\u662f\u7fa4\u7ec4\u529f\u80fd\u88ab\u7981\u6b62\u3002\u4e3a\u4e86\u4f7f\u8be5\u529f\u80fd\u6b63\u5e38\u8fd0\u884c\uff0c\u60a8\u5fc5\u987b\u542f\u7528\u7fa4\u7ec4\u529f\u80fd\uff0c", 
    "This course has automatic cohorting enabled for verified track learners, but the required cohort does not exist. You must create a manually-assigned cohort named '{verifiedCohortName}' for the feature to work.": "\u8fd9\u95e8\u8bfe\u7a0b\u4e3a\u8981\u83b7\u53d6\u8ba4\u8bc1\u8bc1\u4e66\u7684\u5b66\u751f\u81ea\u52a8\u5206\u7ec4\uff0c\u4f46\u8981\u6c42\u7684\u7fa4\u7ec4\u4e0d\u5b58\u5728\u3002\u4e3a\u4e86\u4f7f\u8be5\u529f\u80fd\u6b63\u5e38\u8fd0\u884c\uff0c\u60a8\u5fc5\u987b\u624b\u52a8\u8bbe\u7f6e\u4e00\u4e2a\u7fa4\u7ec4\uff0c\u540d\u4e3a'{verifiedCohortName}'\u3002", 
    "This course uses automatic cohorting for verified track learners. You cannot disable cohorts, and you cannot rename the manual cohort named '{verifiedCohortName}'. To change the configuration for verified track cohorts, contact your edX partner manager.": "\u8fd9\u95e8\u8bfe\u7a0b\u4e3a\u8981\u83b7\u53d6\u8ba4\u8bc1\u8bc1\u4e66\u7684\u5b66\u751f\u81ea\u52a8\u5206\u7ec4\u3002\u60a8\u65e0\u6cd5\u53d6\u6d88\u5206\u7ec4\uff0c\u4e5f\u65e0\u6cd5\u91cd\u65b0\u547d\u540d\u624b\u52a8\u8bbe\u7f6e\u7684\u7fa4\u7ec4'{verifiedCohortName}'\u3002\u5982\u8981\u6539\u53d8\u8ba4\u8bc1\u7ec4\u7684\u5206\u7ec4\u8bbe\u7f6e\uff0c\u8bf7\u8054\u7cfb\u60a8\u7684edX \u5408\u4f5c\u7ecf\u7406\u3002", 
    "This discussion could not be loaded. Refresh the page and try again.": "\u65e0\u6cd5\u52a0\u8f7d\u6b64\u8ba8\u8bba\u3002\u8bf7\u5237\u65b0\u8be5\u9875\u5e76\u91cd\u8bd5\u3002", 
    "This image is for decorative purposes only and does not require a description.": "\u6b64\u56fe\u7247\u4ec5\u4f5c\u88c5\u9970\u7528\uff0c\u65e0\u9700\u63cf\u8ff0\u3002", 
    "This learner is currently sharing a limited profile.": "\u8be5\u5b66\u751f\u5f53\u524d\u516c\u5f00\u90e8\u5206\u4e2a\u4eba\u4fe1\u606f\u3002", 
<<<<<<< HEAD
    "This page contains information about orders that you have placed with {platform_name}.": "\u672c\u9875\u5305\u542b\u6709\u5173\u60a8\u5df2\u653e\u7f6e\u5728 {platform_name} \u4e0a\u7684\u8ba2\u5355\u7684\u4fe1\u606f\u3002", 
    "This post could not be closed. Refresh the page and try again.": "\u65e0\u6cd5\u5173\u95ed\u6b64\u5e16\u5b50\u3002\u8bf7\u5237\u65b0\u8be5\u9875\u5e76\u91cd\u8bd5\u3002", 
    "This post could not be flagged for abuse. Refresh the page and try again.": "\u8fd9\u4e2a\u5e16\u5b50\u4e0d\u80fd\u88ab\u6807\u8bb0\u4e3a\u6ee5\u7528\u3002\u8bf7\u5237\u65b0\u8be5\u9875\u5e76\u91cd\u8bd5\u3002", 
    "This post could not be pinned. Refresh the page and try again.": "\u65e0\u6cd5\u9501\u5b9a\u6b64\u5e16\u5b50\u3002\u8bf7\u5237\u65b0\u8be5\u9875\u5e76\u91cd\u8bd5\u3002", 
    "This post could not be reopened. Refresh the page and try again.": "\u65e0\u6cd5\u91cd\u65b0\u6253\u5f00\u6b64\u5e16\u5b50\u3002\u8bf7\u5237\u65b0\u8be5\u9875\u5e76\u91cd\u8bd5\u3002", 
    "This post could not be unflagged for abuse. Refresh the page and try again.": "\u8fd9\u7bc7\u6587\u7ae0\u4e0d\u80fd\u53d6\u6d88\u6807\u8bb0\u6ee5\u7528\u3002\u8bf7\u5237\u65b0\u8be5\u9875\u5e76\u91cd\u8bd5\u3002", 
    "This post could not be unpinned. Refresh the page and try again.": "\u8fd9\u7bc7\u6587\u7ae0\u4e0d\u80fd\u53d6\u6d88\u9501\u5b9a\u3002\u8bf7\u5237\u65b0\u8be5\u9875\u5e76\u91cd\u8bd5\u3002", 
=======
    "This learner will be removed from the team, allowing another learner to take the available spot.": "\u6b64\u6210\u5458\u5c06\u88ab\u79fb\u9664\uff0c\u91ca\u51fa\u540d\u989d\u540e\u5176\u4ed6\u6210\u5458\u53ef\u52a0\u5165\u3002", 
    "This link will open in a modal window": "\u8be5\u94fe\u63a5\u5c06\u5728\u4e00\u4e2a\u6a21\u5f0f\u7a97\u53e3\u4e2d\u6253\u5f00", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "This post is visible only to %(group_name)s.": "\u6b64\u5e16\u53ea\u5bf9%(group_name)s\u7ec4\u53ef\u89c1\u3002", 
    "This post is visible to everyone.": "\u6b64\u5e16\u5bf9\u6240\u6709\u4eba\u53ef\u89c1\u3002", 
    "This problem has been reset.": "\u6b64\u95ee\u9898\u5df2\u88ab\u91cd\u7f6e\u3002", 
    "This response could not be marked as an answer. Refresh the page and try again.": "\u65e0\u6cd5\u5c06\u6b64\u54cd\u5e94\u6807\u8bb0\u4e3a\u7b54\u6848\u3002\u8bf7\u5237\u65b0\u8be5\u9875\u5e76\u91cd\u8bd5\u3002", 
    "This response could not be marked as endorsed. Refresh the page and try again.": "\u65e0\u6cd5\u5c06\u6b64\u54cd\u5e94\u6807\u8bb0\u4e3a\u5df2\u6279\u51c6\u3002\u8bf7\u5237\u65b0\u8be5\u9875\u5e76\u91cd\u8bd5", 
    "This response could not be unendorsed. Refresh the page and try again.": "\u6b64\u54cd\u5e94\u65e0\u6cd5\u88ab\u51c6\u8bb8\u3002\u8bf7\u5237\u65b0\u8be5\u9875\u5e76\u91cd\u8bd5\u3002", 
    "This response could not be unmarked as an answer. Refresh the page and try again.": "\u65e0\u6cd5\u5c06\u6b64\u54cd\u5e94\u53d6\u6d88\u6807\u8bb0\u7b54\u6848\u3002\u8bf7\u5237\u65b0\u8be5\u9875\u5e76\u91cd\u8bd5\u3002", 
    "This thread is closed.": "\u8fd9\u4e2a\u5e16\u5b50\u5df2\u7ecf\u5173\u95ed\u3002", 
    "This vote could not be processed. Refresh the page and try again.": "\u65e0\u6cd5\u5904\u7406\u6b64\u9879\u6295\u7968\u3002\u8bf7\u5237\u65b0\u8be5\u9875\u5e76\u91cd\u8bd5\u3002", 
    "Time Sent": "\u53d1\u9001\u65f6\u95f4", 
    "Time Sent:": "\u53d1\u9001\u65f6\u95f4", 
    "Time Zone": "\u65f6\u533a", 
    "Timer has expired": "\u8ba1\u65f6\u5668\u5df2\u8fc7\u671f", 
    "Title": "\u6807\u9898", 
<<<<<<< HEAD
    "To receive credit for problems, you must select \"Submit\" for each problem before you select \"End My Exam\".": "\u8981\u63a5\u6536\u95ee\u9898, \u60a8\u5fc5\u987b\u5728\u9009\u62e9 \"\u7ed3\u675f\u6211\u7684\u8003\u8bd5 \" \u4e4b\u524d\u4e3a\u6bcf\u4e2a\u95ee\u9898\u9009\u62e9 \"\u63d0\u4ea4 \"\u3002", 
=======
    "To finalize course credit, %(display_name)s requires %(platform_name)s learners to submit a credit request.": "\u8981\u5b8c\u6210\u8bfe\u7a0b\u5b66\u5206\uff0c%(display_name)s \u8981\u6c42 %(platform_name)s \u5b66\u5458\u63d0\u4ea4\u4e00\u4efd\u5b66\u5206\u7533\u8bf7\u3002", 
    "To invalidate a certificate for a particular learner, add the username or email address below.": "\u8981\u8bbe\u5b9a\u67d0\u4e2a\u7279\u5b9a\u5b66\u5458\u7684\u8bc1\u4e66\u65e0\u6548\uff0c\u8bf7\u5728\u4e0b\u9762\u6dfb\u52a0\u76f8\u5e94\u7684\u7528\u6237\u540d\u6216\u7535\u5b50\u90ae\u7bb1\u5730\u5740\u3002", 
    "To receive a certificate, you must also verify your identity.": "\u8981\u83b7\u5f97\u8bc1\u4e66\uff0c\u4f60\u5fc5\u987b\u9a8c\u8bc1\u4f60\u7684\u8eab\u4efd\u3002", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "To share your certificate on Mozilla Backpack, you must first have a Backpack account. Complete the following steps to add your certificate to Backpack.": "\u8981\u5728 Mozilla Backpack \u4e0a\u5206\u4eab\u60a8\u7684\u8bc1\u4e66\uff0c\u60a8\u5fc5\u987b\u9996\u5148\u62e5\u6709\u4e00\u4e2a Backpack \u5e10\u6237\u3002\u901a\u8fc7\u5b8c\u6210\u4ee5\u4e0b\u6b65\u9aa4\u5c06\u60a8\u7684\u8bc1\u4e66\u6dfb\u52a0\u81f3 Backpack\u3002", 
    "Toggle Notifications Setting": "\u5207\u6362\u901a\u77e5\u8bbe\u7f6e", 
    "Tools": "\u5de5\u5177", 
    "Top": "\u9876\u7aef", 
<<<<<<< HEAD
    "Topic area": "\u4e3b\u9898\u533a\u57df:", 
=======
    "Topic": "\u4e3b\u9898", 
    "Topics": "\u4e3b\u9898", 
    "Total": "\u603b\u8ba1", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Transcript will be displayed when you start playing the video.": "\u5f53\u4f60\u5f00\u59cb\u64ad\u653e\u89c6\u9891\u65f6\u5c06\u663e\u793a\u5b57\u5e55\u3002", 
    "Try the transaction again in a few minutes.": "\u8bf7\u7b49\u5f85\u51e0\u5206\u949f\u540e\u518d\u5c1d\u8bd5\u3002", 
    "Try using a different browser, such as Google Chrome.": "\u8bf7\u8bd5\u7740\u66f4\u6362\u4e00\u4e2a\u6d4f\u89c8\u5668\uff0c\u5982\u8c37\u6b4c\u7684 Chrome \u6d4f\u89c8\u5668\u3002", 
    "Turn off transcripts": "\u5173\u95ed\u5b57\u5e55", 
    "Turn on closed captioning": "\u6253\u5f00CC\u5b57\u5e55", 
    "Turn on transcripts": "\u6253\u5f00\u5b57\u5e55", 
    "Type in a URL or use the \"Choose File\" button to upload a file from your machine. (e.g. 'http://example.com/img/clouds.jpg')": "\u8f93\u5165\u4e00\u4e2a\u7f51\u5740\uff0c\u6216\u6309\u4e0b\u201c\u9009\u62e9\u6587\u4ef6\u201d\u6309\u94ae\u6765\u4e0a\u4f20\u6587\u4ef6\u3002(\u4f8b\u5982'http://example.com/img/clouds.jpg')", 
    "URL": "URL", 
<<<<<<< HEAD
    "Unable to submit application": "\u65e0\u6cd5\u63d0\u4ea4\u7533\u8bf7", 
=======
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Underline": "\u4e0b\u5212\u7ebf", 
    "Undo": "\u64a4\u9500", 
    "Undo (Ctrl+Z)": "\u64a4\u9500(Ctrl+Z)", 
    "Unendorse": "\u53d6\u6d88\u652f\u6301", 
    "Unfollow": "\u53d6\u6d88\u5173\u6ce8", 
    "Unknown": "\u672a\u77e5", 
    "Unknown Error Occurred.": "\u672a\u77e5\u9519\u8bef\u3002", 
    "Unknown user: {user}": "\u672a\u77e5\u7528\u6237\uff1a {user}", 
    "Unlink This Account": "\u89e3\u7ed1\u6b64\u8d26\u6237", 
    "Unlink your {accountName} account": "\u89e3\u7ed1\u60a8\u7684{accountName}\u5e10\u6237", 
    "Unlinking": "\u89e3\u7ed1\u4e2d", 
    "Unmark as Answer": "\u53d6\u6d88\u6807\u8bb0\u7b54\u6848", 
    "Unmute": "\u53d6\u6d88\u9759\u97f3", 
    "Unpin": "\u4e0d\u505a\u5904\u7406", 
    "Unreport": "\u53d6\u6d88\u62a5\u544a", 
    "Update certificate status": "\u66f4\u65b0\u8bc1\u4e66\u72b6\u6001", 
    "Update comment": "\u66f4\u65b0\u8bc4\u8bba", 
    "Update post": "\u66f4\u65b0\u8ba8\u8bba\u5e16", 
    "Update response": "\u66f4\u65b0\u56de\u590d", 
    "Update the status of a certificate for a particular user in a particular course": "\u5728\u7279\u5b9a\u8bfe\u7a0b\u4e2d\u66f4\u65b0\u7279\u5b9a\u7528\u6237\u7684\u8bc1\u4e66\u72b6\u6001", 
    "Updating with latest library content": "\u66f4\u65b0\u6700\u65b0\u7684\u5e93\u5185\u5bb9", 
    "Upgrade Now": "\u7acb\u5373\u5347\u7ea7", 
    "Upload File": "\u4e0a\u4f20\u6587\u4ef6", 
    "Upload File and Assign Students": "\u4e0a\u4f20\u6587\u4ef6\u5e76\u4e3a\u5b66\u751f\u5206\u7ec4", 
    "Upload an image": "\u4e0a\u4f20\u56fe\u7247", 
    "Upload is in progress. To avoid errors, stay on this page until the process is complete.": "\u6b63\u5728\u4e0a\u4f20\u3002\u4e3a\u907f\u514d\u53d1\u751f\u9519\u8bef\uff0c\u5728\u4e0a\u4f20\u5b8c\u6210\u524d\u8bf7\u4e0d\u8981\u79bb\u5f00\u672c\u9875\u3002", 
    "Uploaded file issues. Click on \"+\" to view.": "\u4e0a\u4f20\u6587\u4ef6\u6709\u95ee\u9898\u3002\u70b9\u51fb \u201c+\u201d \u6765\u68c0\u89c6\u3002", 
    "Uploading": "\u4e0a\u4f20\u4e2d", 
    "Upper Alpha": "\u5927\u5199\u5b57\u6bcd", 
    "Upper Roman": "\u5927\u5199\u7f57\u9a6c\u5b57\u6bcd", 
    "Upset Learner": "\u611f\u5230\u4e0d\u6ee1\u610f\u7684\u5b66\u751f", 
    "Url": "URL", 
<<<<<<< HEAD
    "Use bookmarks to help you easily return to courseware pages. To bookmark a page, select Bookmark in the upper right corner of that page. To see a list of all your bookmarks, select Bookmarks in the upper left corner of any courseware page.": "\u4f7f\u7528\u4e66\u7b7e\u53ef\u5e2e\u52a9\u60a8\u8f7b\u677e\u8fd4\u56de\u81f3\u8bfe\u4ef6\u9875\u9762\u3002\u8981\u7ed9\u67d0\u4e2a\u9875\u9762\u6807\u8bb0\u4e66\u7b7e\uff0c\u8bf7\u9009\u62e9\u8be5\u9875\u9762\u53f3\u4e0a\u89d2\u7684\u201c\u4e66\u7b7e\u201d\u3002\u8981\u67e5\u770b\u60a8\u6240\u6709\u7684\u4e66\u7b7e\u5217\u8868\uff0c\u8bf7\u9009\u62e9\u4efb\u4f55\u8bfe\u4ef6\u9875\u9762\u5de6\u4e0a\u89d2\u7684\u201c\u4e66\u7b7e\u201d\u3002", 
=======
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Use my institution/campus credentials": "\u4f7f\u7528\u6211\u7684\u673a\u6784/\u6821\u56ed\u5e10\u53f7", 
    "Use the All Topics menu to find specific topics.": "\u4f7f\u7528 \"\u5168\u90e8\u4e3b\u9898\" \u83dc\u5355\u67e5\u627e\u7279\u5b9a\u4e3b\u9898\u3002", 
    "User": "\u7528\u6237", 
    "Username": "\u7528\u6237\u540d", 
    "Users": "\u7528\u6237", 
    "Users must create and activate their account before they can be promoted to beta tester.": "\u6210\u4e3abeta\u6d4b\u8bd5\u8005\u4e4b\u524d\uff0c\u9700\u8981\u521b\u5efa\u5e76\u6fc0\u6d3b\u8d26\u6237\u3002", 
    "V Align": "\u5782\u76f4\u5bf9\u9f50", 
    "Validation Error": "\u9a8c\u8bc1\u9519\u8bef", 
    "Verified Certificate": "\u8ba4\u8bc1\u8bc1\u4e66", 
    "Verified Certificate upgrade": "\u8ba4\u8bc1\u8bc1\u4e66\u5347\u7ea7", 
    "Vertical space": "\u5782\u76f4\u95f4\u8ddd", 
    "Very loud": "\u97f3\u91cf\u5f88\u9ad8", 
    "Very low": "\u5f88\u4f4e", 
    "Video": "\u89c6\u9891", 
    "Video Capture Error": "\u89c6\u9891\u6355\u83b7\u5931\u8d25", 
    "Video ended": "\u89c6\u9891\u7ed3\u675f", 
    "Video position": "\u89c6\u9891\u4f4d\u7f6e", 
    "Video speed: ": "\u89c6\u9891\u64ad\u653e\u901f\u5ea6:", 
    "Video transcript": "\u89c6\u9891\u5b57\u5e55", 
    "View": "\u89c6\u56fe", 
    "View Archived Course": "\u67e5\u770b\u5b58\u6863\u7684\u8bfe\u7a0b", 
    "View Certificate": "\u67e5\u770b\u5b8c\u6210\u8bc1\u660e", 
    "View Course": "\u67e5\u770b\u8bfe\u7a0b", 
    "View all errors": "\u67e5\u770b\u6240\u6709\u9519\u8bef", 
    "View discussion": "\u67e5\u770b\u8ba8\u8bba", 
    "View the list of whitelisted users for a course": "\u67e5\u770b\u8bfe\u7a0b\u7684\u5217\u5165\u4f18\u826f\u540d\u5355\u7528\u6237\u5217\u8868", 
    "View user whitelist": "\u67e5\u770b\u7528\u6237\u4f18\u826f\u540d\u5355", 
    "Viewing %s course": [
      "\u67e5\u770b %s \u4e2a\u8bfe\u7a0b"
    ], 
<<<<<<< HEAD
    "Visible to": "\u53ef\u89c1\u5230", 
=======
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Visual aids": "\u7f51\u683c\u7ebf", 
    "Volume": "\u97f3\u91cf", 
    "Vote for good posts and responses": "\u4e3a\u60a8\u559c\u6b22\u7684\u53d1\u5e16\u548c\u56de\u590d\u6295\u7968", 
    "Vote for this post,": "\u4e3a\u8be5\u5e16\u6295\u7968", 
    "Warnings": "\u8b66\u544a", 
<<<<<<< HEAD
    "We couldn't create your account.": "\u6211\u4eec\u65e0\u6cd5\u521b\u5efa\u60a8\u7684\u8d26\u6237\u3002", 
    "We couldn't find any results for \"%s\".": "\u6211\u4eec\u627e\u4e0d\u5230\u6709\u5173\u201c%s\u201d\u7684\u4efb\u4f55\u7ed3\u679c\u3002", 
    "We couldn't sign you in.": "\u767b\u5f55\u5931\u8d25\u3002", 
    "We just need a little more information before you start learning with %(platformName)s.": "\u60a8\u53ea\u9700\u518d\u591a\u63d0\u4f9b\u4e00\u70b9\u4fe1\u606f\u5c31\u53ef\u4ee5\u5f00\u59cb\u5728%(platformName)s\u5b66\u4e60\u4e86\u3002", 
=======
    "We ask you to activate your account to ensure it is really you creating the account and to prevent fraud.": "\u6211\u4eec\u8981\u6c42\u60a8\u6fc0\u6d3b\u60a8\u7684\u5e10\u53f7\u662f\u4e3a\u4e86\u786e\u8ba4\u771f\u7684\u662f\u60a8\u521b\u5efa\u4e86\u5e10\u6237\uff0c\u9632\u6b62\u6b3a\u8bc8\u3002", 
    "We couldn't find any results for \"%s\".": "\u6211\u4eec\u627e\u4e0d\u5230\u6709\u5173\u201c%s\u201d\u7684\u4efb\u4f55\u7ed3\u679c\u3002", 
    "We have received your information and are verifying your identity. You will see a message on your dashboard when the verification process is complete (usually within 1-2 days). In the meantime, you can still access all available course content.": "\u6211\u4eec\u5df2\u7ecf\u6536\u5230\u4f60\u7684\u4fe1\u606f\u5e76\u6b63\u5728\u9a8c\u8bc1\u4f60\u7684\u8eab\u4efd\u3002\u9a8c\u8bc1\u6d41\u7a0b\u7ed3\u675f\u540e(\u4e00\u822c\u5728 1-2 \u5929\u5185)\uff0c\u4f60\u5c06\u5728\u4f60\u7684\u63a7\u5236\u9762\u677f\u4e0a\u6536\u5230\u4e00\u6761\u6d88\u606f\u3002\u4e0e\u6b64\u540c\u65f6\uff0c\u4f60\u4ecd\u7136\u53ef\u4ee5\u8bbf\u95ee\u6240\u6709\u7684\u8bfe\u7a0b\u5185\u5bb9\u3002", 
    "We use the highest levels of security available to encrypt your photo and send it to our authorization service for review. Your photo and information are not saved or visible anywhere on %(platformName)s after the verification process is complete.": "\u6211\u4eec\u4f1a\u91c7\u7528\u6700\u9ad8\u7ea7\u522b\u7684\u5b89\u5168\u6280\u672f\u6765\u52a0\u5bc6\u4f60\u7684\u7167\u7247\u5e76\u53d1\u9001\u5230\u6211\u4eec\u7684\u6388\u6743\u670d\u52a1\u7528\u4e8e\u5ba1\u6838\u76ee\u7684\uff1b\u4e00\u65e6\u5b8c\u6210\u4e86\u8ba4\u8bc1\u8fc7\u7a0b\uff0c%(platformName)s\u4e0d\u4f1a\u7ee7\u7eed\u4fdd\u5b58\u8fd9\u4e9b\u7167\u7247\u548c\u4fe1\u606f\u3002", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "We weren't able to send you a password reset email.": "\u5bc6\u7801\u91cd\u7f6e\u90ae\u4ef6\u53d1\u9001\u5931\u8d25\u3002", 
    "We've encountered an error. Refresh your browser and then try again.": "\u6211\u4eec\u9047\u5230\u4e86\u4e00\u4e2a\u9519\u8bef\u3002\u8bf7\u5237\u65b0\u60a8\u7684\u6d4f\u89c8\u5668\u5e76\u91cd\u8bd5\u3002", 
    "We've sent a confirmation message to {new_email_address}. Click the link in the message to update your email address.": "\u6211\u4eec\u5df2\u4f1a\u53d1\u9001\u4e00\u4e2a\u9a8c\u8bc1\u8baf\u606f\u81f3 {new_email_address}\u3002\u70b9\u51fb\u8baf\u606f\u4e2d\u7684\u94fe\u63a5\u4ee5\u66f4\u65b0\u60a8\u7684\u7535\u5b50\u90ae\u4ef6\u4fe1\u7bb1\u3002", 
<<<<<<< HEAD
    "We've sent a message to {email_address}. Click the link in the message to reset your password.": "\u6211\u4eec\u5c06\u4f1a\u53d1\u9001\u4e00\u4e2a\u8baf\u606f\u81f3 {email_address}\u3002\u70b9\u51fb\u8baf\u606f\u4e2d\u7684\u94fe\u63a5\u4ee5\u91cd\u8bbe\u5bc6\u7801\u3002", 
=======
    "Webcam": "\u6444\u50cf\u5934", 
    "What You Need for Verification": "\u8ba4\u8bc1\u6240\u9700", 
    "What does %(platformName)s do with this photo?": "%(platformName)s\u7528\u8fd9\u5f20\u7167\u7247\u505a\u4ec0\u4e48\uff1f", 
    "What does this mean?": "\u8fd9\u662f\u4ec0\u4e48\u610f\u601d\uff1f", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "What's Your Next Accomplishment?": "\u60a8\u7684\u4e0b\u4e00\u4e2a\u76ee\u6807\u662f\u4ec0\u4e48\uff1f", 
    "When you select \"Reset Your Password\", a message will be sent to the email address for your {platform_name} account. Click the link in the message to reset your password.": "\u5f53\u60a8\u9009\u62e9 \"\u91cd\u7f6e\u5bc6\u7801 \" \u65f6, \u5c06\u4f1a\u5411 {platform_name} \u5e10\u6237\u7684\u7535\u5b50\u90ae\u4ef6\u5730\u5740\u53d1\u9001\u4e00\u6761\u6d88\u606f\u3002\u5355\u51fb\u90ae\u4ef6\u4e2d\u7684\u94fe\u63a5\u91cd\u7f6e\u5bc6\u7801\u3002", 
    "Whitelist a user": "\u4f18\u826f\u540d\u5355\u7528\u6237", 
    "Whole words": "\u5168\u5b57\u5339\u914d", 
    "Width": "\u5bbd", 
    "Words: {0}": "\u5b57\u6570\uff1a {0}", 
    "Would you like to sign in using your %(providerName)s credentials?": "\u60a8\u662f\u5426\u60f3\u4f7f\u7528 %(providerName)s \u767b\u5f55\uff1f", 
    "Year of Birth": "\u51fa\u751f\u5e74\u4efd", 
    "You are currently sharing a limited profile.": "\u60a8\u5f53\u524d\u516c\u5f00\u90e8\u5206\u4e2a\u4eba\u4fe1\u606f\u3002", 
    "You are here": "\u60a8\u5728\u8fd9\u513f", 
    "You are not enrolled in any programs yet.": "\u60a8\u8fd8\u6ca1\u6709\u6ce8\u518c\u4efb\u4f55\u7a0b\u5e8f\u3002", 
    "You are sending an email message with the subject {subject} to the following recipients.": "\u60a8\u6b63\u5728\u5411\u4e0b\u5217\u6536\u4ef6\u4eba\u53d1\u9001\u7535\u5b50\u90ae\u4ef6, \u4e3b\u9898\u4e3a \"{subjest}\"\u3002", 
    "You can use your {accountName} account to sign in to your {platformName} account.": "\u60a8\u53ef\u4ee5\u4f7f\u7528 {accountName} \u5e10\u6237\u767b\u5f55\u5230\u60a8\u7684 {platformName} \u5e10\u6237\u3002", 
    "You cannot view the course as a student or beta tester before the course release date.": "\u5728\u6b64\u8bfe\u7a0b\u516c\u5f00\u4e4b\u524d\uff0c\u60a8\u65e0\u6cd5\u4ee5\u5b66\u751f\u6216\u6d4b\u8bd5\u8005\u8eab\u4efd\u67e5\u770b\u8be5\u8bfe\u7a0b\u3002", 
    "You commented...": "\u4f60\u8bc4\u8bba\u7684\u2026", 
    "You could not be subscribed to this post. Refresh the page and try again.": "\u60a8\u65e0\u6cd5\u8ba2\u9605\u6b64\u5e16\u5b50\u3002\u8bf7\u5237\u65b0\u8be5\u9875\u5e76\u91cd\u8bd5\u3002", 
    "You could not be unsubscribed from this post. Refresh the page and try again.": "\u60a8\u65e0\u6cd5\u53d6\u6d88\u8ba2\u9605\u6b64\u5e16\u5b50\u3002\u8bf7\u5237\u65b0\u8be5\u9875\u5e76\u91cd\u8bd5\u3002", 
    "You currently have no cohorts configured": "\u60a8\u76ee\u524d\u6ca1\u6709\u5df2\u914d\u7f6e\u7684\u7fa4\u7ec4", 
    "You did not select a content group": "\u60a8\u672a\u9009\u53d6\u5185\u5bb9\u7ec4\u3002", 
    "You did not select any files to submit.": "\u60a8\u6ca1\u6709\u9009\u62e9\u8981\u63d0\u4ea4\u7684\u4efb\u4f55\u6587\u4ef6\u3002", 
    "You did not submit the required files: {requiredFiles}.": "\u60a8\u6ca1\u6709\u63d0\u4ea4\u6240\u9700\u7684\u6587\u4ef6: {requiredFiles}\u3002", 
    "You don't seem to have Flash installed. Get Flash to continue your verification.": "\u60a8\u4f3c\u4e4e\u5e76\u672a\u5b89\u88c5Flash\u8f6f\u4ef6\u3002\u4e3a\u80fd\u7ee7\u7eed\u8fdb\u884c\u8ba4\u8bc1\uff0c\u8bf7\u5b89\u88c5Flash\u3002", 
    "You don't seem to have a webcam connected.": "\u60a8\u53ef\u80fd\u6ca1\u6709\u8fde\u63a5\u4e00\u4e2a\u6444\u50cf\u5934\u3002", 
    "You have already reported this annotation.": "\u60a8\u5df2\u7ecf\u62a5\u544a\u8fc7\u4e86\u6b64\u6279\u6ce8\u3002", 
<<<<<<< HEAD
    "You have been logged out of your edX account. Click Okay to log in again now. Click Cancel to stay on this page (you must log in again to save your work).": "\u60a8\u5df2\u6ce8\u9500\u60a8\u7684 edX \u5e10\u6237\u3002\u5355\u51fb \"ok\" \u7acb\u5373\u767b\u5f55\u3002\u5355\u51fb \"\u53d6\u6d88\" \u4fdd\u7559\u5728\u6b64\u9875\u4e0a (\u5fc5\u987b\u518d\u6b21\u767b\u5f55\u624d\u80fd\u4fdd\u5b58\u60a8\u7684\u5de5\u4f5c)\u3002", 
    "You have earned certificates in %(completed_courses)s of the %(total_courses)s courses so far.": "\u5728 %(total_courses)s \u4e2a\u8bfe\u7a0b\u4e2d\uff0c\u60a8\u5230\u76ee\u524d\u4e3a\u6b62\u5df2\u83b7\u5f97 %(completed_courses)s \u4e2a\u8bfe\u7a0b\u7684\u8bc1\u4e66\u3002", 
    "You have not bookmarked any courseware pages yet.": "\u60a8\u5c1a\u672a\u5728\u4efb\u4f55\u8bfe\u4ef6\u9875\u9762\u4e0a\u6807\u8bb0\u3002", 
    "You have successfully signed into %(currentProvider)s, but your %(currentProvider)s account does not have a linked %(platformName)s account. To link your accounts, sign in now using your %(platformName)s password.": "\u60a8\u5df2\u6210\u529f\u767b\u5f55 %(currentProvider)s\uff0c\u4f46\u662f\u60a8\u7684 %(currentProvider)s \u5e10\u6237\u5c1a\u65e0\u5df2\u94fe\u63a5\u7684 %(platformName)s \u5e10\u6237\u3002\u8981\u94fe\u63a5\u5230\u60a8\u7684\u8d26\u6237\uff0c\u8bf7\u4f7f\u7528\u60a8\u7684 %(platformName)s \u5bc6\u7801\u767b\u5f55\u3002", 
=======
    "You have already verified your ID!": "\u60a8\u5df2\u7ecf\u6210\u529f\u9a8c\u8bc1\u4e86\u60a8\u7684\u8eab\u4efd\u8bc1\u4ef6\uff01", 
    "You have not created any content groups yet.": "\u60a8\u8fd8\u6ca1\u6709\u521b\u5efa\u4efb\u4f55\u5185\u5bb9\u7ec4\u3002", 
    "You have not created any group configurations yet.": "\u60a8\u8fd8\u6ca1\u6709\u521b\u5efa\u4efb\u4f55\u7ec4\u914d\u7f6e\u3002", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "You have unsaved changes are you sure you want to navigate away?": "\u6709\u672a\u4fdd\u5b58\u7684\u66f4\u6539\uff0c\u786e\u5b9a\u8981\u79bb\u5f00\u5417\uff1f", 
    "You must be over 13 to share a full profile. If you are over 13, make sure that you have specified a birth year on the {account_settings_page_link}": "13\u5c81\u4ee5\u4e0a\u7684\u7528\u6237\u624d\u80fd\u5206\u4eab\u5b8c\u6574\u8d44\u6599\u3002\u5982\u679c\u60a8\u572813\u5c81\u4ee5\u4e0a\uff0c\u8bf7\u786e\u8ba4\u5df2\u5728 {account_settings_page_link} \u9875\u9762\u4e2d\u586b\u5199\u4e86\u51fa\u751f\u5e74\u4efd\u3002", 
    "You must sign out and sign back in before your language changes take effect.": "\u8bed\u8a00\u8bbe\u7f6e\u5c06\u5728\u60a8\u91cd\u65b0\u767b\u5f55\u540e\u751f\u6548", 
    "You must specify a name for the cohort": "\u60a8\u5fc5\u987b\u4e3a\u8be5\u7fa4\u7ec4\u547d\u540d\u3002", 
    "You must specify your birth year before you can share your full profile. To specify your birth year, go to the {account_settings_page_link}": "\u60a8\u5fc5\u987b\u586b\u5199\u51fa\u751f\u5e74\u4efd\u624d\u80fd\u5206\u4eab\u5b8c\u6574\u8d44\u6599\u3002\u70b9\u51fb {account_settings_page_link} \u586b\u5199", 
<<<<<<< HEAD
    "You need a certificate in this course to be eligible for a program certificate.": "\u5728\u672c\u8bfe\u7a0b\u4e2d, \u60a8\u9700\u8981\u6709\u8d44\u683c\u83b7\u5f97\u7a0b\u5e8f\u8bc1\u4e66\u3002", 
    "You submitted {filename}; only {allowedFiles} are allowed.": "\u60a8\u63d0\u4ea4\u4e86 {filename};\u4ec5\u5141\u8bb8 {allowedFiles}\u3002", 
    "You've successfully signed into %(currentProvider)s.": "\u60a8\u5df2\u6210\u529f\u767b\u5f55%(currentProvider)s\u3002", 
    "Your browser doesn't support direct access to the clipboard. Please use the Ctrl+X/C/V keyboard shortcuts instead.": "\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u76f4\u63a5\u8bbf\u95ee\u526a\u8d34\u677f\uff0c\u8bf7\u4f7f\u7528\u5feb\u6377\u952e Ctrl+X/C/V \u4ee3\u66ff\u3002", 
    "Your changes have been saved.": "\u60a8\u6240\u4f5c\u7684\u53d8\u66f4\u5df2\u4fdd\u5b58\u3002", 
=======
    "You need a computer that has a webcam. When you receive a browser prompt, make sure that you allow access to the camera.": "\u60a8\u9700\u8981\u4e00\u4e2a\u5177\u6709\u6444\u50cf\u5934\u7684\u7535\u8111\u3002\u5f53\u60a8\u6536\u5230\u6d4f\u89c8\u5668\u5f39\u7a97\u65f6\uff0c\u786e\u4fdd\u5b83\u6709\u6743\u9650\u4f7f\u7528\u6444\u50cf\u5934\u3002", 
    "You need a driver's license, passport, or other government-issued ID that has your name and photo.": "\u60a8\u9700\u8981\u9a7e\u7167\u3001\u62a4\u7167\u6216\u8005\u5176\u4ed6\u7531\u653f\u5e9c\u7b7e\u53d1\u7684\u5e26\u6709\u60a8\u59d3\u540d\u548c\u7167\u7247\u7684\u8eab\u4efd\u8bc1\u4ef6\u3002", 
    "You need an ID with your name and photo. A driver's license, passport, or other government-issued IDs are all acceptable.": "\u60a8\u9700\u8981\u4e00\u4efd\u5e26\u6709\u60a8\u59d3\u540d\u548c\u7167\u7247\u7684\u8eab\u4efd\u8bc1\u4ef6\uff0c\u6211\u4eec\u53ef\u4ee5\u63a5\u53d7\u9a7e\u7167\u3001\u62a4\u7167\u4ee5\u53ca\u5176\u4ed6\u7531\u653f\u5e9c\u7b7e\u53d1\u7684\u8eab\u4efd\u8bc1\u4ef6\u3002", 
    "You need to activate your account before you can enroll in courses. Check your inbox for an activation email.": "\u5728\u9009\u8bfe\u4e4b\u524d\u4f60\u9700\u8981\u5148\u6fc0\u6d3b\u4f60\u7684\u8d26\u6237\uff0c\u8bf7\u68c0\u67e5\u6536\u4ef6\u7bb1\u4e2d\u7684\u6fc0\u6d3b\u90ae\u4ef6\u3002", 
    "You need to activate your account before you can enroll in courses. Check your inbox for an activation email. After you complete activation you can return and refresh this page.": "\u5728\u9009\u8bfe\u4e4b\u524d\u4f60\u9700\u8981\u5148\u6fc0\u6d3b\u4f60\u7684\u8d26\u6237\uff0c\u8bf7\u68c0\u67e5\u6536\u4ef6\u7bb1\u4e2d\u7684\u6fc0\u6d3b\u90ae\u4ef6\u3002\u5f53\u4f60\u5b8c\u6210\u6fc0\u6d3b\u540e\uff0c\u4f60\u53ef\u4ee5\u8fd4\u56de\u5e76\u5237\u65b0\u672c\u9875\u9762\u3002", 
    "You still need to visit the %(display_name)s website to complete the credit process.": "\u4f60\u4ecd\u7136\u9700\u8981\u8bbf\u95ee\u7f51\u7ad9 %(display_name)s \u4ee5\u5b8c\u6210\u83b7\u53d6\u5b66\u5206\u6d41\u7a0b\u3002", 
    "You will not receive notification for emails that bounce, so double-check your spelling.": "\u60a8\u4e0d\u4f1a\u6536\u5230\u90ae\u4ef6\u672a\u9001\u8fbe\u7684\u901a\u77e5\uff0c\u56e0\u6b64\u8bf7\u4ed4\u7ec6\u68c0\u67e5\u4ee5\u786e\u4fdd\u62fc\u5199\u65e0\u8bef\u3002", 
    "You will use your webcam to take a picture of your face and of your government-issued photo ID.": "\u4f60\u5c06\u4f7f\u7528\u4f60\u7684\u7f51\u7edc\u6444\u50cf\u5934\u62cd\u6444\u4e00\u5f20\u540c\u65f6\u663e\u793a\u4f60\u7684\u8138\u90e8\u548c\u653f\u5e9c\u7b7e\u53d1\u7684\u6709\u7167\u7247\u7684\u8eab\u4efd\u8bc1\u4ef6\u7684\u7167\u7247\u3002", 
    "You've made some changes": "\u60a8\u5df2\u66f4\u6539", 
    "You've made some changes, but there are some errors": "\u60a8\u6240\u4f5c\u53d8\u66f4\u5b58\u5728\u9519\u8bef", 
    "Your ID must be a government-issued photo ID that clearly shows your face.": "\u4f60\u7684\u8eab\u4efd\u8bc1\u4ef6\u5fc5\u987b\u662f\u653f\u5e9c\u7b7e\u53d1\u7684\u6709\u7167\u7247\u7684\u8eab\u4efd\u8bc1\u4ef6\uff0c\u5e76\u53ef\u4ee5\u6e05\u6670\u663e\u793a\u4f60\u7684\u8138\u90e8\u3002", 
    "Your browser doesn't support direct access to the clipboard. Please use the Ctrl+X/C/V keyboard shortcuts instead.": "\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u76f4\u63a5\u8bbf\u95ee\u526a\u8d34\u677f\uff0c\u8bf7\u4f7f\u7528\u5feb\u6377\u952e Ctrl+X/C/V \u4ee3\u66ff\u3002", 
    "Your changes have been saved.": "\u60a8\u6240\u4f5c\u7684\u53d8\u66f4\u5df2\u4fdd\u5b58\u3002", 
    "Your changes will not take effect until you save your progress.": "\u60a8\u6240\u4f5c\u53d8\u66f4\u5728\u4fdd\u5b58\u540e\u624d\u80fd\u751f\u6548\u3002", 
    "Your changes will not take effect until you save your progress. Take care with key and value formatting, as validation is not implemented.": "\u53d8\u66f4\u5728\u4fdd\u5b58\u4e4b\u540e\u751f\u6548\u3002\u7531\u4e8e\u7cfb\u7edf\u6682\u65f6\u4e0d\u652f\u6301\u6821\u9a8c\u529f\u80fd\uff0c\u8bf7\u4ed4\u7ec6\u68c0\u67e5\u7b56\u7565\u952e\u503c\u5bf9\u8bbe\u7f6e\u3002", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Your donation could not be submitted.": "\u60a8\u7684\u6350\u6b3e\u65e0\u6cd5\u63d0\u4ea4\u3002", 
    "Your email message was successfully queued for sending. In courses with a large number of learners, email messages to learners might take up to an hour to be sent.": "\u60a8\u7684\u7535\u5b50\u90ae\u4ef6\u5df2\u6210\u529f\u6392\u961f\u53d1\u9001\u3002\u5728\u6709\u5927\u91cf\u5b66\u4e60\u8005\u7684\u8bfe\u7a0b\u4e2d, \u7535\u5b50\u90ae\u4ef6\u7ed9\u5b66\u4e60\u8005\u53ef\u80fd\u9700\u8981\u4e00\u4e2a\u5c0f\u65f6\u7684\u65f6\u95f4\u6765\u53d1\u9001\u3002", 
    "Your file '{file}' has been uploaded. Allow a few minutes for processing.": "\u4f60\u7684\u6587\u4ef6'{file}'\u5df2\u7ecf\u4e0a\u4f20\u3002\u9700\u8981\u51e0\u5206\u949f\u65f6\u95f4\u8fdb\u884c\u5904\u7406\u3002", 
<<<<<<< HEAD
    "Your file {filename} is too large (max size: {maxSize}MB).": "\u6587\u4ef6 {filename} \u592a\u5927 (\u6700\u5927\u5927\u5c0f: {maxSize} MB)", 
=======
    "Your file could not be uploaded": "\u60a8\u7684\u6587\u4ef6\u65e0\u6cd5\u4e0a\u4f20\u3002", 
    "Your file has been deleted.": "\u60a8\u7684\u6587\u4ef6\u5df2\u7ecf\u88ab\u5220\u9664", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Your message cannot be blank.": "\u60a8\u7684\u6d88\u606f\u4e0d\u80fd\u4e3a\u7a7a\u3002", 
    "Your message must have a subject.": "\u60a8\u7684\u6d88\u606f\u5fc5\u987b\u6709\u4e00\u4e2a\u6807\u9898\u3002", 
    "Your message must have at least one target.": "\u60a8\u7684\u90ae\u4ef6\u5fc5\u987b\u81f3\u5c11\u6709\u4e00\u4e2a\u76ee\u6807\u3002", 
    "Your post will be discarded.": "\u60a8\u7684\u5e16\u5b50\u5c06\u88ab\u64a4\u9500\u3002", 
<<<<<<< HEAD
    "Your question or idea": "\u60a8\u7684\u95ee\u9898\u6216\u8bc4\u8bba", 
=======
    "Your request could not be completed. Reload the page and try again.": "\u60a8\u7684\u8bf7\u6c42\u65e0\u6cd5\u5b8c\u6210\u3002\u5237\u65b0\u9875\u9762\uff0c\u7136\u540e\u91cd\u8bd5\u3002", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "Your request could not be completed. Reload the page and try again. If the issue persists, click the Help tab to report the problem.": "\u60a8\u7684\u8bf7\u6c42\u65e0\u6cd5\u5b8c\u6210\u3002\u91cd\u65b0\u52a0\u8f7d\u9875\u9762\u5e76\u91cd\u8bd5\u3002\u5982\u679c\u95ee\u9898\u4ecd\u7136\u5b58\u5728\uff0c\u70b9\u51fb\u201c\u5e2e\u52a9\u201d\u9009\u9879\u62a5\u544a\u95ee\u9898\u3002", 
    "Your request could not be processed. Refresh the page and try again.": "\u65e0\u6cd5\u5904\u7406\u60a8\u7684\u8bf7\u6c42\u3002\u8bf7\u5237\u65b0\u8be5\u9875\u5e76\u91cd\u8bd5\u3002", 
    "Your upload of '{file}' failed.": "\u60a8\u7684\u6587\u4ef6'{file}'\u4e0a\u4f20\u5931\u8d25\u3002", 
    "Your upload of '{file}' succeeded.": "\u60a8\u7684\u6587\u4ef6'{file}'\u4e0a\u4f20\u6210\u529f\u3002", 
    "Yourself": "\u4f60\u672c\u4eba", 
    "Zoom In": "\u653e\u5927", 
    "Zoom Out": "\u7f29\u5c0f", 
    "[no tags]": "[\u65e0\u6807\u7b7e]", 
    "a day": "\u4e00\u5929", 
    "about %d hour": [
      "\u5927\u7ea6 %d \u5c0f\u65f6"
    ], 
    "about a minute": "\u5927\u7ea6\u4e00\u5206\u949f", 
    "about a month": "\u5927\u7ea6\u4e00\u4e2a\u6708", 
    "about a year": "\u5927\u7ea6\u4e00\u5e74", 
    "about an hour": "\u5927\u7ea6\u4e00\u5c0f\u65f6", 
    "anonymous": "\u533f\u540d", 
    "answer": "\u7b54\u6848", 
    "answered question": "\u5df2\u56de\u590d\u7684\u95ee\u9898", 
    "bytes": "\u5b57\u8282", 
    "correct": "\u6b63\u786e", 
    "course_id": "\u8bfe\u7a0bID", 
    "designation": "\u6307\u5b9a", 
    "discussion": "\u8ba8\u8bba", 
    "dragging": "\u62d6\u62fd", 
    "dragging out of slider": "\u62d6\u62fd\u51fa\u6ed1\u5757\u533a\u57df", 
    "dropped in slider": "\u5728\u6ed1\u5757\u4e2d\u653e\u4e0b", 
    "dropped on target": "\u5728\u76ee\u6807\u4e0a\u653e\u4e0b", 
    "e.g. 'Sky with clouds'. The description is helpful for users who cannot see the image.": "\u4f8b\u5982\u201c\u5929\u7a7a\u6709\u4e91\u201d\u3002\u8be5\u63cf\u8ff0\u5bf9\u4e8e\u65e0\u6cd5\u770b\u89c1\u56fe\u7247\u7684\u4f7f\u7528\u8005\u662f\u6709\u5e2e\u52a9\u7684\u3002", 
    "e.g. 'google'": "\u4f8b\u5982'google'", 
<<<<<<< HEAD
    "e.g. 'http://google.com'": "e.g. 'http://google.com'", 
=======
    "e.g. johndoe@example.com, JaneDoe, joeydoe@example.com": "\u4f8b\u5982\uff1ajohndoe@example.com, JaneDoe, joeydoe@example.com", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "emphasized text": "\u5f3a\u8c03\u6587\u5b57", 
    "endorsed %(time_ago)s": "%(time_ago)s\u524d\u83b7\u5f97\u652f\u6301", 
    "endorsed %(time_ago)s by %(user)s": "%(time_ago)s\u83b7\u5f97%(user)s\u7684\u652f\u6301", 
    "enrolled": "\u5df2\u9009\u4fee", 
    "enter code here": "\u6b64\u5904\u8f93\u5165\u4ee3\u7801", 
    "enter link description here": "\u6b64\u5904\u8f93\u5165\u94fe\u63a5\u7684\u63cf\u8ff0", 
    "follow this post": "\u5173\u6ce8\u8fd9\u4e2a\u5e16\u5b50", 
    "grade": "\u7ea7", 
    "image omitted": "\u56fe\u50cf\u88ab\u7701\u7565", 
    "incorrect": "\u4e0d\u6b63\u786e", 
    "less than a minute": "\u5c11\u4e8e\u4e00\u5206\u949f", 
<<<<<<< HEAD
    "marked as answer %(time_ago)s": "%(time_ago)s\u88ab\u6807\u8bb0\u4e3a\u7b54\u6848 ", 
    "marked as answer %(time_ago)s by %(user)s": "%(time_ago)s\u88ab%(user)s\u6807\u8bb0\u4e3a\u7b54\u6848", 
    "not enrolled": "\u672a\u9009\u8bfe", 
=======
    "marked as answer %(time_ago)s": "%(time_ago)s\u524d\u88ab\u6807\u8bb0\u4e3a\u7b54\u6848 ", 
    "marked as answer %(time_ago)s by %(user)s": "%(time_ago)s \u524d\u88ab%(user)s\u6807\u8bb0\u4e3a\u7b54\u6848", 
    "name": "\u540d\u79f0", 
>>>>>>> f9fa460a74446b533b356e754848af6f56c141a1
    "off": "\u5173\u95ed", 
    "on": "\u5f00\u542f", 
    "or": "\u6216\u8005", 
    "or create a new one here": "\u6216\u5728\u6b64\u521b\u5efa\u4e00\u4e2a\u65b0\u8d26\u6237", 
    "or sign in with": "\u6216\u8005\u901a\u8fc7\u4ee5\u4e0b\u65b9\u5f0f\u767b\u5f55", 
    "post anonymously": "\u533f\u540d\u53d1\u5e16", 
    "post anonymously to classmates": "\u5411\u540c\u5b66\u533f\u540d\u53d1\u5e16", 
    "posted %(time_ago)s by %(author)s": "%(author)s\u5728%(time_ago)s\u524d\u53d1\u8868", 
    "status (defaults to `unavailable`)": "\u72b6\u6001 (\u9ed8\u8ba4\u4e3a \"\u4e0d\u53ef\u7528\")", 
    "strong text": "\u52a0\u7c97\u6587\u5b57", 
    "template": "\u6a21\u677f", 
    "there is currently {numVotes} vote": [
      "\u5f53\u524d\u6709 {numVotes} \u4e2a\u9009\u7968"
    ], 
    "timed": "\u5b9a\u65f6", 
    "unanswered question": "\u5f85\u56de\u590d\u7684\u95ee\u9898", 
    "unsubmitted": "\u672a\u63d0\u4ea4", 
    "username": "\u7528\u6237\u540d", 
    "username or email": "\u7528\u6237\u540d\u79f0/\u7535\u5b50\u90ae\u4ef6", 
    "{label}: {status}": "{label}: {status}", 
    "{numMoved} student was removed from {oldCohort}": [
      "{numMoved} \u5b66\u751f\u5df2\u88ab\u79fb\u51fa {oldCohort}"
    ], 
    "{numPresent} student was already in the cohort": [
      "{numPresent} \u4e2a\u5b66\u751f\u5df2\u5728\u6b64\u961f\u5217"
    ], 
    "{numResponses} other response": [
      "{numResponses} \u5176\u4ed6\u54cd\u5e94"
    ], 
    "{numResponses} response": [
      "{numResponses} \u54cd\u5e94"
    ], 
    "{numUsersAdded} student has been added to this cohort": [
      "{numUsersAdded} \u4e2a\u5b66\u751f\u5df2\u6dfb\u52a0\u81f3\u6b64\u961f\u5217"
    ], 
    "{numVotes} Vote": [
      " {numVotes} \u4e2a\u9009\u7968"
    ], 
    "{organization}\\'s logo": "{organization}\\'s \u7684\u6807\u8bc6", 
    "{paragraphStart}You entered {boldStart}{email}{boldEnd}. If this email address is associated with your {platform_name} account, we will send a message with password reset instructions to this email address.{paragraphEnd}{paragraphStart}If you do not receive a password reset message, verify that you entered the correct email address, or check your spam folder.{paragraphEnd}{paragraphStart}If you need further assistance, {anchorStart}contact technical support{anchorEnd}.{paragraphEnd}": "{paragraphStart}\u60a8\u8f93\u5165\u4e86 {boldStart} {\u7535\u5b50\u90ae\u4ef6} {boldEnd}\u3002\u5982\u679c\u6b64\u7535\u5b50\u90ae\u4ef6\u5730\u5740\u4e0e\u60a8\u7684 {platform_name} \u5e10\u6237\u76f8\u5173\u8054, \u6211\u4eec\u5c06\u5411\u6b64\u7535\u5b50\u90ae\u4ef6\u5730\u5740\u53d1\u9001\u5e26\u6709\u5bc6\u7801\u91cd\u8bbe\u6307\u4ee4\u7684\u90ae\u4ef6\u3002{paragraphEnd}{paragraphStart}\u5982\u679c\u60a8\u6ca1\u6709\u6536\u5230\u5bc6\u7801\u91cd\u8bbe\u90ae\u4ef6, \u8bf7\u786e\u8ba4\u60a8\u8f93\u5165\u7684\u662f\u6b63\u786e\u7684\u7535\u5b50\u90ae\u4ef6\u5730\u5740, \u6216\u8005\u68c0\u67e5\u60a8\u7684\u5783\u573e\u90ae\u4ef6\u6587\u4ef6\u5939\u3002{paragraphEnd}{paragraphStart}\u5982\u679c\u9700\u8981\u8fdb\u4e00\u6b65\u7684\u5e2e\u52a9, {anchorStart} \u8bf7\u8054\u7cfb\u6280\u672f\u652f\u6301 {anchorEnd}\u3002{paragraphEnd}", 
    "{platform_name} learners can see my:": "\u5bf9{platform_name}\u7528\u6237\u53ef\u89c1\uff1a", 
    "{unread_comments_count} new": "{unread_comments_count} \u65b0\u7684", 
    "\u2026": "\u2026"
  };

  django.gettext = function (msgid) {
    var value = django.catalog[msgid];
    if (typeof(value) == 'undefined') {
      return msgid;
    } else {
      return (typeof(value) == 'string') ? value : value[0];
    }
  };

  django.ngettext = function (singular, plural, count) {
    var value = django.catalog[singular];
    if (typeof(value) == 'undefined') {
      return (count == 1) ? singular : plural;
    } else {
      return value[django.pluralidx(count)];
    }
  };

  django.gettext_noop = function (msgid) { return msgid; };

  django.pgettext = function (context, msgid) {
    var value = django.gettext(context + '\x04' + msgid);
    if (value.indexOf('\x04') != -1) {
      value = msgid;
    }
    return value;
  };

  django.npgettext = function (context, singular, plural, count) {
    var value = django.ngettext(context + '\x04' + singular, context + '\x04' + plural, count);
    if (value.indexOf('\x04') != -1) {
      value = django.ngettext(singular, plural, count);
    }
    return value;
  };
  

  django.interpolate = function (fmt, obj, named) {
    if (named) {
      return fmt.replace(/%\(\w+\)s/g, function(match){return String(obj[match.slice(2,-2)])});
    } else {
      return fmt.replace(/%s/g, function(match){return String(obj.shift())});
    }
  };


  /* formatting library */

  django.formats = {
    "DATETIME_FORMAT": "Y\u5e74n\u6708j\u65e5 H:i", 
    "DATETIME_INPUT_FORMATS": [
      "%Y/%m/%d %H:%M", 
      "%Y-%m-%d %H:%M", 
      "%Y\u5e74%n\u6708%j\u65e5 %H:%M", 
      "%Y/%m/%d %H:%M:%S", 
      "%Y-%m-%d %H:%M:%S", 
      "%Y\u5e74%n\u6708%j\u65e5 %H:%M:%S", 
      "%Y/%m/%d %H:%M:%S.%f", 
      "%Y-%m-%d %H:%M:%S.%f", 
      "%Y\u5e74%n\u6708%j\u65e5 %H:%n:%S.%f", 
      "%Y-%m-%d"
    ], 
    "DATE_FORMAT": "Y\u5e74n\u6708j\u65e5", 
    "DATE_INPUT_FORMATS": [
      "%Y/%m/%d", 
      "%Y-%m-%d", 
      "%Y\u5e74%n\u6708%j\u65e5"
    ], 
    "DECIMAL_SEPARATOR": ".", 
    "FIRST_DAY_OF_WEEK": "1", 
    "MONTH_DAY_FORMAT": "m\u6708j\u65e5", 
    "NUMBER_GROUPING": "4", 
    "SHORT_DATETIME_FORMAT": "Y\u5e74n\u6708j\u65e5 H:i", 
    "SHORT_DATE_FORMAT": "Y\u5e74n\u6708j\u65e5", 
    "THOUSAND_SEPARATOR": "", 
    "TIME_FORMAT": "H:i", 
    "TIME_INPUT_FORMATS": [
      "%H:%M", 
      "%H:%M:%S", 
      "%H:%M:%S.%f"
    ], 
    "YEAR_MONTH_FORMAT": "Y\u5e74n\u6708"
  };

  django.get_format = function (format_type) {
    var value = django.formats[format_type];
    if (typeof(value) == 'undefined') {
      return format_type;
    } else {
      return value;
    }
  };

  /* add to global namespace */
  globals.pluralidx = django.pluralidx;
  globals.gettext = django.gettext;
  globals.ngettext = django.ngettext;
  globals.gettext_noop = django.gettext_noop;
  globals.pgettext = django.pgettext;
  globals.npgettext = django.npgettext;
  globals.interpolate = django.interpolate;
  globals.get_format = django.get_format;

}(this));

