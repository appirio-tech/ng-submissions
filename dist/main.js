(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-ui-components', 'appirio-tech-ng-auth', 'appirio-tech-ng-optimist'];

  angular.module('appirio-tech-submissions', dependencies);

}).call(this);

angular.module("appirio-tech-submissions").run(["$templateCache", function($templateCache) {$templateCache.put("views/file-detail-slide-container.directive.html","<file-detail-slide ng-if=vm.hasSubmission files=vm.files starting-file=vm.startingFile submitter-avatar={{vm.sumbitterAvatar}} submitter-handle={{vm.submitterHandle}} user-type={{vm.userType}} status={{vm.status}} messages=vm.messages on-file-change=vm.onFileChange(file) toggle-comments=vm.toggleComments() send-message=vm.sendMessage() show-messages=vm.showMessages can-comment={{vm.canComment}} new-message=vm.newMessage></file-detail-slide>");
$templateCache.put("views/file-detail-slide.directive.html","<image-viewer-header ng-if=vm.file avatar={{vm.submitterAvatar}} handle={{vm.submitterHandle}} toggle-comments=vm.toggleComments() download-url=vm.file.url download-allowed=download-allowed comments-allowed=comments-allowed></image-viewer-header><image-slide-viewer on-file-change=vm.onFileChange(file) files=vm.files starting-file=vm.startingFile show-notifications=show-notifications></image-slide-viewer><div ng-class=\"{active: vm.showMessages}\" flush-height=flush-height class=\"image-slide-viewer-messaging flex column\"><div class=title><h4>Feedback</h4><hr></div><div class=\"messages flex-grow flex-shrink\"><ul><li ng-if=\"vm.userType == \'customer\'\"><p ng-if=\"vm.messages.length == 0 &amp;&amp; vm.status != \'CLOSED\'\">Please provide feedback here to the community member and the copilot about this image. Your feedback will be visible to all members who have submitted, but only the copilot and the submitter of this image will be allowed to respond.</p><p ng-if=\"vm.status == \'CLOSED\'\">You can no longer add feedback here. If you have additional feedback, please <a>message your copilot directly.</a></p></li><li ng-if=\"vm.userType == \'copilot\'\"><p ng-if=\"vm.messages.length == 0 &amp;&amp; vm.status != \'CLOSED\'\">Please provide feedback here to the community member and the copilot about this image. Your feedback will be visible to all members who have submitted, but only the copilot and the submitter of this image will be allowed to respond.</p><p ng-if=\"vm.status == \'CLOSED\'\">You can no longer add feedback here. If you have additional feedback, please <a>message your copilot directly.</a></p></li><li ng-if=\"vm.userType == \'member\'\"><p ng-if=\"vm.messages.length == 0 &amp;&amp; vm.status != \'CLOSED\'\">Use this space to respond to customer feedback and provide context for your designs. Only you, the copilot, and the customer can add comments, but these comments will be visible to everyone who has submitted.</p><p ng-if=\"vm.status == \'CLOSED\'\">You can no longer add comments here. If you have any questions or comments for your customer, please contact your copilot via the forum.</p></li><li ng-repeat=\"message in vm.messages track by $index\"><header class=\"flex middle\"><a href={{vm.generateProfileUrl(message.publisher.handle)}} target=_blank><avatar avatar-url=\"{{ message.publisher.avatar }}\"></avatar></a><a href={{vm.generateProfileUrl(message.publisher.handle)}} target=_blank><div class=name>{{ message.publisher.handle }}</div></a><time>{{ message.createdAt | timeLapse }}</time></header><p class=message>{{ message.body }}</p></li></ul></div><div class=send><form ng-submit=vm.sendMessage() ng-if=\"vm.status != \'CLOSED\' &amp;&amp; vm.canComment\"><textarea placeholder=\"Send a message…\" ng-model=vm.newMessage></textarea><button type=submit class=enter>Enter</button></form></div></div>");
$templateCache.put("views/file-detail.directive.html","<file-detail-slide-container project-id={{vm.projectId}} step-id={{vm.stepId}} submission-id={{vm.submissionId}} file-id={{vm.fileId}} user-type={{vm.userType}}></file-detail-slide-container>");
$templateCache.put("views/file-grid.directive.html","<ul class=files><li ng-repeat=\"file in files track by $index\"><div class=spacer><a href=\"{{ file.detailUrl }}\" style=\"background-image: url({{ file.url }})\"></a></div></li></ul>");
$templateCache.put("views/file-row.directive.html","<ul class=\"files flex\"><li ng-repeat=\"file in vm.files track by $index\" class=flex-one><a href=\"{{ file.detailUrl }}\"><img ng-src=\"{{ file.url }}\"></a><div ng-if=file.isLast class=view-all-bg><div></div></div><a ng-if=file.isLast href=\"{{ viewAllUrl }}\" class=view-more><p class=\"flex middle center\"><span ng-if=vm.viewAll>View All</span><span ng-if=vm.viewMore>+{{ vm.more }} More</span></p></a><div class=\"pop-over elevated\"><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: submission.id, fileId: file.id})\" class=preview><img ng-src=\"{{ file.url }}\" class=previewImage></a><a href=\"{{ file.detailUrl }}\"><div class=\"icon envelope\"></div></a><a href=\"{{ file.url }}\" target=_blank><div class=\"clean icon download\"></div></a></div></li></ul>");
$templateCache.put("views/final-development.directive.html","<submissions-header text=\"final development\" next=http://www.google.com prev=http://www.google.com></submissions-header><hr><main class=light-bg><div class=message><p>Co-Pilot Message</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></div><image-row thumbnails=vm.thumbnails view-all-text=\"+3 more\" view-all=http://www.google.com></image-row></main><div class=links><p>Clickable Prototype</p><ul><li><a href=http://www.google.com>http://www.google.com</a></li><li><a href=http://www.google.com>http://www.google.com</a></li></ul></div><div class=links><p>Other Links</p><ul><li><a href=http://www.google.com>http://www.google.com</a></li><li><a href=http://www.google.com>http://www.google.com</a></li></ul></div><loader ng-show=!vm.loaded></loader>");
$templateCache.put("views/rank-dropdown.directive.html","<dropdown ng-if=!vm.locked options=vm.ranks on-change=vm.handleRankSelect value=vm.rank.value clearable=false></dropdown><p ng-if=\"vm.locked &amp;&amp; vm.rank.label\" class=rank>{{ vm.rank.label }}</p>");
$templateCache.put("views/rank-list.directive.html","<div ng-if=!vm.showWinners><ul ng-if=!vm.locked class=top-selection><li ng-repeat=\"rank in vm.ranks track by $index\"><div ng-class=\"{ \'has-user\': rank.id }\" ondragenter=\"return false\" ondragover=\"return false\" on-drop=\"vm.drop.handle(event, rank.value)\" class=shell><div ng-if=rank.id data-id=\"{{ rank.id }}\" draggable><avatar avatar-url=\"{{ rank.avatarUrl }}\"></avatar><div class=rank>{{ rank.value }}</div></div><div ng-if=!rank.id class=rank>{{ rank.value }}</div></div></li><li ng-show=vm.confirm><button ng-click=vm.confirmRanks() class=action>Confirm your selections</button></li></ul><ul ng-if=vm.locked class=top-selection><li ng-repeat=\"rank in vm.ranks track by $index\"><div ng-class=\"{ \'has-user\': rank.id }\" class=shell><div ng-if=rank.id data-id=\"{{ rank.id }}\"><avatar avatar-url=\"{{ rank.avatarUrl }}\"></avatar><div class=rank>{{ rank.value }}</div></div><div ng-if=!rank.id class=rank>{{ rank.value }}</div></div></li></ul></div><div ng-if=vm.showWinners><submission-winners project-id=\"{{ vm.projectId }}\" step-id=\"{{ vm.stepId }}\"></submission-winners></div>");
$templateCache.put("views/submission-countdown.directive.html","<main class=\"light-bg elevated-bottom\"><img src=/images/clock.svg><countdown end=\"{{ end }}\" class=block></countdown><p>{{ text }}</p></main>");
$templateCache.put("views/submission-detail.directive.html","<loader ng-hide=vm.loaded></loader><div class=all-submissions><a ui-sref=\"step({projectId: vm.projectId, stepId: vm.stepId})\">All Submissions</a></div><ul class=\"header flex middle\"><li class=\"flex-grow submitter\"><avatar avatar-url=\"{{ vm.submission.submitter.avatar }}\"></avatar><div class=name>{{ vm.submission.submitter.handle }}</div></li><li><rank-dropdown project-id=\"{{ vm.projectId }}\" step-id=\"{{ vm.stepId }}\" submission-id=\"{{ vm.submissionId }}\" user-type=\"{{ vm.userType }}\"></rank-dropdown></li><li class=download><a href=\"{{ vm.submission.downloadUrl }}\" target=_blank><div class=\"icon download small\"></div></a></li></ul><hr><file-grid files=vm.submission.files></file-grid>");
$templateCache.put("views/submission-list.directive.html","<p class=total-count>{{ vm.fileCount }} submissions</p><hr class=total-count><ul ng-if=\"vm.statusValue &gt; 3\" class=\"submissions new\"><li ng-repeat=\"submission in vm.submissions\" data-id=\"{{ submission.id }}\" ng-class=\"{ \'belongs-to-user\': submission.belongsToUser }\" draggable class=submission><ul class=\"user-details flex middle space-between\"><li class=\"flex middle\"><a href={{vm.generateProfileUrl(submission.submitter.handle)}} target=_blank><avatar avatar-url=\"{{ submission.submitter.avatar }}\"></avatar></a><div class=name-time><a href={{vm.generateProfileUrl(submission.submitter.handle)}} target=_blank><div class=name>{{ submission.submitter.handle }} <span ng-if=submission.belongsToUser>(Me)</span></div></a><p class=secondary>{{ submission.files.length }} Images</p></div></li><li><ul class=\"flex middle actions\"><li><a href=\"{{ submission.downloadUrl }}\" target=_blank><div class=\"icon download small\"></div></a></li><li><rank-dropdown project-id=\"{{ vm.projectId }}\" step-id=\"{{ vm.stepId }}\" submission-id=\"{{ submission.id }}\" user-type=\"{{ vm.userType }}\"></rank-dropdown></li></ul></li></ul><file-row files=submission.files view-all-url=\"{{ submission.detailUrl }}\" limit=5></file-row></li></ul>");
$templateCache.put("views/submission-winner-card.directive.html","<header class=\"flex column middle\"><a href=\"{{ \'https://www.topcoder.com/members/\' + nameText}}\" target=_blank><avatar avatar-url=\"{{ avatarUrl }}\"></avatar></a><a href=\"{{\'https://www.topcoder.com/members/\' + nameText}}\" target=_blank><h6 class=name>{{ nameText }}<span ng-if=belongsToUser>(Me)</span></h6></a><p class=secondary>Project Contributor</p></header><hr><footer class=\"flex column middle center\"><div ng-if=rank class=rank>{{ rank }}</div><div ng-if=rank class=place>place</div><div ng-if=!rank class=winner>winner!</div></footer>");
$templateCache.put("views/submission-winners.directive.html","<ul class=\"submission-winner-cards flex wrap\"><li fitted-width=fitted-width ng-repeat=\"rank in vm.ranks\"><submission-winner-card name-text=\"{{ rank.handle }}\" avatar-url=\"{{ rank.avatarUrl }}\" rank=\"{{ rank.label }}\" belongstouser=\"{{ rank.belongsToUser }}\" class=\"light-bg elevated-bottom\"></submission-winner-card></li></ul>");
$templateCache.put("views/submissions-header.directive.html","<ul class=\"header flex center middle\"><li class=previous><a ng-class=\"{ invisible: !vm.prev }\" ui-sref=\"step({projectId: vm.projectId, stepId: vm.prev})\"><div class=\"icon arrow\"></div></a></li><li><h1>{{ vm.title }}</h1></li><li class=next><a ng-class=\"{ invisible: !vm.next }\" ui-sref=\"step({projectId: vm.projectId, stepId: vm.next})\"><div class=\"icon arrow right\"></div></a></li></ul>");
$templateCache.put("views/submissions.directive.html","<loader ng-hide=vm.loaded></loader><submissions-header project-id=\"{{ vm.projectId }}\" step-id=\"{{ vm.stepId }}\"></submissions-header><div class=byline><div ng-if=\"vm.userType == \'customer\' &amp;&amp; vm.status == \'PLACEHOLDER\'\"><p>Work on your project hasn’t started yet. Once the initial designs are ready, you will see them here.</p></div><div ng-if=\"vm.userType == \'customer\' &amp;&amp; vm.status == \'SCHEDULED\'\"><p>Work on this phase will start in approximately <strong><countdown end=\"{{ vm.startsAt }}\"></countdown></strong>. Once the initial designs are ready, you will see them here.</p><submission-countdown end=\"{{ vm.startsAt }}\" text=\"Work starts on {{ vm.title }} submissions\"></submission-countdown></div><div ng-if=\"vm.userType == \'customer\' &amp;&amp; vm.status == \'OPEN\'\"><p>No submissions yet, but the countdown has started. {{ vm.title }} submissions will arrive in roughly <strong><countdown end=\"{{ vm.submissionsDueBy }}\"></countdown></strong>.</p><p>Once the submissions arrive, you will be notified by email and on your timeline. You will have 7 days to provide feedback and choose the winners for this phase.</p><submission-countdown end=\"{{ vm.submissionsDueBy }}\" text=\"Receive {{ vm.title }} submissions\"></submission-countdown></div><div ng-if=\"vm.userType == \'customer\' &amp;&amp; vm.status == \'OPEN_LATE\'\"><p>There has been a delay in receiving the submissions. Your co-pilot will reach out to you to provide more details.</p></div><div ng-if=\"vm.userType == \'customer\' &amp;&amp; vm.status == \'REVIEWING\'\"><p>Please provide feedback and select the top {{ vm.numberOfRanks }} submissions within <strong><countdown end={{vm.endsAt}}></countdown></strong>. Your feedback will be visible to the copilot and all members who have submitted to help them improve their initial concepts.</p><p ng-show=vm.showConfirm>Please provide feedback and select the top 3 submissions within the next X days. Your feedback will be visible to the copilot as well as all members to help them improve their initial concepts.</p></div><div ng-if=\"vm.userType == \'customer\' &amp;&amp; vm.status == \'REVIEWING_LATE\'\"><p>There has been a delay in your schedule as we need your feedback to move to the next phase of the progress. Please select the winners and provide feedback as soon as possible.</p><p ng-show=vm.showConfirm>We need your feedback to move to the next phase. Please select winners and confirm. You will not be able to change this once you confirm.</p></div><div ng-if=\"vm.userType == \'customer\' &amp;&amp; vm.status == \'CLOSED\'\"><p>These are your winners. You can still review submissions, but can no longer provide feedback. If you have any more comments, please message your copilot. The next phase begins in <strong><countdown end=\"{{ vm.nextStepStartsAt }}\"></countdown></strong>.</p></div><div ng-if=\"vm.userType == \'copilot\' &amp;&amp; vm.status == \'PLACEHOLDER\'\"><p>There are no submissions because the project work hasn’t started. Once the initial designs are ready, you will see them here.</p><p>(If the project work has started, you shouldn’t be seeing this message. Please contact an administrator to report the issue.)</p></div><div ng-if=\"vm.userType == \'copilot\' &amp;&amp; vm.status == \'SCHEDULED\'\"><p>Work on this phase will start in approximately <strong><countdown end=\"{{ vm.startsAt }}\"></countdown></strong>. Once the initial designs are ready, you will see them here.</p><p>(If the project work has started, you shouldn\'t be seeing this message. Please contact an administrator to report the issue.)</p><submission-countdown end=\"{{ vm.startsAt }}\" text=\"Work starts on {{ vm.title }} submissions\"></submission-countdown></div><div ng-if=\"vm.userType == \'copilot\' &amp;&amp; vm.status == \'OPEN\'\"><p>No submissions yet. {{ vm.title }} submissions will arrive in roughly <strong><countdown end={{vm.submissionsDueBy}}></countdown></strong>.</p><p>If the time estimate above is incorrect or there has been a delay, please update it using the \"Work Steps\" page.</p><submission-countdown end=\"{{ vm.submissionsDueBy }}\" text=\"Receive {{ vm.title }} submissions\"></submission-countdown></div><div ng-if=\"vm.userType == \'copilot\' &amp;&amp; vm.status == \'OPEN_LATE\'\"><p>There has been a delay in receiving the submissions. Please inform an administrator immediately.</p></div><div ng-if=\"vm.userType == \'copilot\' &amp;&amp; vm.status == \'REVIEWING\'\"><p>Please help facilitate collaboration between customers and community members by providing clarifications and answering questions.</p></div><div ng-if=\"vm.userType == \'copilot\' &amp;&amp; vm.status == \'REVIEWING_LATE\'\"><p>Please inform an administrator and reach out to the customer to remind them to provide feedback.</p></div><div ng-if=\"vm.userType == \'copilot\' &amp;&amp; vm.status == \'CLOSED\'\"><p ng-if=vm.nextStepStartsAt>The next phase begins in <strong><countdown end=\"{{ vm.nextStepStartsAt }}\"></countdown></strong>.</p></div><div ng-if=\"vm.userType == \'member\' &amp;&amp; vm.statusValue &lt; 4\"><p>Once you submit your designs, they will show up here.</p></div><div ng-if=\"vm.userType == \'member\' &amp;&amp; (vm.status == \'REVIEWING\' || vm.status == \'REVIEWING_LATE\')\"><p>Browse other members\' submissions and respond to comments from the customer or copilot on your submissions. The next phase begins in <strong>countdown(end=\'{{ vm.nextStepStartsAt }}\')</strong>.</p></div><div ng-if=\"vm.userType == \'member\' &amp;&amp; vm.status == \'CLOSED\'\"><p ng-if=vm.userRank>Congratulations, you came in <strong>{{ vm.userRank }}</strong>! Please incorporate the customer feedback and submit in the final round.</p><p ng-if=!vm.userRank>Unfortunately you did not win in this round, but you can still submit and win in the final round. Review the winning designs and the customer feedback and give it another shot!</p></div></div><rank-list ng-if=\"vm.statusValue &gt; 3 &amp;&amp; (vm.stepType == \'designConcepts\' || vm.stepType == \'completeDesigns\')\" project-id=\"{{ vm.projectId }}\" step-id=\"{{ vm.stepId }}\" user-type=\"{{ vm.userType }}\"></rank-list><submission-list ng-if=\"vm.statusValue &gt; 3 &amp;&amp; (vm.stepType == \'designConcepts\' || vm.stepType == \'completeDesigns\')\" project-id=\"{{ vm.projectId }}\" step-id=\"{{ vm.stepId }}\" user-type=\"{{ vm.userType }}\"></submission-list><file-grid ng-if=\"vm.statusValue &gt; 3 &amp;&amp; vm.stepType == \'finalFixes\'\" thumbnails=vm.submissions[0].files></file-grid>");}]);
(function() {
  'use strict';
  var SubmissionsController;

  SubmissionsController = function($scope, DataService, StepSubmissionsService, RankListService, UserV3Service) {
    var activate, highestRank, ref, render, userId, vm;
    vm = this;
    vm.loaded = false;
    vm.status = 'PLACEHOLDER';
    vm.statusValue = 0;
    vm.projectId = $scope.projectId;
    vm.stepId = $scope.stepId;
    vm.userType = $scope.userType;
    userId = (ref = UserV3Service.getCurrentUser()) != null ? ref.id : void 0;
    activate = function() {
      if (vm.stepId) {
        return DataService.subscribe($scope, render, [[StepSubmissionsService, 'get', vm.projectId, vm.stepId], [RankListService, 'get', vm.projectId, vm.stepId]]);
      } else {
        return vm.loaded = true;
      }
    };
    render = function(step, rankList) {
      vm.loaded = true;
      vm.title = step.title;
      vm.startsAt = step.startsAt;
      vm.endsAt = step.endsAt;
      vm.nextStepStartsAt = step.nextStepStartsAt;
      vm.submissionsDueBy = step.details.submissionsDueBy;
      vm.status = step.status;
      vm.statusValue = step.statusValue;
      vm.stepType = step.stepType;
      vm.submissions = step.submissions;
      vm.numberOfRanks = rankList.length;
      vm.userRank = highestRank(rankList, userId);
      return vm.showConfirm = rankList.allFull && !rankList.confirmed;
    };
    highestRank = function(rankList, userId) {
      var i, j, ref1;
      for (i = j = 0, ref1 = rankList.length; j < ref1; i = j += 1) {
        if (rankList[i].id === userId) {
          return rankList[i].label;
        }
      }
    };
    activate();
    return vm;
  };

  SubmissionsController.$inject = ['$scope', 'DataService', 'StepSubmissionsService', 'RankListService', 'UserV3Service'];

  angular.module('appirio-tech-submissions').controller('SubmissionsController', SubmissionsController);

}).call(this);

(function() {
  'use strict';
  var SubmissionDetailController;

  SubmissionDetailController = function($scope, DataService, StepSubmissionsService) {
    var activate, render, vm;
    vm = this;
    vm.loaded = false;
    vm.submission = {};
    vm.projectId = $scope.projectId;
    vm.stepId = $scope.stepId;
    vm.submissionId = $scope.submissionId;
    vm.userType = $scope.userType;
    vm.generateProfileUrl = function(handle) {
      return "https://www.topcoder.com/members/" + handle;
    };
    activate = function() {
      return DataService.subscribe($scope, render, [StepSubmissionsService, 'get', vm.projectId, vm.stepId]);
    };
    render = function(step) {
      vm.loaded = true;
      vm.submission = step.submissions.filter(function(submission) {
        return submission.id === vm.submissionId;
      })[0];
      return vm.stepType = step.stepType;
    };
    activate();
    return vm;
  };

  SubmissionDetailController.$inject = ['$scope', 'DataService', 'StepSubmissionsService'];

  angular.module('appirio-tech-submissions').controller('SubmissionDetailController', SubmissionDetailController);

}).call(this);

(function() {
  'use strict';
  var RankListController;

  RankListController = function($scope, StepsService, RankListService, DataService) {
    var activate, render, userType, vm;
    vm = this;
    vm.projectId = $scope.projectId;
    vm.stepId = $scope.stepId;
    userType = $scope.userType;
    vm.showWinners = false;
    activate = function() {
      return DataService.subscribe($scope, render, [RankListService, 'get', vm.projectId, vm.stepId]);
    };
    render = function(rankList) {
      vm.ranks = rankList;
      vm.locked = userType === 'member' || rankList.confirmed;
      return vm.confirm = rankList.allFull && !rankList.confirmed && userType !== 'member';
    };
    vm.confirmRanks = function() {
      vm.showWinners = true;
      return StepsService.confirmRanks(vm.projectId, vm.stepId);
    };
    vm.drop = {
      handle: function(event, rankToAssign) {
        var submissionId;
        submissionId = event.dataTransfer.getData('submissionId');
        if (submissionId !== 'undefined' && submissionId && rankToAssign) {
          return StepsService.updateRank(vm.projectId, vm.stepId, submissionId, rankToAssign);
        }
      }
    };
    activate();
    return vm;
  };

  RankListController.$inject = ['$scope', 'StepsService', 'RankListService', 'DataService'];

  angular.module('appirio-tech-submissions').controller('RankListController', RankListController);

}).call(this);

(function() {
  'use strict';
  var RankDropdownController;

  RankDropdownController = function($scope, StepsService, RankListService, DataService) {
    var activate, projectId, render, stepId, submissionId, userType, vm;
    vm = this;
    projectId = $scope.projectId;
    stepId = $scope.stepId;
    submissionId = $scope.submissionId;
    userType = $scope.userType;
    activate = function() {
      return DataService.subscribe($scope, render, [RankListService, 'get', projectId, stepId]);
    };
    render = function(rankList) {
      vm.ranks = rankList;
      vm.rank = rankList.filter(function(rank) {
        return rank.id === submissionId;
      })[0];
      return vm.locked = userType === 'member' || rankList.status === 'CLOSED';
    };
    vm.handleRankSelect = function(rank) {
      var ref;
      if ((ref = vm.rank) != null) {
        ref.value = rank != null ? rank.value : void 0;
      }
      if (submissionId && vm.rank) {
        return StepsService.updateRank(projectId, stepId, submissionId, vm.rank.value);
      }
    };
    activate();
    return vm;
  };

  RankDropdownController.$inject = ['$scope', 'StepsService', 'RankListService', 'DataService'];

  angular.module('appirio-tech-submissions').controller('RankDropdownController', RankDropdownController);

}).call(this);

(function() {
  'use strict';
  var SubmissionWinnersController;

  SubmissionWinnersController = function($scope, StepsService, RankListService, DataService) {
    var activate, projectId, render, stepId, vm;
    vm = this;
    projectId = $scope.projectId;
    stepId = $scope.stepId;
    activate = function() {
      return DataService.subscribe($scope, render, [RankListService, 'get', projectId, stepId]);
    };
    render = function(rankList) {
      return vm.ranks = rankList;
    };
    activate();
    return vm;
  };

  SubmissionWinnersController.$inject = ['$scope', 'StepsService', 'RankListService', 'DataService'];

  angular.module('appirio-tech-submissions').controller('SubmissionWinnersController', SubmissionWinnersController);

}).call(this);

(function() {
  'use strict';
  var FinalDevelopmentController;

  FinalDevelopmentController = function($scope) {
    var activate, images, vm;
    vm = this;
    vm.loaded = false;
    vm.thumbnails = [];
    images = ['/images/batman.jpg', '/images/phoenix.jpg', '/images/spider.png', '/images/phoenix.jpg'];
    activate = function() {
      var i, image, j, len;
      for (i = j = 0, len = images.length; j < len; i = ++j) {
        image = images[i];
        vm.thumbnails.push({
          id: i + 1,
          url: image,
          link: 'http://www.google.com'
        });
      }
      vm.loaded = true;
      return vm;
    };
    return activate();
  };

  FinalDevelopmentController.$inject = ['$scope'];

  angular.module('appirio-tech-submissions').controller('FinalDevelopmentController', FinalDevelopmentController);

}).call(this);

(function() {
  'use strict';
  var FileDetailController;

  FileDetailController = function($scope, $state, DataService, StepSubmissionsService, SubmissionsService) {
    var vm;
    vm = this;
    vm.projectId = $scope.projectId;
    vm.stepId = $scope.stepId;
    vm.submissionId = $scope.submissionId;
    vm.fileId = $scope.fileId;
    vm.userType = $scope.userType;
    return vm;
  };

  FileDetailController.$inject = ['$scope', '$state', 'DataService', 'StepSubmissionsService', 'SubmissionsService'];

  angular.module('appirio-tech-submissions').controller('FileDetailController', FileDetailController);

}).call(this);

(function() {
  'use strict';
  var FileDetailSlideController;

  FileDetailSlideController = function($scope, $state, DataService, StepSubmissionsService, SubmissionsService) {
    var activate, vm;
    vm = this;
    vm.files = $scope.files;
    vm.startingFile = $scope.startingFile;
    vm.submitterAvatar = $scope.submitterAvatar;
    vm.submitterHandle = $scope.submitterHandle;
    vm.file = null;
    vm.onFileChange = $scope.onFileChange;
    vm.toggleComments = $scope.toggleComments;
    vm.sendMessage = $scope.sendMessage;
    vm.userType = $scope.userType;
    vm.status = $scope.status;
    vm.messages = $scope.messages;
    vm.canComment = $scope.canComment;
    vm.newMessage = $scope.newMessage;
    vm.showMessages = $scope.showMessages;
    vm.onFileChange = function(file) {
      vm.file = file;
      return $scope.onFileChange({
        file: file
      });
    };
    activate = function() {
      $scope.$watch('showMessages', function(newVal) {
        return vm.showMessages = newVal;
      });
      $scope.$watch('vm.newMessage', function(newVal) {
        return $scope.newMessage = newVal;
      });
      $scope.$watch('newMessage', function(newVal) {
        return vm.newMessage = newVal;
      });
      return $scope.$watch('messages', function(newVal) {
        return vm.messages = newVal;
      });
    };
    activate();
    return vm;
  };

  FileDetailSlideController.$inject = ['$scope', '$state', 'DataService', 'StepSubmissionsService', 'SubmissionsService'];

  angular.module('appirio-tech-submissions').controller('FileDetailSlideController', FileDetailSlideController);

}).call(this);

(function() {
  'use strict';
  var FileDetailSlideContainerController;

  FileDetailSlideContainerController = function($scope, $state, DataService, StepSubmissionsService, SubmissionsService) {
    var activate, fileId, projectId, render, stepId, submissionId, vm;
    vm = this;
    vm.loaded = false;
    vm.submission = {};
    projectId = $scope.projectId;
    stepId = $scope.stepId;
    submissionId = $scope.submissionId;
    fileId = $scope.fileId;
    vm.userType = $scope.userType;
    vm.messages = [];
    vm.newMessage = '';
    activate = function() {
      return DataService.subscribe($scope, render, [StepSubmissionsService, 'get', projectId, stepId]);
    };
    render = function(step) {
      var ref, submitter;
      vm.loaded = true;
      vm.submission = step.submissions.filter(function(submission) {
        return submission.id === submissionId;
      })[0];
      if (vm.submission) {
        vm.hasSubmission = true;
        vm.files = vm.submission.files;
        vm.startingFile = vm.submission.files.filter(function(file) {
          return file.id === fileId;
        })[0];
        submitter = vm.submission.submitter;
        vm.submitterAvatar = submitter.avatar;
        vm.submitterHandle = submitter.handle;
        vm.messages = ((ref = vm.startingFile.threads[0]) != null ? ref.messages : void 0) || [];
        vm.status = step.status;
        return vm.canComment = vm.userType === 'customer' || vm.userType === 'copilot' || vm.submission.belongsToUser;
      }
    };
    vm.onFileChange = function(file) {
      return vm.file = file;
    };
    vm.sendMessage = function() {
      if (vm.newMessage) {
        SubmissionsService.sendMessage(projectId, stepId, submissionId, vm.file.id, vm.newMessage);
        return vm.newMessage = '';
      }
    };
    vm.toggleComments = function() {
      vm.showMessages = !vm.showMessages;
      if (vm.showMessages && vm.file.unreadMessages > 0) {
        return SubmissionsService.markMessagesAsRead(projectId, stepId, submissionId, vm.file.id);
      }
    };
    activate();
    return vm;
  };

  FileDetailSlideContainerController.$inject = ['$scope', '$state', 'DataService', 'StepSubmissionsService', 'SubmissionsService'];

  angular.module('appirio-tech-submissions').controller('FileDetailSlideContainerController', FileDetailSlideContainerController);

}).call(this);

(function() {
  'use strict';
  var FileRowController;

  FileRowController = function($scope) {
    var render, vm;
    vm = this;
    render = function() {
      var files, last, limit, ref;
      limit = $scope.limit || 5;
      files = $scope.files || [];
      last = (Math.min(files.length, limit)) - 1;
      vm.viewAllUrl = $scope.viewAllUrl;
      vm.more = files.length > limit ? files.length - limit : 0;
      vm.viewMore = files.length > limit;
      vm.viewAll = files.length <= limit;
      vm.files = files.slice(0, limit);
      return (ref = vm.files[last]) != null ? ref.isLast = true : void 0;
    };
    $scope.$watch('files', render, true);
    return vm;
  };

  FileRowController.$inject = ['$scope'];

  angular.module('appirio-tech-submissions').controller('FileRowController', FileRowController);

}).call(this);

(function() {
  'use strict';
  var SubmissionsHeaderController;

  SubmissionsHeaderController = function($scope, $state, DataService, StepsService) {
    var activate, render, stepId, vm;
    vm = this;
    vm.projectId = $scope.projectId;
    vm.title = 'Submissions';
    stepId = $scope.stepId;
    activate = function() {
      if (stepId) {
        return DataService.subscribe($scope, render, [StepsService, 'getStepById', vm.projectId, stepId]);
      }
    };
    render = function(step) {
      vm.prev = step.prevStepId;
      vm.next = step.nextStepId;
      return vm.title = step.title;
    };
    activate();
    return vm;
  };

  SubmissionsHeaderController.$inject = ['$scope', '$state', 'DataService', 'StepsService'];

  angular.module('appirio-tech-submissions').controller('SubmissionsHeaderController', SubmissionsHeaderController);

}).call(this);

(function() {
  'use strict';
  var SubmissionListController;

  SubmissionListController = function($scope, DataService, StepSubmissionsService) {
    var activate, render, vm;
    vm = this;
    vm.status = 'PLACEHOLDER';
    vm.statusValue = 0;
    vm.submissions = [];
    vm.projectId = $scope.projectId;
    vm.stepId = $scope.stepId;
    vm.userType = $scope.userType;
    vm.generateProfileUrl = function(handle) {
      return "https://www.topcoder.com/members/" + handle;
    };
    activate = function() {
      return DataService.subscribe($scope, render, [StepSubmissionsService, 'get', vm.projectId, vm.stepId]);
    };
    render = function(step) {
      vm.submissions = step.submissions;
      vm.status = step.status;
      vm.statusValue = step.statusValue;
      return vm.fileCount = step.fileCount;
    };
    activate();
    return vm;
  };

  SubmissionListController.$inject = ['$scope', 'DataService', 'StepSubmissionsService'];

  angular.module('appirio-tech-submissions').controller('SubmissionListController', SubmissionListController);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      controller: 'SubmissionsController as vm',
      templateUrl: 'views/submissions.directive.html',
      scope: {
        projectId: '@',
        stepId: '@',
        stepType: '@',
        userType: '@'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('submissions', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      controller: 'SubmissionDetailController as vm',
      templateUrl: 'views/submission-detail.directive.html',
      scope: {
        projectId: '@',
        stepId: '@',
        submissionId: '@',
        userType: '@'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('submissionDetail', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      controller: 'FileDetailController as vm',
      templateUrl: 'views/file-detail.directive.html',
      scope: {
        projectId: '@',
        stepId: '@',
        submissionId: '@',
        fileId: '@',
        userType: '@'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('fileDetail', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      controller: 'FileDetailSlideContainerController as vm',
      templateUrl: 'views/file-detail-slide-container.directive.html',
      scope: {
        projectId: '@',
        stepId: '@',
        submissionId: '@',
        fileId: '@',
        userType: '@'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('fileDetailSlideContainer', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      controller: 'FileDetailSlideController as vm',
      templateUrl: 'views/file-detail-slide.directive.html',
      scope: {
        files: '=',
        startingFile: '=',
        messages: '=',
        showMessages: '=',
        newMessage: '=',
        sumbitterAvatar: '@',
        submitterHandle: '@',
        userType: '@',
        status: '@',
        canComment: '@',
        onFileChange: '&',
        toggleComments: '&',
        sendMessage: '&'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('fileDetailSlide', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'A',
      scope: {
        onDrop: '&'
      },
      link: function(scope, element, attr, ctrl) {
        return element.bind('drop', function(event) {
          return scope.onDrop({
            event: event
          });
        });
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('onDrop', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'A',
      scope: {
        onDrop: '&'
      },
      link: function(scope, element, attr, ctrl) {
        var dragend, dragstart, el, noDrag;
        el = element[0];
        noDrag = function(el) {
          var child, i, len, ref, results;
          el.draggable = false;
          if (el.children) {
            ref = el.children;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              child = ref[i];
              results.push(noDrag(child));
            }
            return results;
          }
        };
        noDrag(el);
        el.draggable = true;
        dragstart = function(e) {
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('submissionId', e.target.dataset.id);
          this.classList.add('drag');
          return false;
        };
        dragend = function(e) {
          this.classList.remove('drag');
          return false;
        };
        el.addEventListener('dragstart', dragstart, false);
        return el.addEventListener('dragend', dragend, false);
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('draggable', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submissions-header.directive.html',
      controller: 'SubmissionsHeaderController as vm',
      scope: {
        projectId: '@',
        stepId: '@'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('submissionsHeader', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/rank-list.directive.html',
      controller: 'RankListController as vm',
      scope: {
        projectId: '@',
        stepId: '@',
        userType: '@'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('rankList', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/rank-dropdown.directive.html',
      controller: 'RankDropdownController as vm',
      scope: {
        projectId: '@',
        stepId: '@',
        submissionId: '@',
        userType: '@'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('rankDropdown', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/file-row.directive.html',
      controller: 'FileRowController as vm',
      scope: {
        files: '=',
        limit: '@',
        viewAllUrl: '@'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('fileRow', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/file-grid.directive.html',
      scope: {
        files: '='
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('fileGrid', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submission-winner-card.directive.html',
      scope: {
        nameText: '@',
        avatarUrl: '@',
        rank: '@',
        belongsToUser: '@'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('submissionWinnerCard', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      controller: 'SubmissionWinnersController as vm',
      templateUrl: 'views/submission-winners.directive.html',
      scope: {
        projectId: '@',
        stepId: '@'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('submissionWinners', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submission-countdown.directive.html',
      scope: {
        end: '@',
        text: '@'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('submissionCountdown', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/final-development.directive.html',
      controller: 'FinalDevelopmentController as vm',
      scope: true
    };
  };

  angular.module('appirio-tech-submissions').directive('finalDevelopment', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submission-list.directive.html',
      controller: 'SubmissionListController as vm',
      scope: {
        projectId: '@',
        stepId: '@',
        userType: '@'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('submissionList', directive);

}).call(this);

(function() {
  'use strict';
  var srv;

  srv = function($rootScope, StepsAPIService, OptimistCollection) {
    var acceptFixes, confirmRanks, createOrderedRankList, createStepCollection, data, dyanamicProps, fetch, get, getCurrentStep, getStepById, removeBlankAfterN, statusOf, statusValueOf, statuses, stepOrder, subscribe, titles, updateRank, updateRankedSubmissions, updateStep;
    data = {};
    stepOrder = ['designConcepts', 'completeDesigns', 'finalFixes', 'code'];
    statuses = ['PLACEHOLDER', 'SCHEDULED', 'OPEN', 'OPEN_LATE', 'REVIEWING', 'REVIEWING_LATE', 'CLOSED'];
    titles = {
      designConcepts: 'Design Concepts',
      completeDesigns: 'Complete Designs',
      finalFixes: 'Final Fixes',
      code: 'Development'
    };
    createOrderedRankList = function(rankedSubmissions, numberOfRanks) {
      var i, j, orderedRanks, ref;
      orderedRanks = [];
      for (i = j = 0, ref = numberOfRanks; j < ref; i = j += 1) {
        orderedRanks[i] = null;
      }
      rankedSubmissions.forEach(function(submission) {
        return orderedRanks[submission.rank - 1] = submission.submissionId;
      });
      return orderedRanks;
    };
    removeBlankAfterN = function(array, n) {
      var i, j, ref, ref1;
      for (i = j = ref = n, ref1 = array.length; j < ref1; i = j += 1) {
        if (array[i] === null) {
          array.splice(i, 1);
          return array;
        }
      }
      return array;
    };
    updateRankedSubmissions = function(rankedSubmissions, numberOfRanks, id, rank) {
      var currentRank, orderedRanks;
      rankedSubmissions = angular.copy(rankedSubmissions);
      rank = rank - 1;
      orderedRanks = createOrderedRankList(rankedSubmissions, numberOfRanks);
      currentRank = orderedRanks.indexOf(id);
      if (currentRank >= 0) {
        orderedRanks.splice(currentRank, 1, null);
      }
      orderedRanks.splice(rank, 0, id);
      orderedRanks = removeBlankAfterN(orderedRanks, rank);
      rankedSubmissions = [];
      orderedRanks.forEach(function(id, index) {
        var rankedSubmission;
        if (id !== null && index < numberOfRanks) {
          rankedSubmission = {
            rank: index + 1,
            submissionId: id
          };
          return rankedSubmissions.push(rankedSubmission);
        }
      });
      return rankedSubmissions;
    };
    statusOf = function(step) {
      var closed, endsAt, hasSubmissions, now, ref, startsAt, submissionsDueBy;
      if (step.stepType === 'designConcepts' || step.stepType === 'completeDesigns') {
        now = Date.now();
        startsAt = new Date(step.startsAt);
        submissionsDueBy = new Date(step.details.submissionsDueBy);
        endsAt = new Date(step.endsAt);
        hasSubmissions = ((ref = step.details.submissionIds) != null ? ref.length : void 0) > 0;
        closed = step.details.customerConfirmedRanks || step.details.customerAcceptedFixes;
        if (closed) {
          return 'CLOSED';
        } else if (now > endsAt) {
          return 'REVIEWING_LATE';
        } else if (hasSubmissions) {
          return 'REVIEWING';
        } else if (now > submissionsDueBy) {
          return 'OPEN_LATE';
        } else if (now > startsAt) {
          return 'OPEN';
        } else {
          return 'SCHEDULED';
        }
      } else {
        return 'SCHEDULED';
      }
    };
    statusValueOf = function(status) {
      return statuses.indexOf(status);
    };
    createStepCollection = function(projectId) {
      var newSteps;
      newSteps = new OptimistCollection({
        updateCallback: function() {
          $rootScope.$emit("StepsService:changed:" + projectId);
          return data[projectId].get().forEach(function(step) {
            return $rootScope.$emit("StepsService:changed:" + projectId + ":" + step.id);
          });
        },
        propsToIgnore: ['$promise', '$resolved']
      });
      return newSteps;
    };
    subscribe = function(scope, onChange) {
      var destroyStepsListener;
      destroyStepsListener = $rootScope.$on("StepsService:changed:" + projectId, function() {
        return onChange();
      });
      scope.$on('$destroy', function() {
        return destroyStepsListener();
      });
      return onChange();
    };
    dyanamicProps = function(steps) {
      if (angular.isArray(steps)) {
        return steps.map(function(step) {
          var currentStepOrder, nextStep, prevStep;
          step.title = titles[step.stepType];
          step.status = statusOf(step);
          step.statusValue = statusValueOf(step.status);
          currentStepOrder = stepOrder.indexOf(step.stepType);
          if (currentStepOrder > 0) {
            prevStep = steps.filter(function(step) {
              return step.stepType === stepOrder[currentStepOrder - 1];
            })[0];
            if (prevStep) {
              step.prevStepId = prevStep.id;
              step.prevStepEndsAt = prevStep.endsAt;
            }
          }
          if (currentStepOrder < stepOrder.length - 1) {
            nextStep = steps.filter(function(step) {
              return step.stepType === stepOrder[currentStepOrder + 1];
            })[0];
            if (nextStep) {
              step.nextStepId = nextStep.id;
              step.nextStepStartsAt = nextStep.startsAt;
            }
          }
          return step;
        });
      }
    };
    get = function(projectId) {
      if (!data[projectId]) {
        fetch(projectId);
      }
      return dyanamicProps(data[projectId].get());
    };
    getCurrentStep = function(projectId) {
      var filter;
      filter = function(step) {
        return step.stepType === 'designConcepts';
      };
      return get(projectId).filter(filter)[0];
    };
    getStepById = function(projectId, stepId) {
      var filter;
      filter = function(step) {
        return step.id === stepId;
      };
      return get(projectId).filter(filter)[0];
    };
    fetch = function(projectId) {
      var apiCall, currentProjectId;
      data[projectId] = createStepCollection(projectId);
      currentProjectId = projectId;
      apiCall = function() {
        var params;
        params = {
          projectId: projectId
        };
        return StepsAPIService.query(params).$promise;
      };
      return data[projectId].fetch({
        apiCall: apiCall
      });
    };
    updateStep = function(projectId, stepId, step, updates) {
      var apiCall;
      apiCall = function(step) {
        var params;
        params = {
          projectId: projectId,
          stepId: stepId
        };
        return StepsAPIService.patch(params, updates).$promise;
      };
      return step.update({
        updates: updates,
        apiCall: apiCall
      });
    };
    updateRank = function(projectId, stepId, submissionId, rank) {
      var numberOfRanks, rankedSubmissions, step, stepData, updates;
      step = data[projectId].findOneWhere({
        id: stepId
      });
      stepData = step.get();
      numberOfRanks = stepData.details.numberOfRanks;
      rankedSubmissions = stepData.details.rankedSubmissions;
      rankedSubmissions = updateRankedSubmissions(rankedSubmissions, numberOfRanks, submissionId, rank);
      updates = {
        details: {
          rankedSubmissions: rankedSubmissions
        }
      };
      return updateStep(projectId, stepId, step, updates);
    };
    confirmRanks = function(projectId, stepId) {
      var step, updates;
      step = data[projectId].findOneWhere({
        id: stepId
      });
      updates = {
        details: {
          customerConfirmedRanks: true
        }
      };
      return updateStep(projectId, stepId, step, updates);
    };
    acceptFixes = function(projectId, stepId) {
      var step, updates;
      step = data[projectId].findOneWhere({
        id: stepId
      });
      updates = {
        details: {
          customerAcceptedFixes: true
        }
      };
      return updateStep(projectId, stepId, step, updates);
    };
    return {
      name: 'StepsService',
      get: get,
      subscribe: subscribe,
      getCurrentStep: getCurrentStep,
      getStepById: getStepById,
      updateRank: updateRank,
      confirmRanks: confirmRanks,
      acceptFixes: acceptFixes
    };
  };

  srv.$inject = ['$rootScope', 'StepsAPIService', 'OptimistCollection'];

  angular.module('appirio-tech-submissions').factory('StepsService', srv);

}).call(this);

(function() {
  'use strict';
  var SubmissionsService, withMessageCounts, withOwnership, withSeparateDeliverable, withSortedMessages;

  SubmissionsService = function($rootScope, SubmissionsAPIService, SubmissionsMessagesAPIService, UserV3Service, MessageUpdateAPIService) {
    var data, dyanamicProps, emitUpdates, error, fetch, get, markMessagesAsRead, pending, sendMessage, subscribe;
    data = {};
    pending = false;
    error = false;
    emitUpdates = function(projectId, stepId) {
      return $rootScope.$emit("SubmissionsService:changed:" + projectId + ":" + stepId);
    };
    subscribe = function(scope, onChange) {
      var destroySubmissionsListener;
      destroySubmissionsListener = $rootScope.$on("SubmissionsService:changed:" + projectId + ":" + stepId, function() {
        return onChange();
      });
      scope.$on('$destroy', function() {
        return destroySubmissionsListener();
      });
      return onChange();
    };
    dyanamicProps = function(submissions) {
      var user;
      user = UserV3Service.getCurrentUser();
      return submissions.map(function(submission) {
        submission = withSeparateDeliverable(submission);
        submission = withMessageCounts(submission);
        submission = withOwnership(submission, user != null ? user.id : void 0);
        submission = withSortedMessages(submission);
        return submission;
      });
    };
    get = function(projectId, stepId) {
      var copy, i, item, len, ref;
      if (!(projectId && stepId)) {
        throw 'SubmissionsService.get requires a projectId and a stepId';
      }
      if (!data[stepId]) {
        fetch(projectId, stepId);
      }
      copy = [];
      ref = data[stepId];
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        copy.push(angular.merge({}, item));
      }
      if (pending) {
        copy._pending = true;
      }
      if (error) {
        copy._error = error;
      }
      return dyanamicProps(copy);
    };
    fetch = function(projectId, stepId) {
      var params, promise, submissions;
      data[stepId] = [];
      submissions = [];
      pending = true;
      emitUpdates(projectId, stepId);
      params = {
        projectId: projectId,
        stepId: stepId
      };
      promise = SubmissionsAPIService.query(params).$promise;
      promise.then(function(res) {
        error = false;
        data[stepId] = res;
        return submissions;
      });
      promise["catch"](function(err) {
        return error = err;
      });
      return promise["finally"](function() {
        pending = false;
        return emitUpdates(projectId, stepId);
      });
    };
    markMessagesAsRead = function(projectId, stepId, submissionId, fileId) {
      var file, message, messages, putParams, queryParams, submission, user;
      user = UserV3Service.getCurrentUser();
      submission = data[stepId].filter(function(submission) {
        return submission.id === submissionId;
      })[0];
      file = submission.files.filter(function(file) {
        return file.id === fileId;
      })[0];
      messages = file.threads[0].messages;
      messages.forEach(function(message) {
        return message.read = true;
      });
      emitUpdates(projectId, stepId);
      message = messages[messages.length - 1];
      queryParams = {
        threadId: message.threadId,
        messageId: message.id
      };
      putParams = {
        param: {
          readFlag: true,
          subscriberId: user.id
        }
      };
      return MessageUpdateAPIService.put(queryParams, putParams);
    };
    sendMessage = function(projectId, stepId, submissionId, fileId, message) {
      var file, messages, newMessage, now, params, payload, submission, thread, user;
      user = UserV3Service.getCurrentUser();
      submission = data[stepId].filter(function(submission) {
        return submission.id === submissionId;
      })[0];
      file = submission.files.filter(function(file) {
        return file.id === fileId;
      })[0];
      thread = file.threads[0];
      messages = thread.messages;
      now = new Date();
      payload = {
        param: {
          publisherId: user.id,
          threadId: thread.id,
          body: message
        }
      };
      params = {
        projectId: projectId,
        submissionId: submissionId,
        threadId: thread.id
      };
      SubmissionsMessagesAPIService.post(params, payload);
      newMessage = angular.merge({}, payload.param, {
        read: true,
        createdAt: now.toISOString(),
        publisher: {
          handle: user.handle,
          avatar: user.avatar
        }
      });
      messages.push(newMessage);
      return emitUpdates(projectId, stepId);
    };
    return {
      name: 'SubmissionsService',
      subscribe: subscribe,
      get: get,
      markMessagesAsRead: markMessagesAsRead,
      sendMessage: sendMessage
    };
  };

  SubmissionsService.$inject = ['$rootScope', 'SubmissionsAPIService', 'SubmissionsMessagesAPIService', 'UserV3Service', 'MessageUpdateAPIService'];

  angular.module('appirio-tech-submissions').factory('SubmissionsService', SubmissionsService);

  withMessageCounts = function(submission) {
    return angular.extend({}, submission, {
      files: submission.files.map(function(file) {
        return angular.extend({}, file, {
          totalMessages: file.threads[0].messages.length,
          unreadMessages: file.threads[0].messages.filter(function(m) {
            return !m.read;
          }).length
        });
      }),
      totalMessages: submission.files.reduce((function(t, f) {
        return t + f.totalMessages;
      }), 0),
      unreadMessages: submission.files.reduce((function(t, f) {
        return t + f.unreadMessages;
      }), 0)
    });
  };

  withOwnership = function(submission, userId) {
    return angular.extend({}, submission, {
      belongsToUser: submission.submitter.userId === userId
    });
  };

  withSeparateDeliverable = function(submission) {
    var ref;
    return angular.extend({}, submission, {
      downloadUrl: (ref = submission.files.filter(function(f) {
        return f.role === 'PREVIEW_COLLECTION';
      })[0]) != null ? ref.url : void 0,
      files: submission.files.filter(function(f) {
        return f.role !== 'PREVIEW_COLLECTION';
      })
    });
  };

  withSortedMessages = function(submission) {
    return angular.extend({}, submission, {
      files: submission.files.map(function(file) {
        return angular.extend({}, file, {
          threads: file.threads.map(function(thread) {
            return angular.extend({}, thread, {
              messages: thread.messages.slice(0).sort(function(a, b) {
                var aDate, bDate;
                aDate = new Date(a.createdAt);
                bDate = new Date(b.createdAt);
                return aDate - bDate;
              })
            });
          })
        });
      })
    });
  };

}).call(this);

(function() {
  'use strict';
  var srv;

  srv = function($rootScope, DataService, StepSubmissionsService, SubmissionsService) {
    var data, get, rankNames, update;
    data = {};
    rankNames = ['1st Place', '2nd Place', '3rd Place', '4th Place', '5th Place', '6th Place', '7th Place', '8th Place', '9th Place', '10th Place'];
    update = function(step) {
      var j, numberOfRanks, rankFull, rankList, ref, results;
      numberOfRanks = Math.min(step.details.numberOfRanks, (ref = step.submissions) != null ? ref.length : void 0);
      rankList = (function() {
        results = [];
        for (var j = 1; 1 <= numberOfRanks ? j <= numberOfRanks : j >= numberOfRanks; 1 <= numberOfRanks ? j++ : j--){ results.push(j); }
        return results;
      }).apply(this).map(function(i) {
        var rank, submission;
        rank = {
          value: i,
          label: rankNames[i - 1]
        };
        submission = step.submissions.filter(function(submission) {
          return submission.rank === i;
        })[0];
        if (submission) {
          angular.extend(rank, {
            id: submission.id,
            avatarUrl: submission.submitter.avatar,
            handle: submission.submitter.handle,
            belongsToUser: submission.submitter.belongsToUser
          });
        }
        return rank;
      });
      rankFull = function(allFull, rank) {
        return allFull && rank.id;
      };
      rankList.allFull = rankList.reduce(rankFull, true);
      rankList.confirmed = step.details.customerConfirmedRanks;
      rankList.projectId = data[step.id].projectId;
      rankList.status = step.status;
      data[step.id] = rankList;
      return $rootScope.$emit("RankListService:changed:" + rankList.projectId + ":" + step.id);
    };
    get = function(projectId, stepId) {
      if (!(projectId && stepId)) {
        throw 'RankListService.get requires a projectId and a stepId';
      }
      if (!data[stepId]) {
        data[stepId] = [];
        data[stepId].projectId = projectId;
        DataService.subscribe(null, update, [[StepSubmissionsService, 'get', projectId, stepId]]);
      }
      return data[stepId];
    };
    return {
      name: 'RankListService',
      get: get
    };
  };

  srv.$inject = ['$rootScope', 'DataService', 'StepSubmissionsService', 'SubmissionsService'];

  angular.module('appirio-tech-submissions').factory('RankListService', srv);

}).call(this);

(function() {
  'use strict';
  var srv;

  srv = function($rootScope, $state, StepsService, SubmissionsService, DataService) {
    var data, get, projectIdsByStepId, sortSubmissions, submissionWithRank, submissionsWithRanks, update;
    projectIdsByStepId = {};
    data = {};
    submissionWithRank = function(submission, rankedSubmissions) {
      if (rankedSubmissions == null) {
        rankedSubmissions = [];
      }
      submission.rank = '';
      rankedSubmissions.forEach(function(rankedSubmission) {
        if (submission.id === rankedSubmission.submissionId) {
          return submission.rank = rankedSubmission.rank;
        }
      });
      return submission;
    };
    submissionsWithRanks = function(submissions, rankedSubmissions) {
      if (rankedSubmissions == null) {
        rankedSubmissions = [];
      }
      return submissions.map(function(submission) {
        return submissionWithRank(submission, rankedSubmissions);
      });
    };
    sortSubmissions = function(submissions) {
      var orderedByRank, orderedBySubmitter, orderedSubmissions, ranked, unRanked;
      ranked = submissions.filter(function(submission) {
        return submission.rank !== '';
      });
      unRanked = submissions.filter(function(submission) {
        return submission.rank === '';
      });
      orderedByRank = ranked.sort(function(previousSubmission, nextSubmission) {
        return previousSubmission.rank - nextSubmission.rank;
      });
      orderedBySubmitter = unRanked.sort(function(previousSubmission, nextSubmission) {
        return previousSubmission.submitter.id - nextSubmission.submitter.id;
      });
      orderedSubmissions = orderedByRank.concat(orderedBySubmitter);
      return orderedSubmissions;
    };
    update = function(step, submissions) {
      data[step.id] = step;
      step.projectId = projectIdsByStepId[step.id];
      submissions = submissionsWithRanks(submissions, step.details.rankedSubmissions);
      submissions = sortSubmissions(submissions);
      submissions = submissions.map(function(submission) {
        submission.detailUrl = $state.href('submission-detail', {
          projectId: step.projectId,
          stepId: step.id,
          submissionId: submission.id
        });
        submission.files = submission.files.map(function(file) {
          file.detailUrl = $state.href('file-detail', {
            projectId: step.projectId,
            stepId: step.id,
            submissionId: submission.id,
            fileId: file.id
          });
          return file;
        });
        return submission;
      });
      step.submissions = submissions;
      step.fileCount = submissions.reduce((function(a, s) {
        return a + s.files.length;
      }), 0);
      return $rootScope.$emit("StepSubmissionsService:changed:" + step.projectId + ":" + step.id);
    };
    get = function(projectId, stepId) {
      if (!data[stepId]) {
        projectIdsByStepId[stepId] = projectId;
        data[stepId] = {};
        DataService.subscribe(null, update, [[StepsService, 'getStepById', projectId, stepId], [SubmissionsService, 'get', projectId, stepId]]);
      }
      return angular.merge({}, data[stepId]);
    };
    return {
      name: 'StepSubmissionsService',
      get: get
    };
  };

  srv.$inject = ['$rootScope', '$state', 'StepsService', 'SubmissionsService', 'DataService'];

  angular.module('appirio-tech-submissions').factory('StepSubmissionsService', srv);

}).call(this);

(function() {
  'use strict';
  var isObject, srv,
    slice = [].slice;

  isObject = function(item) {
    return item !== null && typeof item === 'object' && Array.isArray(item) === false;
  };

  srv = function($injector, $rootScope) {
    var subscribe;
    subscribe = function(scope, subscriberOnChange, configs) {
      var dataOnChange, services;
      if (!angular.isArray(configs[0])) {
        configs = [configs];
      }
      services = configs.map(function(config) {
        var args, instance, method;
        instance = config[0], method = config[1], args = 3 <= config.length ? slice.call(config, 2) : [];
        return {
          instance: instance,
          method: method,
          args: args
        };
      });
      dataOnChange = function() {
        var data, itemReady;
        data = services.map(function(service) {
          return service.instance[service.method].apply(null, service.args);
        });
        itemReady = function(acc, item) {
          var ready;
          ready = true;
          if (item === void 0 || item === null) {
            ready = false;
          }
          if (isObject(item) && Object.keys(item).length <= 0) {
            ready = false;
          }
          if (item && item._pending) {
            ready = false;
          }
          return acc && ready;
        };
        if (data.reduce(itemReady, true)) {
          return subscriberOnChange.apply(null, data);
        }
      };
      services.forEach(function(service) {
        var destroyServiceListener;
        destroyServiceListener = $rootScope.$on(service.instance.name + ":changed:" + (service.args.join(':')), function() {
          return dataOnChange();
        });
        if (scope) {
          return scope.$on('$destroy', function() {
            return destroyServiceListener();
          });
        }
      });
      return dataOnChange();
    };
    return {
      subscribe: subscribe
    };
  };

  srv.$inject = ['$injector', '$rootScope'];

  angular.module('appirio-tech-submissions').factory('DataService', srv);

}).call(this);
