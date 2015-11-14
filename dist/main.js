(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-ui-components', 'appirio-tech-ng-auth', 'appirio-tech-ng-optimist'];

  angular.module('appirio-tech-submissions', dependencies);

}).call(this);

angular.module("appirio-tech-submissions").run(["$templateCache", function($templateCache) {$templateCache.put("views/submissions.directive.html","<loader ng-hide=\"vm.loaded\"></loader><ul class=\"header flex center\"><li class=\"previous\"><a ng-class=\"{ invisible: !vm.prevStepRef }\" href=\"{{ vm.prevStepRef }}\"><div class=\"icon arrow\"></div></a></li><li><h1>{{ vm.stepName }}</h1></li><li class=\"next\"><a ng-class=\"{ invisible: !vm.nextStepRef }\" href=\"{{ vm.nextStepRef }}\"><div class=\"icon arrow right\"></div></a></li></ul><div ng-if=\"vm.userType == \'member\' &amp;&amp; vm.statusValue &lt; 4\" class=\"subheader\"><p>There are no submissions to view at this time.</p></div><div ng-if=\"vm.userType == \'member\' &amp;&amp; (vm.status == \'REVIEWING\' || vm.status == \'REVIEWING_LATE\')\" class=\"subheader\"><p>Browse your competitors\' files, view clients comments, and improve your designs in the finals.</p></div><div ng-if=\"vm.userType != \'member\' &amp;&amp; vm.status == \'PLACEHOLDER\'\" class=\"subheader\"><p>You will see submissions here when they are ready.</p></div><div ng-if=\"vm.userType != \'member\' &amp;&amp; vm.status == \'SCHEDULED\'\" class=\"subheader clock\"><img src=\"/images/clock.svg\" class=\"icon biggest\"/><p>Work will begin on {{ vm.stepName }} submissions in</p><countdown end=\"{{ vm.startsAt }}\" class=\"block\"></countdown></div><div ng-if=\"vm.userType != \'member\' &amp;&amp; vm.status == \'OPEN\'\" class=\"subheader clock\"><img src=\"/images/clock.svg\" class=\"icon biggest\"/><p>Submissions for the {{ vm.stepName }} Phase coming in</p><countdown end=\"{{ vm.submissionsDueBy }}\" class=\"block\"></countdown></div><div ng-if=\"vm.userType != \'member\' &amp;&amp; vm.status == \'OPEN_LATE\'\" class=\"subheader\"><p>Submissions for the {{ vm.stepName }} Phase are overdue. Please contact your copilot.</p></div><div ng-if=\"vm.userType != \'member\' &amp;&amp; (vm.status == \'REVIEWING\' || vm.status == \'REVIEWING_LATE\')\" class=\"subheader\"><p ng-if=\"vm.status == \'REVIEWING\'\">Give feedback and select the top {{ vm.ranks.length }} designs. You have <countdown end=\"{{vm.endsAt}}\"></countdown> \nto give feedback.</p><p ng-if=\"vm.status == \'REVIEWING_LATE\'\">Your feedback is overdue. Please select the top {{ vm.ranks.length }} designs.</p><ul class=\"top-selection\"><li ng-repeat=\"rank in vm.ranks track by $index\"><div ng-class=\"{ \'has-avatar\': rank.avatarUrl }\" ondragenter=\"return false\" ondragover=\"return false\" on-drop=\"vm.drop.handle(event, rank.value)\" class=\"shell\"><div ng-if=\"rank.id\" data-id=\"{{ rank.id }}\" draggable=\"draggable\"><avatar avatar-url=\"{{ rank.avatarUrl }}\"></avatar><div class=\"rank\">{{ rank.value }}</div></div><div ng-if=\"!rank.avatarUrl\" class=\"rank\">{{ rank.value }}</div></div></li><li ng-show=\"vm.allFilled\"><button ng-click=\"vm.confirmRanks()\" class=\"action\">Confirm your selections </button></li></ul><p ng-if=\"vm.rankUpdateError\">{{ vm.rankUpdateError }}</p></div><div ng-if=\"vm.status == \'CLOSED\'\" class=\"subheader\"><p ng-if=\"vm.userType != \'member\'\">Congratulations! These are your {{ vm.stepName }} winners.</p><p ng-if=\"vm.userType == \'member\' &amp;&amp; vm.userRank\">Congratulations! You came in {{ vm.userRank }}! These are the {{ vm.stepName }} winners.</p><p ng-if=\"vm.userType == \'member\' &amp;&amp; !vm.userRank\">These are the phase winners. You design was not chosen as a winner. However, you can still submit designs in the final round.</p><ul class=\"winners\"><li ng-repeat=\"rank in vm.ranks\" ng-if=\"rank.id\" ng-class=\"{ \'belongs-to-user\': rank.belongsToUser }\"><div ng-if=\"vm.stepType == \'designConcepts\'\" class=\"rank\"><strong>{{rank.label.slice(0, -6)}}</strong><br /> place</div><div ng-if=\"vm.stepType == \'completeDesigns\'\" class=\"rank\"><strong>Winner</strong></div><avatar avatar-url=\"{{rank.avatarUrl}}\"></avatar><a href=\"#\" class=\"name\">{{rank.handle}}<span ng-if=\"rank.belongsToUser\">&nbsp;(Me)</span></a></li></ul></div><ul ng-if=\"vm.statusValue &gt; 3\" class=\"submissions\"><li ng-repeat=\"submission in vm.submissions track by $index\" data-id=\"{{ submission.id }}\" ng-class=\"{ \'belongs-to-user\': submission.belongsToUser }\" draggable=\"draggable\" class=\"submission flex elevated-bottom\"><ul class=\"user-details flex middle\"><li><avatar avatar-url=\"{{ submission.submitter.avatar }}\"></avatar></li><li><div class=\"name-time\"><div class=\"name\">{{ submission.submitter.handle }}<span ng-if=\"submission.belongsToUser\">&nbsp;(Me)</span></div><p class=\"secondary\">Project Contributor</p></div></li></ul><ul class=\"thumbnails flex-grow flex\"><li ng-repeat=\"file in submission.files track by $index\"><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: submission.id, fileId: file.id})\"><img ng-src=\"{{ file.url }}\"/></a><div class=\"pop-over elevated\"><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: submission.id, fileId: file.id})\" class=\"preview\"><img ng-src=\"{{ file.url }}\" class=\"previewImage\"/></a><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: submission.id, fileId: file.id})\"><div class=\"icon envelope\"></div></a><a href=\"{{ file.url }}\" target=\"_blank\"><div class=\"clean icon download\"></div></a></div></li><li><a ui-sref=\"submission-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: submission.id})\"><p ng-if=\"!submission.more\" class=\"flex middle center\">View <br /> All</p><p ng-if=\"submission.more\" class=\"flex middle center\">+{{ submission.more }} <br /> more</p></a></li></ul><ul class=\"actions flex middle wrap\"><li ng-if=\"vm.status != \'CLOSED\'\" class=\"comments\"><a href=\"{{ submission.downloadUrl }}\" target=\"_blank\"><div class=\"icon download small\"></div></a></li><li ng-if=\"vm.status == \'CLOSED\' &amp;&amp; submission.rank\" class=\"comments\"><a href=\"{{ submission.downloadUrl }}\" target=\"_blank\"><div class=\"icon download small\"></div></a></li><li ng-if=\"vm.userType != \'member\' &amp;&amp; vm.status != \'CLOSED\'\"><select ng-model=\"submission.rank\" ng-change=\"vm.handleRankSelect(submission)\" ng-options=\"rank.value as rank.label for rank in vm.ranks\"></select></li><li ng-if=\"vm.status == \'CLOSED\'\">{{ vm.rankNames[$index] }}</li></ul></li></ul>");
$templateCache.put("views/final-fixes.directive.html","<loader ng-show=\"!vm.loaded\"></loader><ul class=\"header flex center\"><li class=\"previous\"><a ng-class=\"{ invisible: !vm.prevStepRef }\" href=\"{{ vm.prevStepRef }}\"><div class=\"icon arrow\"></div></a></li><li><h1>{{ vm.stepName }}</h1></li><li class=\"next\"><a ng-class=\"{ invisible: !vm.nextStepRef }\" href=\"{{ vm.nextStepRef }}\"><div class=\"icon arrow right\"></div></a></li></ul><div ng-if=\"vm.status == \'SCHEDULED\'\" class=\"subheader\"><img src=\"/images/clock.svg\" class=\"icon biggest\"/><p>Final Fixes Phase starts in</p><countdown end=\"{{ vm.startsAt }}\" class=\"block\"></countdown><hr/><ul ng-if=\"vm.submission.submitter\" class=\"winners\"><li><div class=\"rank\"><strong>winner</strong></div><avatar avatar-url=\"{{vm.submission.submitter.avatar}}\"></avatar><a href=\"#\" class=\"name\">{{vm.submission.submitter.handle}}</a></li></ul></div><div ng-if=\"vm.status == \'CLOSED\'\" class=\"subheader\"><p>Project Complete! Review final submission</p></div><div ng-if=\"vm.status == \'REVIEWING\' || vm.status == \'REVIEWING_LATE\'\" class=\"subheader\"><p>Give your final feedback to complete this design project.</p><countdown end=\"{{ vm.endsAt }}\" class=\"block\"></countdown><p class=\"duration\">remaining to give feedback</p></div><div class=\"buttons flex space-between wrap\"><button ng-if=\"vm.statusValue &gt; 3\" class=\"download\"><div class=\"icon download smallest\"></div><a href=\"{{ vm.submission.downloadUrl }}\">download files</a></button><button ng-click=\"vm.confirmApproval()\" ng-if=\"vm.status == \'REVIEWING\' || vm.status == \'REVIEWING_LATE\'\" class=\"action\">confirm final approval</button></div><hr/><ul ng-if=\"vm.submission\" class=\"flex wrap previews\"><li ng-repeat=\"file in vm.submission.files track by $index\" fitted-width=\"fitted-width\" class=\"preview\"><img ng-src=\"{{ file.url }}\" ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submission.id, fileId: file.id})\" class=\"img\"/></li></ul>");
$templateCache.put("views/submission-detail.directive.html","<loader ng-hide=\"vm.loaded\"></loader><ul class=\"header flex middle\"><li class=\"flex-grow submitter\"><a ui-sref=\"step({projectId: vm.projectId, stepId: vm.stepId})\">submissions</a><div class=\"icon arrow right smallest\"></div><avatar avatar-url=\"{{ vm.submission.submitter.avatar }}\"></avatar><div class=\"name\">{{ vm.submission.submitter.handle }}</div></li><li ng-if=\"vm.userType != \'member\' &amp;&amp; vm.status != \'CLOSED\'\"><select ng-model=\"vm.submission.rank\" ng-change=\"vm.handleRankSelect(vm.submission)\" ng-options=\"rank.value as rank.label for rank in vm.ranks\"></select></li><li ng-if=\"vm.status == \'CLOSED\' &amp;&amp; vm.rank\">{{ vm.rank }}</li><li class=\"download\"><a href=\"{{ vm.submission.downloadUrl }}\" target=\"_blank\"><div class=\"icon download small\"></div></a></li></ul><hr/><ul class=\"previews flex wrap\"><li ng-repeat=\"file in vm.submission.files track by $index\" fitted-width=\"fitted-width\" class=\"preview\"><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submissionId, fileId: file.id})\"><img ng-src=\"{{ file.url }}\" class=\"img\"/></a><p>{{ file.name }}</p></li></ul>");
$templateCache.put("views/file-detail.directive.html","<loader ng-hide=\"vm.loaded\"></loader><main class=\"flex column\"><div class=\"header\"><ul><li class=\"submitter\"><avatar avatar-url=\"{{ vm.submission.submitter.avatar }}\"></avatar><div class=\"name-time\"><p class=\"name\">{{ vm.submission.submitter.handle }}</p><time>Submitted: {{ vm.submission.createdAt | timeLapse }}</time></div></li></ul><li class=\"icons\"><button class=\"clean\"><a href=\"{{ vm.file.url }}\" target=\"_blank\"><div class=\"icon download\"></div></a></button><button ng-click=\"vm.toggleComments()\" class=\"clean\"><div class=\"icon envelope\"></div></button></li></div><div class=\"content flex flex-grow\"><div class=\"slideshow flex column flex-grow\"><div class=\"preview flex center flex-grow flex-shrink\"><div class=\"previous flex flex-grow\"><a ng-if=\"vm.prevFile\" ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submission.id, fileId: vm.prevFile.id})\" class=\"arrow-previous\"><button class=\"clean icon arrow big\"></button></a></div><div class=\"image flex column center\"><div class=\"title\"><p>{{ vm.file.name }}</p></div><div class=\"img-container flex\"><img ng-src=\"http://placehold.it/400x800\"/></div></div><div class=\"next flex flex-grow\"><a ng-if=\"vm.nextFile\" ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submission.id, fileId: vm.nextFile.id})\" class=\"arrow-next\"><button class=\"clean icon arrow right big\"></button></a></div></div><div class=\"thumbnails\"><ul><li ng-repeat=\"file in vm.submission.files\" class=\"thumbnail\"><button class=\"clean thumbnail\"><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submission.id, fileId: file.id})\"><img ng-src=\"{{ file.url }}\"/></a><div ng-if=\"file.unreadMessages &gt; 0\" class=\"notification absolute\">{{ file.unreadMessages }}</div></button></li></ul></div></div><div class=\"file-detail-messaging flex column active\"><div class=\"title\"><h4>File Comments</h4><hr/></div><div class=\"messages flex-grow flex-shrink\"><ul><li ng-repeat=\"message in vm.messages track by $index\"><header class=\"flex middle\"><avatar avatar-url=\"{{ message.publisher.avatar }}\"></avatar><div class=\"name\">{{ message.publisher.handle }}</div><time>{{ message.createdAt | timeLapse }}</time></header><p class=\"message\">{{ message.body }}</p></li></ul></div><div class=\"send\"><form ng-submit=\"vm.sendMessage()\" ng-if=\"vm.status != \'CLOSED\'\"><textarea placeholder=\"Send a message&hellip;\" ng-model=\"vm.newMessage\"></textarea><button type=\"submit\" class=\"enter\">Enter</button></form></div></div></div></main>");}]);
(function() {
  'use strict';
  var SubmissionsController;

  SubmissionsController = function(helpers, $scope, $rootScope, $state, StepsService, SubmissionsService, UserV3Service) {
    var activate, config, getStepRef, onChange, ref, userId, vm;
    vm = this;
    config = {};
    if ($scope.stepType === 'designConcepts') {
      config.stepType = 'designConcepts';
      config.stepName = 'Design Concepts';
      config.prevStepType = null;
      config.prevStepName = null;
      config.nextStepType = 'completeDesigns';
      config.nextStepName = 'Complete Designs';
      config.timeline = ['active', '', ''];
      config.defaultStatus = 'PLACEHOLDER';
    }
    if ($scope.stepType === 'completeDesigns') {
      config.stepType = 'completeDesigns';
      config.stepName = 'Complete Designs';
      config.prevStepType = 'designConcepts';
      config.prevStepName = 'Design Concepts';
      config.nextStepType = 'finalFixes';
      config.nextStepName = 'Final Fixes';
      config.timeline = ['', 'active', ''];
      config.defaultStatus = 'PLACEHOLDER';
    }
    config.rankNames = ['1st Place', '2nd Place', '3rd Place', '4th Place', '5th Place', '6th Place', '7th Place', '8th Place', '9th Place', '10th Place'];
    vm.loaded = false;
    vm.timeline = config.timeline;
    vm.stepName = config.stepName;
    vm.stepType = config.stepType;
    vm.status = config.defaultStatus;
    vm.statusValue = 0;
    vm.allFilled = false;
    vm.submissions = [];
    vm.ranks = [];
    vm.projectId = $scope.projectId;
    vm.stepId = $scope.stepId;
    vm.userType = $scope.userType;
    userId = (ref = UserV3Service.getCurrentUser()) != null ? ref.id : void 0;
    activate = function() {
      StepsService.subscribe($scope, onChange);
      return SubmissionsService.subscribe($scope, onChange);
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
    vm.handleRankSelect = function(submission) {
      if (submission.id && submission.rank) {
        return StepsService.updateRank(vm.projectId, vm.stepId, submission.id, submission.rank);
      }
    };
    vm.confirmRanks = function() {
      return StepsService.confirmRanks(vm.projectId, vm.stepId);
    };
    getStepRef = function(projectId, step) {
      var stepStatus;
      if (!step) {
        return null;
      }
      stepStatus = helpers.statusOf(step);
      if (vm.userType === 'member' && helpers.statusValueOf(stepStatus) < 4) {
        return null;
      }
      if (vm.userType !== 'member' && stepStatus === 'PLACEHOLDER') {
        return null;
      }
      return $state.href('step', {
        projectId: projectId,
        stepId: step.id
      });
    };
    onChange = function() {
      var currentStep, nextStep, numberOfRanks, prevStep, steps, submissions;
      steps = StepsService.get(vm.projectId);
      submissions = SubmissionsService.get(vm.projectId, vm.stepId);
      if (steps._pending || submissions._pending) {
        vm.loaded = false;
        return null;
      }
      vm.loaded = true;
      currentStep = helpers.findInCollection(steps, 'id', vm.stepId);
      prevStep = helpers.findInCollection(steps, 'stepType', config.prevStepType);
      nextStep = helpers.findInCollection(steps, 'stepType', config.nextStepType);
      vm.startsAt = currentStep.startsAt;
      vm.endsAt = currentStep.endsAt;
      vm.prevStepRef = getStepRef(vm.projectId, prevStep);
      vm.nextStepRef = getStepRef(vm.projectId, nextStep);
      vm.submissions = helpers.submissionsWithRanks(submissions, currentStep.details.rankedSubmissions);
      vm.submissions = helpers.sortSubmissions(vm.submissions);
      vm.submissions = helpers.submissionsWithMessageCounts(vm.submissions);
      vm.submissions = helpers.submissionsWithOwnership(vm.submissions, userId);
      vm.submissions = helpers.submissionsWithFileTypes(vm.submissions);
      vm.submissions = helpers.submissionsFilteredByType(vm.submissions);
      vm.submissions = helpers.submissionsWithFileLimit(vm.submissions, 6);
      numberOfRanks = Math.min(currentStep.details.numberOfRanks, vm.submissions.length);
      vm.rankNames = config.rankNames.slice(0, numberOfRanks);
      vm.ranks = helpers.makeEmptyRankList(vm.rankNames);
      vm.ranks = helpers.populatedRankList(vm.ranks, vm.submissions);
      vm.userRank = helpers.highestRank(vm.ranks, userId);
      if (currentStep.rankedSubmissions_error) {
        vm.rankUpdateError = currentStep.rankedSubmissions_error;
      }
      vm.allFilled = currentStep.details.rankedSubmissions.length === numberOfRanks;
      vm.status = helpers.statusOf(currentStep);
      return vm.statusValue = helpers.statusValueOf(vm.status);
    };
    activate();
    return vm;
  };

  SubmissionsController.$inject = ['SubmissionsHelpers', '$scope', '$rootScope', '$state', 'StepsService', 'SubmissionsService', 'UserV3Service'];

  angular.module('appirio-tech-submissions').controller('SubmissionsController', SubmissionsController);

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
  var SubmissionsHelpers, createOrderedRankList, fileWithFileType, fileWithMessageCounts, findInCollection, highestRank, makeEmptyRankList, populatedRankList, removeBlankAfterN, sortSubmissions, statusOf, statusValueOf, statuses, submissionFilteredByType, submissionWithFileLimit, submissionWithFileTypes, submissionWithMessageCounts, submissionWithRank, submissionsFilteredByType, submissionsWithFileLimit, submissionsWithFileTypes, submissionsWithMessageCounts, submissionsWithOwnership, submissionsWithRanks, updateRankedSubmissions;

  findInCollection = function(collection, prop, value) {
    var el, index;
    for (index in collection) {
      el = collection[index];
      if (el[prop] === value) {
        return el;
      }
    }
    return null;
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

  fileWithMessageCounts = function(file) {
    var ref, ref1;
    file.totalMessages = 0;
    file.unreadMessages = 0;
    if ((ref = file.threads) != null) {
      if ((ref1 = ref[0]) != null) {
        ref1.messages.forEach(function(message) {
          file.totalMessages = file.totalMessages + 1;
          if (!message.read) {
            return file.unreadMessages = file.unreadMessages + 1;
          }
        });
      }
    }
    return file;
  };

  submissionWithMessageCounts = function(submission) {
    submission.totalMessages = 0;
    submission.unreadMessages = 0;
    submission.files.forEach(function(file) {
      fileWithMessageCounts(file);
      submission.totalMessages = submission.totalMessages + file.totalMessages;
      return submission.unreadMessages = submission.unreadMessages + file.unreadMessages;
    });
    return submission;
  };

  submissionsWithMessageCounts = function(submissions) {
    return submissions.map(function(submission) {
      return submissionWithMessageCounts(submission);
    });
  };

  fileWithFileType = function(file) {
    var extension;
    extension = file.name.match(/\.[0-9a-z]+$/i);
    extension = extension[0].slice(1);
    extension = extension.toLowerCase();
    file.fileType = extension;
    return file;
  };

  submissionWithFileTypes = function(submission) {
    submission.files = submission.files.map(function(file) {
      return fileWithFileType(file);
    });
    return submission;
  };

  submissionsWithFileTypes = function(submissions) {
    return submissions.map(function(submission) {
      return submissionWithFileTypes(submission);
    });
  };

  submissionWithFileLimit = function(submission, limit) {
    submission.more = submission.files.length > limit ? submission.files.length - limit : 0;
    submission.files = submission.files.slice(0, limit);
    return submission;
  };

  submissionsWithFileLimit = function(submissions, limit) {
    return submissions.map(function(submission) {
      return submissionWithFileLimit(submission, limit);
    });
  };

  submissionFilteredByType = function(submission, allowedTypes) {
    if (allowedTypes == null) {
      allowedTypes = ['png', 'jpg', 'gif'];
    }
    submission.files = submission.files.filter(function(file) {
      return allowedTypes.indexOf(file.fileType) > -1;
    });
    return submission;
  };

  submissionsFilteredByType = function(submissions, allowedTypes) {
    return submissions.map(function(submission) {
      return submissionFilteredByType(submission, allowedTypes);
    });
  };

  submissionsWithOwnership = function(submissions, userId) {
    return submissions.map(function(submission) {
      return angular.merge({}, submission, {
        belongsToUser: submission.submitter.id === userId
      });
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

  populatedRankList = function(rankList, submissions) {
    if (submissions == null) {
      submissions = [];
    }
    submissions.forEach(function(submission) {
      var submissionRank;
      if (submission.rank !== '') {
        submissionRank = submission.rank - 1;
        if (submissionRank < rankList.length) {
          return angular.extend(rankList[submissionRank], {
            avatarUrl: submission.submitter.avatar,
            id: submission.id,
            handle: submission.submitter.handle,
            belongsToUser: submission.belongsToUser
          });
        }
      }
    });
    return rankList;
  };

  makeEmptyRankList = function(rankNames) {
    var i, j, ranks, ref;
    ranks = [];
    for (i = j = 1, ref = rankNames.length; j <= ref; i = j += 1) {
      ranks.push({
        value: i,
        label: rankNames[i - 1],
        id: null,
        avatarUrl: null
      });
    }
    return ranks;
  };

  highestRank = function(rankList, userId) {
    var i, j, ref;
    for (i = j = 0, ref = rankList.length; j < ref; i = j += 1) {
      if (rankList[i].id === userId) {
        return rankList[i].label;
      }
    }
    return null;
  };

  statuses = ['PLACEHOLDER', 'SCHEDULED', 'OPEN', 'OPEN_LATE', 'REVIEWING', 'REVIEWING_LATE', 'CLOSED'];

  statusOf = function(step) {
    var closed, endsAt, hasSubmissions, now, ref, startsAt, submissionsDueBy;
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
  };

  statusValueOf = function(status) {
    return statuses.indexOf(status);
  };

  SubmissionsHelpers = function() {
    return {
      findInCollection: findInCollection,
      createOrderedRankList: createOrderedRankList,
      removeBlankAfterN: removeBlankAfterN,
      updateRankedSubmissions: updateRankedSubmissions,
      submissionWithRank: submissionWithRank,
      submissionsWithRanks: submissionsWithRanks,
      fileWithMessageCounts: fileWithMessageCounts,
      submissionWithMessageCounts: submissionWithMessageCounts,
      submissionsWithMessageCounts: submissionsWithMessageCounts,
      submissionWithFileLimit: submissionWithFileLimit,
      submissionsWithFileLimit: submissionsWithFileLimit,
      submissionWithFileTypes: submissionWithFileTypes,
      submissionsWithFileTypes: submissionsWithFileTypes,
      submissionFilteredByType: submissionFilteredByType,
      submissionsFilteredByType: submissionsFilteredByType,
      submissionsWithOwnership: submissionsWithOwnership,
      sortSubmissions: sortSubmissions,
      populatedRankList: populatedRankList,
      makeEmptyRankList: makeEmptyRankList,
      highestRank: highestRank,
      statusOf: statusOf,
      statusValueOf: statusValueOf
    };
  };

  SubmissionsHelpers.$inject = [];

  angular.module('appirio-tech-submissions').factory('SubmissionsHelpers', SubmissionsHelpers);

}).call(this);

(function() {
  'use strict';
  var srv;

  srv = function($rootScope, helpers, StepsAPIService, OptimistCollection) {
    var acceptFixes, confirmRanks, createStepCollection, currentProjectId, fetch, get, getCurrentStep, getStepById, steps, subscribe, updateRank, updateStep;
    currentProjectId = null;
    steps = null;
    createStepCollection = function() {
      var newSteps;
      newSteps = new OptimistCollection({
        updateCallback: function() {
          return $rootScope.$emit('StepsService:changed');
        },
        propsToIgnore: ['$promise', '$resolved']
      });
      return newSteps;
    };
    subscribe = function(scope, onChange) {
      var destroyStepsListener;
      destroyStepsListener = $rootScope.$on('StepsService:changed', function() {
        return onChange();
      });
      scope.$on('$destroy', function() {
        return destroyStepsListener();
      });
      return onChange();
    };
    get = function(projectId) {
      if (projectId !== currentProjectId) {
        fetch(projectId);
      }
      return steps.get();
    };
    getCurrentStep = function(projectId) {
      var filter;
      filter = function(step) {
        return step.stepType === 'designConcepts';
      };
      if (projectId !== currentProjectId) {
        fetch(projectId);
        return null;
      } else {
        return steps.get().filter(filter)[0];
      }
    };
    getStepById = function(projectId, stepId) {
      var filter;
      filter = function(step) {
        return step.id === stepId;
      };
      if (projectId !== currentProjectId) {
        fetch(projectId);
        return null;
      } else {
        return steps.get().filter(filter)[0];
      }
    };
    fetch = function(projectId) {
      var apiCall;
      steps = createStepCollection();
      currentProjectId = projectId;
      apiCall = function() {
        var params;
        params = {
          projectId: projectId
        };
        return StepsAPIService.query(params).$promise;
      };
      return steps.fetch({
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
      step = steps.findOneWhere({
        id: stepId
      });
      stepData = step.get();
      numberOfRanks = stepData.details.numberOfRanks;
      rankedSubmissions = stepData.details.rankedSubmissions;
      rankedSubmissions = helpers.updateRankedSubmissions(rankedSubmissions, numberOfRanks, submissionId, rank);
      updates = {
        details: {
          rankedSubmissions: rankedSubmissions
        }
      };
      return updateStep(projectId, stepId, step, updates);
    };
    confirmRanks = function(projectId, stepId) {
      var step, updates;
      step = steps.findOneWhere({
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
      step = steps.findOneWhere({
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
      get: get,
      subscribe: subscribe,
      getCurrentStep: getCurrentStep,
      getStepById: getStepById,
      updateRank: updateRank,
      confirmRanks: confirmRanks,
      acceptFixes: acceptFixes
    };
  };

  srv.$inject = ['$rootScope', 'SubmissionsHelpers', 'StepsAPIService', 'OptimistCollection'];

  angular.module('appirio-tech-submissions').factory('StepsService', srv);

}).call(this);

(function() {
  'use strict';
  var SubmissionsService;

  SubmissionsService = function($rootScope, helpers, SubmissionsAPIService, SubmissionsMessagesAPIService, UserV3Service, MessageUpdateAPIService) {
    var currentProjectId, currentStepId, emitUpdates, error, fetch, get, markMessagesAsRead, pending, sendMessage, submissions, subscribe;
    submissions = null;
    currentProjectId = null;
    currentStepId = null;
    pending = false;
    error = false;
    emitUpdates = function() {
      return $rootScope.$emit('SubmissionsService:changed');
    };
    subscribe = function(scope, onChange) {
      var destroySubmissionsListener;
      destroySubmissionsListener = $rootScope.$on('SubmissionsService:changed', function() {
        return onChange();
      });
      scope.$on('$destroy', function() {
        return destroySubmissionsListener();
      });
      return onChange();
    };
    get = function(projectId, stepId) {
      var copy, i, item, len;
      if (!(projectId && stepId)) {
        throw 'SubmissionsService.get requires a projectId and a stepId';
      }
      if (projectId !== currentProjectId || stepId !== currentStepId) {
        fetch(projectId, stepId);
      }
      copy = [];
      for (i = 0, len = submissions.length; i < len; i++) {
        item = submissions[i];
        copy.push(angular.merge({}, item));
      }
      if (pending) {
        copy._pending = true;
      }
      if (error) {
        copy._error = error;
      }
      return copy;
    };
    fetch = function(projectId, stepId) {
      var params, promise;
      currentProjectId = projectId;
      currentStepId = stepId;
      submissions = [];
      pending = true;
      emitUpdates();
      params = {
        projectId: projectId,
        stepId: stepId
      };
      promise = SubmissionsAPIService.query(params).$promise;
      promise.then(function(res) {
        error = false;
        submissions = res;
        return submissions.forEach(function(submission) {
          return submission.files.forEach(function(file) {
            return file.threads.forEach(function(thread) {
              return thread.messages.sort(function(a, b) {
                var aDate, bDate;
                aDate = new Date(a.createdAt);
                bDate = new Date(b.createdAt);
                return aDate - bDate;
              });
            });
          });
        });
      });
      promise["catch"](function(err) {
        return error = err;
      });
      return promise["finally"](function() {
        pending = false;
        return emitUpdates();
      });
    };
    markMessagesAsRead = function(submissionId, fileId, userId, threadId) {
      var file, message, messages, putParams, queryParams, submission;
      submission = helpers.findInCollection(submissions, 'id', submissionId);
      file = helpers.findInCollection(submission.files, 'id', fileId);
      messages = file.threads[0].messages;
      messages.forEach(function(message) {
        return message.read = true;
      });
      emitUpdates();
      message = messages[messages.length - 1];
      queryParams = {
        threadId: message.threadId,
        messageId: message.id
      };
      putParams = {
        param: {
          readFlag: true,
          subscriberId: userId
        }
      };
      return MessageUpdateAPIService.put(queryParams, putParams);
    };
    sendMessage = function(submissionId, fileId, message) {
      var file, messages, newMessage, now, params, payload, submission, thread, user;
      user = UserV3Service.getCurrentUser();
      submission = helpers.findInCollection(submissions, 'id', submissionId);
      file = helpers.findInCollection(submission.files, 'id', fileId);
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
        projectId: currentProjectId,
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
      return emitUpdates();
    };
    return {
      subscribe: subscribe,
      get: get,
      markMessagesAsRead: markMessagesAsRead,
      sendMessage: sendMessage
    };
  };

  SubmissionsService.$inject = ['$rootScope', 'SubmissionsHelpers', 'SubmissionsAPIService', 'SubmissionsMessagesAPIService', 'UserV3Service', 'MessageUpdateAPIService'];

  angular.module('appirio-tech-submissions').factory('SubmissionsService', SubmissionsService);

}).call(this);

(function() {
  'use strict';
  var FinalFixesController;

  FinalFixesController = function(helpers, $scope, $rootScope, $state, StepsService, SubmissionsService) {
    var activate, config, getStepRef, onChange, vm;
    vm = this;
    config = {};
    config.stepType = 'finalFixes';
    config.stepName = 'Final Fixes';
    config.prevStepType = 'completeDesigns';
    config.prevStepName = 'Complete Designs';
    config.nextStepType = 'code';
    config.nextStepName = 'Code';
    config.timeline = ['', '', 'active'];
    config.defaultStatus = 'scheduled';
    config.rankNames = ['1st Place', '2nd Place', '3rd Place', '4th Place', '5th Place', '6th Place', '7th Place', '8th Place', '9th Place', '10th Place'];
    vm.loaded = false;
    vm.timeline = config.timeline;
    vm.stepName = config.stepName;
    vm.status = config.defaultStatus;
    vm.allFilled = false;
    vm.submission = {};
    vm.projectId = $scope.projectId;
    vm.stepId = $scope.stepId;
    vm.userType = $scope.userType;
    activate = function() {
      StepsService.subscribe($scope, onChange);
      return SubmissionsService.subscribe($scope, onChange);
    };
    vm.confirmApproval = function() {
      return StepsService.acceptFixes(vm.projectId, vm.stepId);
    };
    getStepRef = function(projectId, step) {
      var stepStatus;
      if (!step) {
        return null;
      }
      stepStatus = helpers.statusOf(step);
      if (vm.userType === 'member' && helpers.statusValueOf(stepStatus) < 4) {
        return null;
      }
      if (vm.userType !== 'member' && stepStatus === 'PLACEHOLDER') {
        return null;
      }
      return $state.href('step', {
        projectId: projectId,
        stepId: step.id
      });
    };
    onChange = function() {
      var currentStep, nextStep, prevStep, steps, submissions;
      steps = StepsService.get(vm.projectId);
      submissions = SubmissionsService.get(vm.projectId, vm.stepId);
      if (steps._pending || submissions._pending) {
        vm.loaded = false;
        return null;
      }
      vm.loaded = true;
      currentStep = helpers.findInCollection(steps, 'stepType', config.stepType);
      prevStep = helpers.findInCollection(steps, 'stepType', config.prevStepType);
      nextStep = helpers.findInCollection(steps, 'stepType', config.nextStepType);
      vm.startsAt = currentStep.startsAt;
      vm.endsAt = currentStep.endsAt;
      vm.prevStepRef = getStepRef(vm.projectId, prevStep);
      vm.nextStepRef = getStepRef(vm.projectId, nextStep);
      if (submissions.length > 0) {
        vm.submission = helpers.submissionWithMessageCounts(submissions[0]);
        vm.submission = helpers.submissionWithFileTypes(vm.submission);
        vm.submission = helpers.submissionFilteredByType(vm.submission);
      }
      vm.status = helpers.statusOf(currentStep);
      return vm.statusValue = helpers.statusValueOf(vm.status);
    };
    activate();
    return vm;
  };

  FinalFixesController.$inject = ['SubmissionsHelpers', '$scope', '$rootScope', '$state', 'StepsService', 'SubmissionsService'];

  angular.module('appirio-tech-submissions').controller('FinalFixesController', FinalFixesController);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      controller: 'FinalFixesController as vm',
      templateUrl: 'views/final-fixes.directive.html',
      scope: {
        projectId: '@',
        stepId: '@',
        userType: '@'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('finalFixes', directive);

}).call(this);

(function() {
  'use strict';
  var SubmissionDetailController;

  SubmissionDetailController = function(helpers, $scope, $rootScope, StepsService, SubmissionsService) {
    var activate, config, onChange, vm;
    vm = this;
    config = {};
    config.rankNames = ['1st Place', '2nd Place', '3rd Place', '4th Place', '5th Place', '6th Place', '7th Place', '8th Place', '9th Place', '10th Place'];
    vm.loaded = false;
    vm.rankNames = [];
    vm.submission = {};
    vm.allFilled = false;
    vm.projectId = $scope.projectId;
    vm.stepId = $scope.stepId;
    vm.submissionId = $scope.submissionId;
    vm.userType = $scope.userType;
    activate = function() {
      StepsService.subscribe($scope, onChange);
      return SubmissionsService.subscribe($scope, onChange);
    };
    vm.handleRankSelect = function(submission) {
      return StepsService.updateRank(vm.projectId, vm.stepId, submission.id, submission.rank);
    };
    onChange = function() {
      var currentStep, numberOfRanks, steps, submissions;
      steps = StepsService.get(vm.projectId);
      submissions = SubmissionsService.get(vm.projectId, vm.stepId);
      if (steps._pending || submissions._pending) {
        vm.loaded = false;
        return null;
      }
      vm.loaded = true;
      currentStep = helpers.findInCollection(steps, 'id', vm.stepId);
      vm.submission = helpers.findInCollection(submissions, 'id', vm.submissionId);
      vm.submission = helpers.submissionWithRank(vm.submission, currentStep.details.rankedSubmissions);
      vm.submission = helpers.submissionWithMessageCounts(vm.submission);
      vm.submission = helpers.submissionWithFileTypes(vm.submission);
      vm.submission = helpers.submissionFilteredByType(vm.submission);
      numberOfRanks = Math.min(currentStep.details.numberOfRanks, currentStep.details.submissionIds.length);
      vm.rankNames = config.rankNames.slice(0, numberOfRanks);
      vm.ranks = helpers.makeEmptyRankList(vm.rankNames);
      vm.ranks = helpers.populatedRankList(vm.ranks, vm.submissions);
      vm.rank = vm.submission.rank ? config.rankNames[vm.submission.rank - 1] : null;
      vm.allFilled = currentStep.details.rankedSubmissions.length === numberOfRanks;
      return vm.status = helpers.statusOf(currentStep);
    };
    activate();
    return vm;
  };

  SubmissionDetailController.$inject = ['SubmissionsHelpers', '$scope', '$rootScope', 'StepsService', 'SubmissionsService'];

  angular.module('appirio-tech-submissions').controller('SubmissionDetailController', SubmissionDetailController);

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
  var FileDetailController;

  FileDetailController = function(helpers, $scope, $rootScope, StepsService, SubmissionsService, UserV3Service) {
    var activate, onChange, ref, userId, vm;
    vm = this;
    vm.loaded = false;
    vm.submission = {};
    vm.file = {};
    vm.prevFile = null;
    vm.nextFile = null;
    vm.projectId = $scope.projectId;
    vm.stepId = $scope.stepId;
    vm.submissionId = $scope.submissionId;
    vm.fileId = $scope.fileId;
    vm.userType = $scope.userType;
    vm.messages = [];
    vm.newMessage = '';
    vm.showMessages = false;
    vm.avatars = {};
    userId = (ref = UserV3Service.getCurrentUser()) != null ? ref.id : void 0;
    activate = function() {
      StepsService.subscribe($scope, onChange);
      return SubmissionsService.subscribe($scope, onChange);
    };
    vm.sendMessage = function() {
      if (vm.newMessage) {
        SubmissionsService.sendMessage(vm.submissionId, vm.fileId, vm.newMessage, userId);
        return vm.newMessage = '';
      }
    };
    vm.toggleComments = function() {
      vm.showComments = !vm.showComments;
      if (vm.showComments && vm.file.unreadMessages > 0) {
        return SubmissionsService.markMessagesAsRead(vm.submissionId, vm.fileId, userId);
      }
    };
    onChange = function() {
      var currentIndex, currentStep, nextIndex, prevIndex, ref1, steps, submissions;
      steps = StepsService.get(vm.projectId);
      submissions = SubmissionsService.get(vm.projectId, vm.stepId);
      if (steps._pending || submissions._pending) {
        vm.loaded = false;
        return null;
      }
      vm.loaded = true;
      currentStep = helpers.findInCollection(steps, 'id', vm.stepId);
      vm.submission = helpers.findInCollection(submissions, 'id', vm.submissionId);
      vm.submission = helpers.submissionWithMessageCounts(vm.submission);
      vm.submission = helpers.submissionWithFileTypes(vm.submission);
      vm.submission = helpers.submissionFilteredByType(vm.submission);
      vm.file = helpers.findInCollection(vm.submission.files, 'id', vm.fileId);
      vm.messages = ((ref1 = vm.file.threads[0]) != null ? ref1.messages : void 0) || [];
      currentIndex = vm.submission.files.indexOf(vm.file);
      prevIndex = currentIndex - 1;
      if (prevIndex < 0) {
        prevIndex = vm.submission.files.length - 1;
      }
      nextIndex = parseInt(currentIndex) + 1;
      if (nextIndex >= vm.submission.files.length) {
        nextIndex = 0;
      }
      vm.prevFile = vm.submission.files[prevIndex];
      vm.nextFile = vm.submission.files[nextIndex];
      return vm.status = helpers.statusOf(currentStep);
    };
    activate();
    return vm;
  };

  FileDetailController.$inject = ['SubmissionsHelpers', '$scope', '$rootScope', 'StepsService', 'SubmissionsService', 'UserV3Service'];

  angular.module('appirio-tech-submissions').controller('FileDetailController', FileDetailController);

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
          ref = el.children;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            results.push(noDrag(child));
          }
          return results;
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
