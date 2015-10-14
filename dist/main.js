(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-ui-components', 'appirio-tech-ng-auth', 'appirio-tech-ng-optimist', angularDragula(angular)];

  angular.module('appirio-tech-submissions', dependencies);

}).call(this);

angular.module("appirio-tech-submissions").run(["$templateCache", function($templateCache) {$templateCache.put("views/submissions.directive.html","<loader ng-hide=\"vm.loaded\"></loader><ul class=\"header flex-center\"><li class=\"previous\"><a ng-if=\"vm.prevStepRef\" href=\"{{ vm.prevStepRef }}\">&lt;</a></li><li><h1>{{ vm.stepName }}</h1></li><li class=\"next\"><a ng-if=\"vm.nextStepRef\" href=\"{{ vm.nextStepRef }}\">&gt;</a></li></ul><div ng-if=\"vm.status == \'scheduled\'\" class=\"subheader\"><div class=\"icon warning biggest\"></div><p>Submissions for the {{ vm.stepName }} Phase coming in &hellip;</p><countdown end=\"{{ vm.startsAt }}\"></countdown></div><div ng-if=\"vm.status == \'closed\'\" class=\"subheader\"><p>Congratulations! These are your {{ vm.stepName }} winners.</p><hr class=\"small\"/><ul class=\"winners\"><li ng-repeat=\"rank in vm.ranks\"><div class=\"rank\"><strong>{{rank.label.slice(0, -5)}}</strong><br /> place</div><avatar avatar-url=\"{{rank.avatarUrl}}\"></avatar><a href=\"#\" class=\"name\">{{rank.handle}}</a></li></ul><button class=\"wider action\">view submissions</button></div><div ng-if=\"vm.status == \'open\'\" class=\"subheader\"><p>Give feedback and select the top {{ vm.ranks.length }} designs. You have <countdown end=\"{{vm.endsAt}}\"></countdown> \nto give feedback.</p><ul class=\"top-selection\"><li ng-repeat=\"rank in vm.ranks track by $index\"><div dragula=\"\'ranked-submissions\'\" dragula-scope=\"$parent\" ng-class=\"{ \'has-avatar\': rank.avatarUrl }\" data-rank=\"{{ $index }}\" class=\"shell\"><div ng-if=\"rank.avatarUrl\" data-id=\"{{ rank.id }}\" class=\"draggable\"><avatar avatar-url=\"{{ rank.avatarUrl }}\"></avatar><div class=\"rank\">{{ rank.value }}</div></div><div ng-if=\"!rank.avatarUrl\" class=\"rank\">{{ rank.value }}</div></div></li><li ng-if=\"vm.rankUpdatePending\"><div class=\"loader\"></div></li><li ng-show=\"vm.allFilled\"><button ng-click=\"vm.confirmRanks()\" class=\"action\">Confirm your selections </button></li></ul><p ng-if=\"vm.rankUpdateError\">{{ vm.rankUpdateError }}</p></div><ul class=\"submissions\"><li ng-repeat=\"submission in vm.submissions track by $index\" class=\"submission flex elevated-bottom\"><ul class=\"user-details flex middle\"><li><avatar avatar-url=\"{{ submission.submitter.avatar }}\"></avatar></li><li><div class=\"name-time\"><div class=\"name\">{{ submission.submitter.handle }}</div><time>{{ submission.createdAt | timeLapse }}</time></div></li></ul><ul class=\"thumbnails flex-grow\"><li ng-repeat=\"file in submission.files track by $index\" class=\"thumbnail\"><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: submission.id, fileId: file.id})\"><img ng-src=\"{{ file.url }}\" class=\"img\"/></a><div class=\"pop-over elevated\"><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: submission.id, fileId: file.id})\" class=\"preview\"><img ng-src=\"{{ file.url }}\" class=\"previewImage\"/></a><div class=\"icon bubble\"></div><a href=\"{{ file.url }}\" target=\"_blank\"><div class=\"clean icon download\"></div></a></div></li></ul><ul class=\"actions flex middle\"><li><a ui-sref=\"submission-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: submission.id})\">view all</a></li><li class=\"comments\"><div class=\"icon download small\"></div></li><li ng-if=\"vm.status == \'closed\' &amp;&amp; submission.rank\"><a href=\"#\" target=\"_blank\"><div class=\"clean icon download\"></div></a></li><li ng-if=\"vm.status == \'open\'\"><select ng-model=\"submission.rank\" ng-change=\"vm.handleRankSelect(submission)\" ng-options=\"rank.value as rank.label for rank in vm.ranks\"></select></li><li ng-if=\"vm.status == \'closed\'\">{{ vm.rankNames[submission.rank -1] }}</li></ul></li></ul>");
$templateCache.put("views/final-fixes.directive.html","<loader ng-show=\"!vm.loaded\"></loader><ul class=\"header flex-center\"><li class=\"previous\"><a ng-if=\"vm.prevStepRef\" href=\"{{ vm.prevStepRef }}\">&lt;</a></li><li><h1>{{ vm.stepName }}</h1></li><li class=\"next\"><a ng-if=\"vm.nextStepRef\" href=\"{{ vm.nextStepRef }}\">&gt;</a></li></ul><div ng-if=\"vm.status == \'scheduled\'\" class=\"subheader\"><div class=\"icon warning biggest\"></div><p>Final Fixes Phase starts in &hellip;</p><countdown end=\"{{ vm.work.phase.startDate }}\"></countdown><hr/><ul class=\"winners\"><li><div class=\"rank\"><strong>winner</strong></div><avatar avatar-url=\"{{vm.submission.submitter.avatar}}\"></avatar><a href=\"#\" class=\"name\">{{vm.submission.submitter.handle}}</a></li></ul></div><div ng-if=\"vm.status == \'closed\'\" class=\"subheader\"><p>Project Complete! Review final submission</p></div><div ng-if=\"vm.status == \'open\'\" class=\"subheader\"><p>Give your final feedback to complete this design project.</p><countdown end=\"{{ vm.work.phase.endDate }}\"></countdown><p class=\"duration\">remaining to give feedback</p></div><button ng-if=\"vm.status == \'open\' || vm.status == \'closed\'\" class=\"action\"><div class=\"icon download smallest\"></div><span>download final submissions</span></button><button ng-click=\"vm.confirmApproval()\" ng-if=\"vm.status == \'open\'\" class=\"action\">confirm final approval</button><ul ng-if=\"vm.status == \'open\' || vm.status == \'closed\'\" class=\"previews\"><li ng-repeat=\"file in vm.submission.files track by $index\" class=\"preview\"><img ng-src=\"{{ file.images.small }}\" ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submission.id, fileId: file.id})\" class=\"img\"/></li></ul>");
$templateCache.put("views/submission-detail.directive.html","<ul class=\"header flex middle\"><li class=\"flex-grow submitter\"><a href=\"\">submissions</a><div class=\"arrow\">&rsaquo;</div><avatar avatar-url=\"{{ vm.submission.submitter.avatar }}\"></avatar><div class=\"name\">{{ vm.submission.submitter.handle }}</div></li><li><select ng-model=\"vm.submission.rank\" ng-change=\"vm.handleRankSelect(vm.submission)\" ng-init=\"\" required=\"required\"><option value=\"\">select position</option><option ng-repeat=\"rank in vm.rankNames\" value=\"$index+1\" ng-selected=\"{{ $index+1 == vm.submission.rank }}\">{{ rank }}</option></select></li><li class=\"download\"><button class=\"clean\"><div class=\"icon download small\"></div></button></li></ul><hr/><ul class=\"previews\"><li ng-repeat=\"file in vm.submission.files track by $index\" class=\"preview\"><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submissionId, fileId: file.id})\"><img ng-src=\"{{ file.images.small }}\" class=\"img\"/></a><p>{{ file.name }}</p></li></ul>");
$templateCache.put("views/file-detail.directive.html","<main><loader ng-show=\"!vm.loaded\"></loader><ul class=\"header\"><li class=\"submitter\"><avatar avatar-url=\"{{ vm.submission.submitter.avatar }}\"></avatar><div class=\"name-time\"><div class=\"name\">{{ vm.submission.submitter.handle }}</div><time>Submitted: {{ vm.submission.createdAt | timeLapse }}</time></div></li><li class=\"icons\"><button class=\"clean\"><a href=\"{{ vm.file.images.full }}\"><div class=\"icon download\"></div></a></button><button ng-click=\"vm.toggleComments()\" class=\"clean\"><div class=\"icon bubble\"></div></button></li></ul><hr/><aside ng-class=\"{ active: vm.showComments }\" class=\"messaging\"><h4>Submission comments</h4><hr/><ul class=\"messages\"><li ng-repeat=\"message in vm.messages track by $index\"><avatar avatar-url=\"{{ vm.avatars[message.publisherId] }}\"></avatar><div class=\"message\"><p>{{ message.body }}</p><time>{{ message.createdAt | timeLapse }}</time></div></li></ul><form ng-submit=\"vm.sendMessage()\"><textarea placeholder=\"Send a message&hellip;\" ng-model=\"vm.newMessage\"></textarea><button type=\"submit\" class=\"enter\">Enter</button></form></aside><ul class=\"slideshow\"><li><a ng-if=\"vm.prevFile\" ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submission.id, fileId: vm.prevFile.id})\"><button class=\"clean icon circle-arrow biggest\"></button></a></li><li class=\"preview\"><div class=\"img-container\"><img ng-src=\"{{ vm.file.images.large }}\"/></div><p>{{ vm.submission.files[vm.selectedPreviewIndex].name }}</p></li><li><a ng-if=\"vm.nextFile\" ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submission.id, fileId: vm.nextFile.id})\"><button class=\"clean icon circle-arrow right biggest\"></button></a></li></ul><ul class=\"thumbnails\"><li ng-repeat=\"file in vm.submission.files\" class=\"thumbnail\"><button class=\"clean thumbnail\"><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submission.id, fileId: file.id})\"><img ng-src=\"{{ file.images.thumbnail }}\"/><div class=\"notification\">{{ file.unreadMessages }}</div></a></button></li></ul></main>");}]);
(function() {
  'use strict';
  var SubmissionsController;

  SubmissionsController = function(helpers, $scope, $rootScope, $state, dragulaService, StepsService, SubmissionsService) {
    var activate, config, decorateRankListWithSubmissions, dragulaOptions, handleRankDrop, isDraggable, makeEmptyRankList, onChange, vm;
    vm = this;
    config = {};
    if ($scope.stepType === 'designConcepts') {
      config.stepType = 'designConcepts';
      config.stepName = 'Design Concepts';
      config.prevStepType = null;
      config.prevStepName = null;
      config.prevStepState = null;
      config.nextStepType = 'completeDesigns';
      config.nextStepName = 'Complete Designs';
      config.nextStepState = 'complete-designs';
      config.timeline = ['active', '', ''];
      config.defaultStatus = 'scheduled';
    }
    if ($scope.stepType === 'completeDesigns') {
      config.stepType = 'completeDesigns';
      config.stepName = 'Complete Designs';
      config.prevStepType = 'designConcepts';
      config.prevStepName = 'Design Concepts';
      config.prevStepState = 'design-concepts';
      config.nextStepType = 'finalFixes';
      config.nextStepName = 'Final Fixes';
      config.nextStepState = 'final-fixes';
      config.timeline = ['', 'active', ''];
      config.defaultStatus = 'scheduled';
    }
    config.rankNames = ['1st Place', '2nd Place', '3rd Place', '4th Place', '5th Place', '6th Place', '7th Place', '8th Place', '9th Place', '10th Place'];
    vm.loaded = false;
    vm.timeline = config.timeline;
    vm.stepName = config.stepName;
    vm.status = config.defaultStatus;
    vm.allFilled = false;
    vm.submissions = [];
    vm.ranks = [];
    vm.projectId = $scope.projectId;
    vm.stepId = $scope.stepId;
    vm.rankUpdatePending = false;
    vm.rankUpdateError = '';
    vm.handleRankSelect = function(submission) {
      return StepsService.updateRank(vm.projectId, vm.stepId, submission.id, submission.rank);
    };
    vm.confirmRanks = function() {
      return StepsService.confirmRanks(vm.projectId, vm.stepId);
    };
    activate = function() {
      var destroyStepsListener, destroySubmissionsListener;
      destroyStepsListener = $rootScope.$on('StepsService:changed', function() {
        return onChange();
      });
      destroySubmissionsListener = $rootScope.$on('SubmissionsService:changed', function() {
        return onChange();
      });
      $scope.$on('$destroy', function() {
        destroyStepsListener();
        return destroySubmissionsListener();
      });
      StepsService.fetch(vm.projectId);
      return SubmissionsService.fetch(vm.projectId, vm.stepId);
    };
    isDraggable = function(el, source, handle) {
      return source.classList.contains('has-avatar');
    };
    dragulaOptions = {
      moves: isDraggable,
      copy: true
    };
    dragulaService.options($scope, 'ranked-submissions', dragulaOptions);
    handleRankDrop = function(el, target, source) {
      var movedSubmissionId, rankToAssign;
      if (!source) {
        return false;
      }
      movedSubmissionId = target[0].dataset.id;
      rankToAssign = (parseInt(source[0].dataset.rank) + 1) + '';
      return StepsService.updateRank(vm.projectId, vm.stepId, movedSubmissionId, rankToAssign);
    };
    $scope.$on('ranked-submissions.drop', handleRankDrop);
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
    onChange = function() {
      var currentStep, nextStep, prevStep, stepParams, steps, submissions;
      steps = StepsService.get();
      submissions = SubmissionsService.get();
      if (steps.length <= 0 || submissions.length <= 0) {
        return null;
      }
      vm.loaded = true;
      currentStep = helpers.findInCollection(steps, 'stepType', config.stepType);
      prevStep = helpers.findInCollection(steps, 'stepType', config.prevStepType);
      nextStep = helpers.findInCollection(steps, 'stepType', config.nextStepType);
      vm.startsAt = currentStep.startsAt;
      vm.endsAt = currentStep.endsAt;
      stepParams = {
        projectId: $scope.projectId,
        stepId: $scope.stepId
      };
      vm.prevStepRef = $state.href(config.prevStepState, stepParams);
      vm.nextStepRef = $state.href(config.nextStepState, stepParams);
      vm.submissions = angular.copy(submissions);
      vm.submissions = helpers.decorateSubmissionsWithRanks(vm.submissions, currentStep.details.rankedSubmissions);
      vm.submissions = helpers.sortSubmissions(vm.submissions);
      vm.submissions = helpers.decorateSubmissionsWithMessageCounts(vm.submissions);
      vm.rankNames = config.rankNames.slice(0, currentStep.details.numberOfRanks);
      vm.ranks = makeEmptyRankList(vm.rankNames);
      vm.ranks = decorateRankListWithSubmissions(vm.ranks, vm.submissions);
      vm.rankUpdatePending = currentStep.details.rankedSubmissions_pending;
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

  SubmissionsController.$inject = ['SubmissionsHelpers', '$scope', '$rootScope', '$state', 'dragulaService', 'StepsService', 'SubmissionsService'];

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
        projectId: '@projectId',
        stepId: '@stepId',
        stepType: '@stepType'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('submissions', directive);

}).call(this);

(function() {
  'use strict';
  var createOrderedRankList, decorateFileWithMessageCounts, decorateSubmissionWithMessageCounts, decorateSubmissionWithRank, decorateSubmissionsWithMessageCounts, decorateSubmissionsWithRanks, findInCollection, removeBlankAfterN, sortSubmissions, srv, updateRankedSubmissions;

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

  srv = function() {
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
      sortSubmissions: sortSubmissions
    };
    return submissionsHelpers;
  };

  srv.$inject = [];

  angular.module('appirio-tech-submissions').factory('SubmissionsHelpers', srv);

}).call(this);

(function() {
  'use strict';
  var srv;

  srv = function($rootScope, helpers, StepsAPIService, OptimistCollection) {
    var acceptFixes, confirmRanks, createStepCollection, currentProjectId, fetch, get, steps, updateRank, updateStep;
    currentProjectId = null;
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
    steps = createStepCollection();
    get = function() {
      return steps.get();
    };
    fetch = function(projectId) {
      var apiCall;
      if (projectId !== currentProjectId) {
        steps = createStepCollection();
        currentProjectId = projectId;
      }
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
      fetch: fetch,
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

  SubmissionsService = function($rootScope, helpers, StepsAPIService, SubmissionsAPIService, MessagesAPIService, SubmissionsMessagesAPIService, OptimistCollection) {
    var createSubmissionCollection, currentProjectId, currentStepId, emitUpdates, fetch, get, markMessagesAsRead, sendMessage, submissions;
    currentProjectId = null;
    currentStepId = null;
    emitUpdates = function() {
      return $rootScope.$emit('SubmissionsService:changed');
    };
    createSubmissionCollection = function() {
      var newSteps;
      newSteps = new OptimistCollection({
        updateCallback: emitUpdates,
        propsToIgnore: ['$promise', '$resolved']
      });
      return newSteps;
    };
    submissions = createSubmissionCollection();
    get = function() {
      return submissions.get();
    };
    fetch = function(projectId, stepId) {
      var apiCall;
      if (projectId !== currentProjectId || stepId !== currentStepId) {
        submissions = createSubmissionCollection();
        currentProjectId = projectId;
        currentStepId = stepId;
      }
      apiCall = function() {
        var params;
        params = {
          projectId: projectId,
          stepId: stepId
        };
        return SubmissionsAPIService.query(params).$promise;
      };
      return submissions.fetch({
        apiCall: apiCall
      });
    };
    markMessagesAsRead = function(submissionId, fileId, userId) {
      var file, files, messages, ref, submission, submissionData, updateMade;
      submission = submissions.findWhere({
        id: submissionId
      })[0];
      submissionData = submission.get();
      files = submissionData.files;
      file = helpers.findInCollection(files, 'id', fileId);
      messages = (ref = file.threads[0]) != null ? ref.messages : void 0;
      updateMade = false;
      messages.forEach(function(message) {
        var body, params;
        if (!message.read) {
          updateMade = true;
          message.read = true;
          params = {
            id: message.id
          };
          body = {
            read: true,
            subscriberId: userId
          };
          return MessagesAPIService.put(params, body).$promise;
        }
      });
      if (updateMade) {
        return submission.updateLocal({
          updates: {
            read: true
          }
        });
      }
    };
    sendMessage = function(submissionId, fileId, message, userId) {
      var apiCall, currentFile, currentSubmission, currentSubmissions, messages, newMessage, now, params, ref, ref1;
      currentSubmissions = submissions.get();
      currentSubmission = helpers.findInCollection(currentSubmissions, 'id', submissionId);
      currentFile = helpers.findInCollection(currentSubmission.files, 'id', fileId);
      messages = (ref = currentFile.threads[0]) != null ? ref.messages : void 0;
      now = new Date();
      newMessage = {
        publisherId: userId,
        body: message,
        createdAt: now.toISOString(),
        read: true
      };
      params = {
        projectId: currentProjectId,
        submissionId: currentSubmission.id,
        threadId: (ref1 = currentFile.threads[0]) != null ? ref1.id : void 0
      };
      apiCall = function(message) {
        return SubmissionsMessagesAPIService.post(params, message).$promise;
      };
      return OptimistCollection.addToCollection({
        collection: messages,
        item: newMessage,
        apiCall: apiCall,
        updateCallback: emitUpdates
      });
    };
    return {
      get: get,
      fetch: fetch,
      markMessagesAsRead: markMessagesAsRead,
      sendMessage: sendMessage
    };
  };

  SubmissionsService.$inject = ['$rootScope', 'SubmissionsHelpers', 'StepsAPIService', 'SubmissionsAPIService', 'MessagesAPIService', 'SubmissionsMessagesAPIService', 'OptimistCollection'];

  angular.module('appirio-tech-submissions').factory('SubmissionsService', SubmissionsService);

}).call(this);

(function() {
  'use strict';
  var FinalFixesController;

  FinalFixesController = function(helpers, $scope, $rootScope, $state, StepsService, SubmissionsService) {
    var activate, config, onChange, vm;
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
    vm.confirmApproval = function() {
      return StepsService.acceptFixes(vm.projectId, vm.stepId);
    };
    activate = function() {
      var destroyStepsListener, destroySubmissionsListener;
      destroyStepsListener = $rootScope.$on('StepsService:changed', function() {
        return onChange();
      });
      destroySubmissionsListener = $rootScope.$on('SubmissionsService:changed', function() {
        return onChange();
      });
      $scope.$on('$destroy', function() {
        destroyStepsListener();
        return destroySubmissionsListener();
      });
      StepsService.fetch(vm.projectId);
      return SubmissionsService.fetch(vm.projectId, vm.stepId);
    };
    vm.onchange = onChange = function() {
      var currentStep, prevStep, stepParams, steps, submissions;
      steps = StepsService.get();
      submissions = SubmissionsService.get();
      if (steps.length <= 0 || submissions.length <= 0) {
        return null;
      }
      vm.loaded = true;
      currentStep = helpers.findInCollection(steps, 'stepType', config.stepType);
      prevStep = helpers.findInCollection(steps, 'stepType', config.prevStepType);
      vm.startsAt = currentStep.startsAt;
      vm.endsAt = currentStep.endsAt;
      stepParams = {
        projectId: vm.projectId,
        stepId: vm.stepId
      };
      vm.prevStepRef = $state.href(config.prevStepState, stepParams);
      vm.submission = angular.copy(submissions[0]);
      vm.submission = helpers.decorateSubmissionWithMessageCounts(vm.submission);
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
        projectId: '@projectId',
        stepId: '@stepId'
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
    vm.handleRankSelect = function(submission) {
      return StepsService.updateRank(vm.projectId, vm.stepId, submission.id, submission.rank);
    };
    activate = function() {
      var destroyStepsListener, destroySubmissionsListener;
      destroyStepsListener = $rootScope.$on('StepsService:changed', function() {
        return onChange();
      });
      destroySubmissionsListener = $rootScope.$on('SubmissionsService:changed', function() {
        return onChange();
      });
      $scope.$on('$destroy', function() {
        destroyStepsListener();
        return destroySubmissionsListener();
      });
      StepsService.fetch(vm.projectId);
      return SubmissionsService.fetch(vm.projectId, vm.stepId);
    };
    onChange = function() {
      var currentStep, currentSubmission, steps, submissions;
      steps = StepsService.get();
      submissions = SubmissionsService.get();
      if (steps.length <= 0 || submissions.length <= 0) {
        return null;
      }
      vm.loaded = true;
      currentStep = helpers.findInCollection(steps, 'id', vm.stepId);
      currentSubmission = helpers.findInCollection(submissions, 'id', vm.submissionId);
      vm.submission = angular.copy(currentSubmission);
      vm.submission = helpers.decorateSubmissionWithRank(vm.submission, currentStep.details.rankedSubmissions);
      vm.submission = helpers.decorateSubmissionWithMessageCounts(vm.submission);
      vm.rankNames = config.rankNames.slice(0, currentStep.details.numberOfRanks);
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
        projectId: '@projectId',
        stepId: '@stepId',
        submissionId: '@submissionId'
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
    vm.messages = [];
    vm.newMessage = '';
    vm.showMessages = false;
    vm.userId = null;
    vm.avatars = {};
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
    activate = function() {
      var destroySubmissionsListener;
      destroySubmissionsListener = $rootScope.$on('SubmissionsService:changed', function() {
        return onChange();
      });
      $scope.$on('$destroy', function() {
        return destroySubmissionsListener();
      });
      $scope.$watch(UserV3Service.getCurrentUser, function(user) {
        return vm.userId = user != null ? user.id : void 0;
      });
      return SubmissionsService.fetch(vm.projectId, vm.stepId);
    };
    onChange = function() {
      var currentIndex, currentSubmission, nextIndex, prevIndex, ref, submissions;
      submissions = SubmissionsService.get();
      if (submissions.length <= 0) {
        return null;
      }
      vm.loaded = true;
      currentSubmission = helpers.findInCollection(submissions, 'id', vm.submissionId);
      vm.submission = angular.copy(currentSubmission);
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
        projectId: '@projectId',
        stepId: '@stepId',
        fileId: '@fileId',
        submissionId: '@submissionId'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('fileDetail', directive);

}).call(this);
