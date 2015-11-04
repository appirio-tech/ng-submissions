(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-ui-components', 'appirio-tech-ng-auth', 'appirio-tech-ng-optimist'];

  angular.module('appirio-tech-submissions', dependencies);

}).call(this);

angular.module("appirio-tech-submissions").run(["$templateCache", function($templateCache) {$templateCache.put("views/submissions.directive.html","<loader ng-hide=\"vm.loaded\"></loader><ul class=\"header flex-center\"><li class=\"previous\"><a ng-class=\"{ invisible: !vm.prevStepRef }\" href=\"{{ vm.prevStepRef }}\"><div class=\"icon arrow\"></div></a></li><li><h1>{{ vm.stepName }}</h1></li><li class=\"next\"><a ng-class=\"{ invisible: !vm.nextStepRef }\" href=\"{{ vm.nextStepRef }}\"><div class=\"icon arrow right\"></div></a></li></ul><div ng-if=\"vm.status == \'scheduled\'\" class=\"subheader\"><img src=\"/images/clock.svg\" class=\"icon biggest\"/><p>Submissions for the {{ vm.stepName }} Phase coming in</p><countdown end=\"{{ vm.startsAt }}\" class=\"block\"></countdown></div><div ng-if=\"vm.status == \'closed\'\" class=\"subheader\"><p>Congratulations! These are your {{ vm.stepName }} winners.</p><hr class=\"small\"/><ul class=\"winners\"><li ng-repeat=\"rank in vm.ranks\" ng-if=\"rank.id\"><div class=\"rank\"><strong>{{rank.label.slice(0, -5)}}</strong><br /> place</div><avatar avatar-url=\"{{rank.avatarUrl}}\"></avatar><a href=\"#\" class=\"name\">{{rank.handle}}</a></li></ul></div><div ng-if=\"vm.status == \'open\'\" class=\"subheader\"><p>Give feedback and select the top {{ vm.ranks.length }} designs. You have <countdown end=\"{{vm.endsAt}}\"></countdown> \nto give feedback.</p><ul class=\"top-selection\"><li ng-repeat=\"rank in vm.ranks track by $index\"><div ng-class=\"{ \'has-avatar\': rank.avatarUrl }\" ondragenter=\"return false\" ondragover=\"return false\" on-drop=\"vm.drop.handle(event, rank.value)\" class=\"shell\"><div ng-if=\"rank.id\" data-id=\"{{ rank.id }}\" draggable=\"draggable\"><avatar avatar-url=\"{{ rank.avatarUrl }}\"></avatar><div class=\"rank\">{{ rank.value }}</div></div><div ng-if=\"!rank.avatarUrl\" class=\"rank\">{{ rank.value }}</div></div></li><li ng-show=\"vm.allFilled\"><button ng-click=\"vm.confirmRanks()\" class=\"action\">Confirm your selections </button></li></ul><p ng-if=\"vm.rankUpdateError\">{{ vm.rankUpdateError }}</p></div><ul class=\"submissions\"><li ng-repeat=\"submission in vm.submissions track by $index\" data-id=\"{{ submission.id }}\" draggable=\"draggable\" class=\"submission flex elevated-bottom\"><ul class=\"user-details flex middle\"><li><avatar avatar-url=\"{{ submission.submitter.avatar }}\"></avatar></li><li><div class=\"name-time\"><div class=\"name\">{{ submission.submitter.handle }}</div><p>{{ submission.files.length }} Images</p></div></li></ul><ul class=\"thumbnails flex-grow\"><li ng-repeat=\"file in submission.files track by $index\" class=\"thumbnail\"><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: submission.id, fileId: file.id})\"><img ng-src=\"{{ file.url }}\" class=\"img\"/></a><div class=\"pop-over elevated\"><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: submission.id, fileId: file.id})\" class=\"preview\"><img ng-src=\"{{ file.url }}\" class=\"previewImage\"/></a><div class=\"icon envelope\"></div><a href=\"{{ file.url }}\" target=\"_blank\"><div class=\"clean icon download\"></div></a></div></li></ul><ul class=\"actions flex middle wrap\"><li><a ui-sref=\"submission-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: submission.id})\">view all</a></li><li ng-if=\"vm.status != \'closed\'\" class=\"comments\"><a href=\"{{ submission.downloadUrl }}\" target=\"_blank\"><div class=\"icon download small\"></div></a></li><li ng-if=\"vm.status == \'closed\' &amp;&amp; submission.rank\" class=\"comments\"><a href=\"{{ submission.downloadUrl }}\" target=\"_blank\"><div class=\"icon download small\"></div></a></li><li ng-if=\"vm.status == \'open\'\"><select ng-model=\"submission.rank\" ng-change=\"vm.handleRankSelect(submission)\" ng-options=\"rank.value as rank.label for rank in vm.ranks\"></select></li><li ng-if=\"vm.status == \'closed\'\">{{ vm.rankNames[$index] }}</li></ul></li></ul>");
$templateCache.put("views/final-fixes.directive.html","<loader ng-show=\"!vm.loaded\"></loader><ul class=\"header flex-center\"><li class=\"previous\"><a ng-class=\"{ invisible: !vm.prevStepRef }\" href=\"{{ vm.prevStepRef }}\"><div class=\"icon arrow\"></div></a></li><li><h1>{{ vm.stepName }}</h1></li><li class=\"next\"><a ng-class=\"{ invisible: !vm.nextStepRef }\" href=\"{{ vm.nextStepRef }}\"><div class=\"icon arrow right\"></div></a></li></ul><div ng-if=\"vm.status == \'scheduled\'\" class=\"subheader\"><img src=\"/images/clock.svg\" class=\"icon biggest\"/><p>Final Fixes Phase starts in</p><countdown end=\"{{ vm.work.phase.startDate }}\" class=\"block\"></countdown><hr/><ul class=\"winners\"><li><div class=\"rank\"><strong>winner</strong></div><avatar avatar-url=\"{{vm.submission.submitter.avatar}}\"></avatar><a href=\"#\" class=\"name\">{{vm.submission.submitter.handle}}</a></li></ul></div><div ng-if=\"vm.status == \'closed\'\" class=\"subheader\"><p>Project Complete! Review final submission</p></div><div ng-if=\"vm.status == \'open\'\" class=\"subheader\"><p>Give your final feedback to complete this design project.</p><countdown end=\"{{ vm.work.phase.endDate }}\" class=\"block\"></countdown><p class=\"duration\">remaining to give feedback</p></div><div class=\"buttons flex space-between wrap\"><button ng-if=\"vm.status == \'open\' || vm.status == \'closed\'\" class=\"download\"><div class=\"icon download smallest\"></div><span>download files</span></button><button ng-click=\"vm.confirmApproval()\" ng-if=\"vm.status == \'open\'\" class=\"action\">confirm final approval</button></div><hr/><ul ng-if=\"vm.status == \'open\' || vm.status == \'closed\'\" class=\"flex wrap previews\"><li ng-repeat=\"file in vm.submission.files track by $index\" fitted-width=\"fitted-width\" class=\"preview\"><img ng-src=\"{{ file.url }}\" ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submission.id, fileId: file.id})\" class=\"img\"/></li></ul>");
$templateCache.put("views/submission-detail.directive.html","<loader ng-hide=\"vm.loaded\"></loader><ul class=\"header flex middle\"><li class=\"flex-grow submitter\"><a ui-sref=\"step({projectId: vm.projectId, stepId: vm.stepId})\">submissions</a><div class=\"icon arrow right smallest\"></div><avatar avatar-url=\"{{ vm.submission.submitter.avatar }}\"></avatar><div class=\"name\">{{ vm.submission.submitter.handle }}</div></li><li><select ng-model=\"vm.submission.rank\" ng-change=\"vm.handleRankSelect(vm.submission)\" ng-options=\"rank.value as rank.label for rank in vm.ranks\"></select></li><li class=\"download\"><button class=\"clean\"><div class=\"icon download small\"></div></button></li></ul><hr/><ul class=\"previews flex wrap\"><li ng-repeat=\"file in vm.submission.files track by $index\" fitted-width=\"fitted-width\" class=\"preview\"><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submissionId, fileId: file.id})\"><img ng-src=\"{{ file.url }}\" class=\"img\"/></a><p>{{ file.name }}</p></li></ul>");
$templateCache.put("views/file-detail.directive.html","<main><loader ng-hide=\"vm.loaded\"></loader><ul class=\"header\"><li class=\"submitter\"><avatar avatar-url=\"{{ vm.submission.submitter.avatar }}\"></avatar><div class=\"name-time\"><p class=\"name\">{{ vm.submission.submitter.handle }}</p><time>Submitted: {{ vm.submission.createdAt | timeLapse }}</time></div></li><li class=\"icons\"><button class=\"clean\"><a href=\"{{ vm.file.url }}\"><div class=\"icon download\"></div></a></button><button ng-click=\"vm.toggleComments()\" class=\"clean\"><div class=\"icon envelope\"></div></button></li></ul><hr/><aside ng-class=\"{ active: vm.showComments }\" flush-height=\"flush-height\" class=\"messaging flex column\"><h4>Submission comments</h4><hr/><div class=\"flex column flex-grow\"><ul class=\"messages flex-grow\"><li ng-repeat=\"message in vm.messages track by $index\"><header class=\"flex middle\"><avatar avatar-url=\"{{ message.publisher.avatar }}\"></avatar><div class=\"name\">{{ message.publisher.handle }}</div><time>{{ message.createdAt | timeLapse }}</time></header><p class=\"message\">{{ message.body }}</p></li></ul><form ng-submit=\"vm.sendMessage()\"><textarea placeholder=\"Send a message&hellip;\" ng-model=\"vm.newMessage\"></textarea><button type=\"submit\" class=\"enter\">Enter</button></form></div></aside><ul class=\"slideshow\"><li><a ng-if=\"vm.prevFile\" ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submission.id, fileId: vm.prevFile.id})\"><button class=\"clean icon arrow big\"></button></a></li><li class=\"preview\"><p>{{ vm.file.name }}</p><div class=\"img-container\"><img ng-src=\"{{ vm.file.url }}\"/></div></li><li><a ng-if=\"vm.nextFile\" ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submission.id, fileId: vm.nextFile.id})\"><button class=\"clean icon arrow right big\"></button></a></li></ul><ul class=\"thumbnails\"><li ng-repeat=\"file in vm.submission.files\" class=\"thumbnail\"><button class=\"clean thumbnail\"><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submission.id, fileId: file.id})\"><img ng-src=\"{{ file.url }}\"/><div ng-if=\"file.unreadMessages &gt; 0\" class=\"notification absolute\">{{ file.unreadMessages }}</div></a></button></li></ul></main>");}]);
(function() {
  'use strict';
  var SubmissionsController;

  SubmissionsController = function(helpers, $scope, $rootScope, $state, StepsService, SubmissionsService) {
    var activate, config, getStepRef, onChange, vm;
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
      config.defaultStatus = 'scheduled';
    }
    if ($scope.stepType === 'completeDesigns') {
      config.stepType = 'completeDesigns';
      config.stepName = 'Complete Designs';
      config.prevStepType = 'designConcepts';
      config.prevStepName = 'Design Concepts';
      config.nextStepType = 'finalFixes';
      config.nextStepName = 'Final Fixes';
      config.timeline = ['', 'active', ''];
      config.defaultStatus = 'scheduled';
    }
    config.rankNames = ['1st Place', '2nd Place', '3rd Place', '4th Place', '5th Place', '6th Place', '7th Place', '8th Place', '9th Place', '10th Place'];
    vm.loaded = false;
    vm.timeline = config.timeline;
    vm.stepName = config.stepName;
    vm.status = null;
    vm.allFilled = false;
    vm.submissions = [];
    vm.ranks = [];
    vm.projectId = $scope.projectId;
    vm.stepId = $scope.stepId;
    vm.userType = $scope.userType;
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
      if (step) {
        return $state.href('step', {
          projectId: projectId,
          stepId: step.id
        });
      } else {
        return null;
      }
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
      currentStep = helpers.findInCollection(steps, 'id', vm.stepId);
      prevStep = helpers.findInCollection(steps, 'stepType', config.prevStepType);
      nextStep = helpers.findInCollection(steps, 'stepType', config.nextStepType);
      vm.startsAt = currentStep.startsAt;
      vm.endsAt = currentStep.endsAt;
      vm.prevStepRef = getStepRef(vm.projectId, prevStep);
      vm.nextStepRef = getStepRef(vm.projectId, nextStep);
      vm.submissions = helpers.decorateSubmissionsWithRanks(submissions, currentStep.details.rankedSubmissions);
      vm.submissions = helpers.sortSubmissions(vm.submissions);
      vm.submissions = helpers.decorateSubmissionsWithMessageCounts(vm.submissions);
      vm.rankNames = config.rankNames.slice(0, currentStep.details.numberOfRanks);
      vm.ranks = helpers.makeEmptyRankList(vm.rankNames);
      vm.ranks = helpers.decorateRankListWithSubmissions(vm.ranks, vm.submissions);
      if (currentStep.rankedSubmissions_error) {
        vm.rankUpdateError = currentStep.rankedSubmissions_error;
      }
      vm.allFilled = currentStep.details.rankedSubmissions.length === currentStep.details.numberOfRanks;
      vm.status = config.defaultStatus;
      if (Date.now() > new Date(currentStep.startsAt)) {
        vm.status = 'open';
      }
      if (currentStep.details.customerConfirmedRanks) {
        return vm.status = 'closed';
      }
    };
    activate();
    return vm;
  };

  SubmissionsController.$inject = ['SubmissionsHelpers', '$scope', '$rootScope', '$state', 'StepsService', 'SubmissionsService'];

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
  var SubmissionsHelpers, createOrderedRankList, decorateFileWithMessageCounts, decorateRankListWithSubmissions, decorateSubmissionWithMessageCounts, decorateSubmissionWithRank, decorateSubmissionsWithMessageCounts, decorateSubmissionsWithRanks, findInCollection, makeEmptyRankList, removeBlankAfterN, sortSubmissions, updateRankedSubmissions;

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

  decorateSubmissionWithRank = function(submission, rankedSubmissions) {
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

  decorateSubmissionsWithRanks = function(submissions, rankedSubmissions) {
    if (rankedSubmissions == null) {
      rankedSubmissions = [];
    }
    submissions.forEach(function(submission) {
      return submission = decorateSubmissionWithRank(submission, rankedSubmissions);
    });
    return submissions;
  };

  decorateFileWithMessageCounts = function(file) {
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

  decorateSubmissionWithMessageCounts = function(submission) {
    submission.totalMessages = 0;
    submission.unreadMessages = 0;
    submission.files.forEach(function(file) {
      decorateFileWithMessageCounts(file);
      submission.totalMessages = submission.totalMessages + file.totalMessages;
      return submission.unreadMessages = submission.unreadMessages + file.unreadMessages;
    });
    return submission;
  };

  decorateSubmissionsWithMessageCounts = function(submissions) {
    submissions.forEach(function(submission) {
      return submission = decorateSubmissionWithMessageCounts(submission);
    });
    return submissions;
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

  decorateRankListWithSubmissions = function(ranks, submissions) {
    if (ranks == null) {
      ranks = [];
    }
    if (submissions == null) {
      submissions = [];
    }
    submissions.forEach(function(submission) {
      var submissionRank;
      if (submission.rank !== '') {
        submissionRank = submission.rank - 1;
        if (submissionRank < ranks.length) {
          ranks[submissionRank].avatarUrl = submission.submitter.avatar;
          ranks[submissionRank].id = submission.id;
          return ranks[submissionRank].handle = submission.submitter.handle;
        }
      }
    });
    return ranks;
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

  SubmissionsHelpers = function() {
    var submissionsHelpers;
    submissionsHelpers = {
      findInCollection: findInCollection,
      createOrderedRankList: createOrderedRankList,
      removeBlankAfterN: removeBlankAfterN,
      updateRankedSubmissions: updateRankedSubmissions,
      decorateSubmissionWithRank: decorateSubmissionWithRank,
      decorateSubmissionsWithRanks: decorateSubmissionsWithRanks,
      decorateFileWithMessageCounts: decorateFileWithMessageCounts,
      decorateSubmissionWithMessageCounts: decorateSubmissionWithMessageCounts,
      decorateSubmissionsWithMessageCounts: decorateSubmissionsWithMessageCounts,
      sortSubmissions: sortSubmissions,
      decorateRankListWithSubmissions: decorateRankListWithSubmissions,
      makeEmptyRankList: makeEmptyRankList
    };
    return submissionsHelpers;
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
    config.prevStepState = 'complete-designs';
    config.nextStepType = null;
    config.nextStepName = null;
    config.nextStepState = null;
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
      if (step) {
        return $state.href('step', {
          projectId: projectId,
          stepId: step.id
        });
      } else {
        return null;
      }
    };
    onChange = function() {
      var currentStep, prevStep, steps, submissions;
      steps = StepsService.get(vm.projectId);
      submissions = SubmissionsService.get(vm.projectId, vm.stepId);
      if (steps._pending || submissions._pending) {
        vm.loaded = false;
        return null;
      }
      vm.loaded = true;
      currentStep = helpers.findInCollection(steps, 'stepType', config.stepType);
      prevStep = helpers.findInCollection(steps, 'stepType', config.prevStepType);
      vm.startsAt = currentStep.startsAt;
      vm.endsAt = currentStep.endsAt;
      vm.prevStepRef = getStepRef(vm.projectId, prevStep);
      vm.submission = helpers.decorateSubmissionWithMessageCounts(submissions[0]);
      vm.status = config.defaultStatus;
      if (Date.now() > new Date(currentStep.startsAt)) {
        vm.status = 'open';
      }
      if (currentStep.customerAcceptedFixes) {
        return vm.status = 'closed';
      }
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
      var currentStep, steps, submissions;
      steps = StepsService.get(vm.projectId);
      submissions = SubmissionsService.get(vm.projectId, vm.stepId);
      if (steps._pending || submissions._pending) {
        vm.loaded = false;
        return null;
      }
      vm.loaded = true;
      currentStep = helpers.findInCollection(steps, 'id', vm.stepId);
      vm.submission = helpers.findInCollection(submissions, 'id', vm.submissionId);
      vm.submission = helpers.decorateSubmissionWithRank(vm.submission, currentStep.details.rankedSubmissions);
      vm.submission = helpers.decorateSubmissionWithMessageCounts(vm.submission);
      vm.rankNames = config.rankNames.slice(0, currentStep.details.numberOfRanks);
      vm.ranks = helpers.makeEmptyRankList(vm.rankNames);
      vm.ranks = helpers.decorateRankListWithSubmissions(vm.ranks, vm.submissions);
      vm.allFilled = currentStep.details.rankedSubmissions.length === currentStep.details.numberOfRanks;
      return vm.allFilled = currentStep.details.rankedSubmissions.length === currentStep.details.numberOfRanks;
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

  FileDetailController = function(helpers, $scope, $rootScope, SubmissionsService, UserV3Service) {
    var activate, onChange, vm;
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
    vm.userId = UserV3Service.getCurrentUser().id;
    vm.avatars = {};
    activate = function() {
      return SubmissionsService.subscribe($scope, onChange);
    };
    vm.sendMessage = function() {
      if (vm.newMessage) {
        SubmissionsService.sendMessage(vm.submissionId, vm.fileId, vm.newMessage, vm.userId);
        return vm.newMessage = '';
      }
    };
    vm.toggleComments = function() {
      vm.showComments = !vm.showComments;
      if (vm.showComments && vm.file.unreadMessages > 0) {
        return SubmissionsService.markMessagesAsRead(vm.submissionId, vm.fileId, vm.userId);
      }
    };
    onChange = function() {
      var currentIndex, nextIndex, prevIndex, ref, submissions;
      submissions = SubmissionsService.get(vm.projectId, vm.stepId);
      if (submissions._pending) {
        vm.loaded = false;
        return null;
      }
      vm.loaded = true;
      vm.submission = helpers.findInCollection(submissions, 'id', vm.submissionId);
      vm.submission = helpers.decorateSubmissionWithMessageCounts(vm.submission);
      vm.file = helpers.findInCollection(vm.submission.files, 'id', vm.fileId);
      vm.messages = ((ref = vm.file.threads[0]) != null ? ref.messages : void 0) || [];
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
      return vm.nextFile = vm.submission.files[nextIndex];
    };
    activate();
    return vm;
  };

  FileDetailController.$inject = ['SubmissionsHelpers', '$scope', '$rootScope', 'SubmissionsService', 'UserV3Service'];

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
