(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-ui-components', 'appirio-tech-ng-auth', 'appirio-tech-messaging', angularDragula(angular)];

  angular.module('appirio-tech-submissions', dependencies);

}).call(this);

angular.module("appirio-tech-submissions").run(["$templateCache", function($templateCache) {$templateCache.put("views/submissions.directive.html","<loader ng-hide=\"vm.loaded\"></loader><ul class=\"header\"><li class=\"previous\"><a ng-if=\"vm.prevStepRef\" href=\"{{ vm.prevStepRef }}\">&lt;</a></li><li><h1>{{ vm.stepName }}</h1></li><li class=\"next\"><a ng-if=\"vm.nextStepRef\" href=\"{{ vm.nextStepRef }}\">&gt;</a></li></ul><ul class=\"timeline\"><li ng-repeat=\"phase in vm.timeline track by $index\" ng-class=\"phase\"></li></ul><section ng-if=\"vm.status == \'scheduled\'\"><h4>Submissions for the {{ vm.stepName }} Phase coming in &hellip;</h4><countdown end=\"{{ vm.startsAt }}\"></countdown></section><section ng-if=\"vm.status == \'closed\'\"><h4>Congratulations! These are your {{ vm.stepName }} winners.</h4><ul class=\"top-selection\"><li ng-repeat=\"rank in vm.ranks\"><div class=\"shell has-avatar\"><div class=\"draggable\"><avatar avatar-url=\"{{ rank.avatarUrl }}\"></avatar><div class=\"overlay\"><span>{{ rank.value }}</span></div></div></div></li></ul><countdown end=\"{{ vm.endsAt }}\"></countdown></section><section ng-if=\"vm.status == \'open\'\"><h4>Give feedback and select the top {{ vm.ranks.length }} designs.</h4><p class=\"duration\">remaining to give feedback</p><ul class=\"top-selection\"><li ng-repeat=\"rank in vm.ranks\"><div dragula=\"\'ranked-submissions\'\" dragula-scope=\"$parent\" ng-class=\"{ \'has-avatar\': rank.avatarUrl }\" data-rank=\"{{ $index }}\" class=\"shell\"><div ng-if=\"rank.avatarUrl\" data-id=\"{{ rank.id }}\" class=\"draggable\"><avatar avatar-url=\"{{ rank.avatarUrl }}\"></avatar><div class=\"overlay\"><span>{{ rank.value }}</span></div></div><div ng-if=\"!rank.avatarUrl\" class=\"overlay\"><span>{{ rank.value }}</span></div></div></li></ul><button ng-show=\"vm.allFilled\" ng-click=\"vm.confirmRanks()\" class=\"confirm info\">Confirm your selections </button><hr/><ul class=\"submissions color-even\"><li ng-repeat=\"submission in vm.submissions track by $index\" class=\"submission\"><ul class=\"user-details\"><li><avatar avatar-url=\"{{ submission.submitter.avatar }}\"></avatar></li><li><div class=\"name-time\"><div class=\"name\">{{ submission.submitter.handle }}</div><time>{{ submission.createdAt | timeLapse }}</time></div></li></ul><ul class=\"thumbnails\"><li ng-repeat=\"file in submission.files track by $index\" class=\"thumbnail\"><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: submission.id, fileId: file.id})\"><img ng-src=\"{{ file.images.thumbnail }}\" class=\"img\"/></a><div class=\"pop-over\"><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: submission.id, fileId: file.id})\"><img ng-src=\"{{ file.images.large }}\" class=\"previewImage\"/></a><ul class=\"previewActions\"><li class=\"comments\"><div class=\"comments\">20/28<div class=\"icon bubble\"></div></div></li><li class=\"download\"><button><a href=\"{{ file.images.full }}\" target=\"_blank\"><div class=\"clean icon download\"></div></a></button></li></ul></div></li></ul><ul class=\"actions\"><li><a ui-sref=\"submission-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: submission.id})\">view all ({{ submission.files.length }})</a></li><li class=\"comments\">{{ submission.unreadMessages }}/{{ submission.totalMessages }}<div class=\"icon bubble\"></div></li><li><select ng-model=\"submission.rank\" ng-change=\"vm.handleRankSelect(submission)\" ng-init=\"\"><option ng-repeat=\"rank in vm.rankNames\" value=\"{{ $index + 1 }}\" ng-selected=\"{{ $index + 1 == submission.rank }}\">{{ rank }}</option></select></li></ul></li></ul></section>");
$templateCache.put("views/final-fixes.directive.html","<loader ng-show=\"!vm.loaded\"></loader><ul class=\"header\"><li class=\"previous\"><a ng-if=\"vm.prevStepRef\" href=\"{{ vm.prevStepRef }}\">&lt;</a></li><li><h1>{{ vm.stepName }}</h1></li><li class=\"next\"><a ng-if=\"vm.nextStepRef\" href=\"{{ vm.nextStepRef }}\">&gt;</a></li></ul><ul class=\"timeline\"><li ng-repeat=\"phase in vm.timeline track by $index\" ng-class=\"phase\"></li></ul><section ng-if=\"vm.status == \'scheduled\'\"><h4>Final Fixes Phase starts in &hellip;</h4><countdown end=\"{{ vm.work.phase.startDate }}\"></countdown></section><section ng-if=\"vm.status == \'closed\'\"><h4>Project Complete! Review final submission</h4></section><section ng-if=\"vm.status == \'open\'\"><h4 ng-if=\"!vm.approvalConfirmed\">Give final feedback and accept the submission to complete the project.</h4><countdown end=\"{{ vm.work.phase.endDate }}\"></countdown><p class=\"duration\">remaining to give feedback</p></section><section ng-if=\"vm.status == \'open\' || vm.status == \'closed\'\"><ul class=\"winner\"><li class=\"download\"><button class=\"clean\"><a href=\"{{ vm.submission.downloadUrl }}\"><div class=\"icon download\"></div></a></button></li><li><a href=\"{{ vm.submission.downloadUrl }}\">Download final submission</a></li><li><a ui-sref=\"submission-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: \'winner\' })\">View previous submission comments</a></li></ul><ul ng-if=\"vm.status == \'open\'\" class=\"approval\"><li class=\"confirm\"><button ng-click=\"vm.confirmApproval()\" class=\"info\">Confirm final approval</button></li></ul><hr/><ul class=\"previews\"><li ng-repeat=\"file in vm.submission.files track by $index\" class=\"preview\"><ul class=\"icons\"><li class=\"notification\"><button class=\"clean\"><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submission.id, fileId: file.id})\">{{ file.unreadMessages }}</a></button></li><li><button class=\"clean\"><a href=\"{{ file.images.full }}\" target=\"_blank\"><div class=\"icon download smallest\"></div></a></button></li></ul><img ng-src=\"{{ file.images.small }}\" ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submission.id, fileId: file.id})\" class=\"img\"/><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submission.id, fileId: file.id})\">{{ file.name }}</a></li></ul></section>");
$templateCache.put("views/submission-detail.directive.html","<ul class=\"actions\"><li class=\"submitter\"><avatar avatar-url=\"{{ vm.submission.submitter.avatar }}\"></avatar><div class=\"name-time\"><div class=\"name\">{{ vm.submission.submitter.handle }}</div><time>{{ vm.submission.createdAt | timeLapse }}</time></div></li><li class=\"position\"><select ng-model=\"vm.submission.rank\" ng-change=\"vm.handleRankSelect(vm.submission)\" ng-init=\"\"><option ng-repeat=\"rank in vm.rankNames\" value=\"{{ $index + 1 }}\" ng-selected=\"{{ $index + 1 == vm.submission.rank }}\">{{ rank }}</option></select></li><li class=\"submissionsCount\"><p>{{ vm.submission.files.length }} Submissions</p></li></ul><ul class=\"previews\"><li ng-repeat=\"file in vm.submission.files track by $index\" class=\"preview\"><ul class=\"icons\"><li class=\"notification\"><button class=\"clean\"><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submissionId, fileId: file.id})\">{{ file.unreadMessages }}</a></button></li></ul><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submissionId, fileId: file.id})\"><img ng-src=\"{{ file.images.small }}\" class=\"img\"/></a><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submissionId, fileId: file.id})\">{{ file.name }}</a></li></ul>");
$templateCache.put("views/file-detail.directive.html","<main><loader ng-show=\"!vm.loaded\"></loader><ul class=\"header\"><li class=\"submitter\"><avatar avatar-url=\"{{ vm.submission.submitter.avatar }}\"></avatar><div class=\"name-time\"><div class=\"name\">{{ vm.submission.submitter.handle }}</div><time>{{ vm.submission.createdAt | timeLapse }}</time></div></li><li class=\"icons\"><button class=\"clean\"><a href=\"{{ vm.file.images.full }}\"><div class=\"icon download\"></div></a></button><button ng-click=\"vm.showComments = !vm.showComments\" class=\"clean\"><div class=\"icon bubble\"></div></button></li></ul><hr/><ul class=\"slideshow\"><li><a ng-if=\"vm.prevFile\" ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submission.id, fileId: vm.prevFile.id})\"><button class=\"clean icon circle-arrow biggest\"></button></a></li><li class=\"preview\"><div class=\"img-container\"><img ng-src=\"{{ vm.file.images.large }}\"/></div><p>{{ vm.submission.files[vm.selectedPreviewIndex].name }}</p></li><li><a ng-if=\"vm.nextFile\" ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submission.id, fileId: vm.nextFile.id})\"><button class=\"clean icon circle-arrow right biggest\"></button></a></li></ul><ul class=\"thumbnails\"><li ng-repeat=\"file in vm.submission.files\" class=\"thumbnail\"><button class=\"clean thumbnail\"><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submission.id, fileId: file.id})\"><img ng-src=\"{{ file.images.thumbnail }}\"/><div class=\"notification\">{{ file.unreadMessages }}</div></a></button></li></ul></main><aside><messaging ng-class=\"{active:vm.showComments}\" thread-id=\"{{vm.selectedPreview.id}}\" subscriber-id=\"{{vm.subscriberId}}\"></messaging></aside>");}]);
(function() {
  'use strict';
  var SubmissionsController;

  SubmissionsController = function($scope, $state, dragulaService, StepsService, SubmissionsService) {
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
    vm.handleRankSelect = function(submission) {
      var updatePromise;
      StepsService.updateRank(vm.stepId, submission.id, submission.rank);
      onChange();
      updatePromise = StepsService.updateRankRemote(vm.projectId, vm.stepId);
      updatePromise.then(function() {
        return onChange();
      });
      return updatePromise["catch"](function() {
        return console.log('Oops. Something went wrong saving rank update!');
      });
    };
    vm.confirmRanks = function() {
      var updatePromise;
      StepsService.confirmRanks(vm.stepId);
      onChange();
      updatePromise = StepsService.confirmRanksRemote(vm.projectId, vm.stepId);
      updatePromise.then(function() {
        return onChange();
      });
      return updatePromise["catch"](function() {
        return console.log('Oops. Something went wrong confirming ranks!');
      });
    };
    activate = function() {
      var stepsPromise, submissionsPromise;
      stepsPromise = StepsService.fetch(vm.projectId);
      stepsPromise.then(function() {
        return onChange();
      });
      stepsPromise["catch"](function() {
        return console.log("Unable to fetch steps from server. Data may be out of date.");
      });
      submissionsPromise = SubmissionsService.fetch(vm.projectId, vm.stepId);
      submissionsPromise.then(function() {
        return onChange();
      });
      submissionsPromise["catch"](function() {
        return console.log("Unable to fetch submissions from server. Data may be out of date.");
      });
      return onChange();
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
      SubmissionsService.updateRank(vm.stepId, movedSubmissionId, rankToAssign);
      onChange();
      return SubmissionsService.updateRankRemote().then(function() {
        return onChange();
      });
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
            return ranks[submissionRank].id = submission.id;
          }
        }
      });
      return ranks;
    };
    onChange = function() {
      var currentStep, nextStep, prevStep, stepParams, steps, submissions;
      steps = StepsService.steps;
      submissions = SubmissionsService.submissions;
      if (steps.length <= 0 || submissions.length <= 0) {
        return null;
      }
      vm.loaded = true;
      currentStep = StepsService.findInCollection(steps, 'stepType', config.stepType);
      prevStep = StepsService.findInCollection(steps, 'stepType', config.prevStepType);
      nextStep = StepsService.findInCollection(steps, 'stepType', config.nextStepType);
      vm.startsAt = currentStep.startsAt;
      vm.endsAt = currentStep.endsAt;
      stepParams = {
        projectId: $scope.projectId,
        stepId: $scope.stepId
      };
      vm.prevStepRef = $state.href(config.prevStepState, stepParams);
      vm.nextStepRef = $state.href(config.nextStepState, stepParams);
      vm.submissions = angular.copy(submissions);
      vm.submissions = SubmissionsService.decorateSubmissionsWithRanks(vm.submissions, currentStep.rankedSubmissions);
      vm.submissions = SubmissionsService.sortSubmissions(vm.submissions);
      vm.submissions = SubmissionsService.decorateSubmissionsWithUnreadCounts(vm.submissions);
      vm.rankNames = config.rankNames.slice(0, currentStep.numberOfRanks);
      vm.ranks = makeEmptyRankList(vm.rankNames);
      vm.ranks = decorateRankListWithSubmissions(vm.ranks, vm.submissions);
      vm.allFilled = currentStep.rankedSubmissions.length === currentStep.numberOfRanks;
      vm.status = config.defaultStatus;
      if (Date.now() > new Date(currentStep.startsAt)) {
        vm.status = 'open';
      }
      if (currentStep.customerConfirmedRanks) {
        return vm.status = 'closed';
      }
    };
    activate();
    return vm;
  };

  SubmissionsController.$inject = ['$scope', '$state', 'dragulaService', 'StepsService', 'SubmissionsService'];

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
  var createOrderedRankList, findInCollection, removeBlankAfterN, srv, updateRankedSubmissions;

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
          rank: (parseInt(index) + 1) + '',
          submissionId: id
        };
        return rankedSubmissions.push(rankedSubmission);
      }
    });
    return rankedSubmissions;
  };

  srv = function($q, StepsAPIService) {
    var currentProjectId, stepsService;
    currentProjectId = null;
    stepsService = {
      steps: [],
      findInCollection: findInCollection
    };
    stepsService.fetch = function(projectId) {
      var params, resource;
      if (projectId !== currentProjectId) {
        stepsService.steps = [];
        currentProjectId = projectId;
      }
      params = {
        projectId: projectId
      };
      return resource = StepsAPIService.query(params).$promise.then(function(response) {
        return stepsService.steps = response;
      });
    };
    stepsService.updateRank = function(stepId, id, rank) {
      var currentStep, numberOfRanks, rankedSubmissions;
      currentStep = findInCollection(stepsService.steps, 'id', stepId);
      numberOfRanks = currentStep.numberOfRanks;
      rankedSubmissions = currentStep.rankedSubmissions;
      rankedSubmissions = updateRankedSubmissions(rankedSubmissions, numberOfRanks, id, rank);
      return currentStep.rankedSubmissions = rankedSubmissions;
    };
    stepsService.updateRankRemote = function(projectId, stepId) {
      var params, step;
      step = findInCollection(stepsService.steps, 'id', stepId);
      params = {
        projectId: projectId,
        stepId: stepId
      };
      return StepsAPIService.updateRanks(params, step).$promise.then(function(response) {
        return step = response;
      });
    };
    stepsService.confirmRanks = function(stepId) {
      var step;
      step = findInCollection(stepsService.steps, 'id', stepId);
      return step.customerConfirmedRanks = true;
    };
    stepsService.confirmRanksRemote = function(projectId, stepId) {
      var params, step;
      step = findInCollection(stepsService.steps, 'id', stepId);
      params = {
        projectId: projectId,
        stepId: stepId
      };
      return StepsAPIService.confirmRanks(params, step).$promise.then(function(response) {
        return step = response;
      });
    };
    stepsService.acceptFixes = function(stepId) {
      var step;
      step = findInCollection(stepsService.steps, 'id', stepId);
      return step.customerAcceptedFixes = true;
    };
    stepsService.acceptFixesRemote = function(projectId, stepId) {
      var params, step;
      step = findInCollection(stepsService.steps, 'id', stepId);
      params = {
        projectId: projectId,
        stepId: stepId
      };
      return StepsAPIService.confirmRanks(params, step).$promise.then(function(response) {
        return step = response;
      });
    };
    return stepsService;
  };

  srv.$inject = ['$q', 'StepsAPIService'];

  angular.module('appirio-tech-submissions').factory('StepsService', srv);

}).call(this);

(function() {
  'use strict';
  var decorateSubmissionWithRank, decorateSubmissionWithUnreadCounts, decorateSubmissionsWithRanks, decorateSubmissionsWithUnreadCounts, sortSubmissions, srv;

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

  decorateSubmissionWithUnreadCounts = function(submission) {
    submission.files.forEach(function(file) {
      var total, unread;
      total = 0;
      unread = 0;
      file.threads[0].messages.forEach(function(message) {
        total = total + 1;
        if (!message.read) {
          return unread = unread + 1;
        }
      });
      file.totalMessages = total;
      return file.unreadMessages = unread;
    });
    return submission;
  };

  decorateSubmissionsWithUnreadCounts = function(submissions) {
    submissions.forEach(function(submission) {
      return submission = decorateSubmissionWithUnreadCounts(submission);
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

  srv = function($q, StepsAPIService, SubmissionsAPIService) {
    var currentProjectId, currentStepId, submissionsService;
    currentProjectId = null;
    currentStepId = null;
    submissionsService = {
      submissions: [],
      decorateSubmissionsWithRanks: decorateSubmissionsWithRanks,
      decorateSubmissionWithRank: decorateSubmissionWithRank,
      decorateSubmissionsWithUnreadCounts: decorateSubmissionsWithUnreadCounts,
      decorateSubmissionWithUnreadCounts: decorateSubmissionWithUnreadCounts,
      sortSubmissions: sortSubmissions
    };
    submissionsService.fetch = function(projectId, stepId) {
      var params;
      if (projectId !== currentProjectId || stepId !== currentStepId) {
        submissionsService.submissions = [];
        currentProjectId = projectId;
        currentStepId = stepId;
      }
      params = {
        projectId: projectId,
        stepId: stepId
      };
      return SubmissionsAPIService.query(params).$promise.then(function(response) {
        return submissionsService.submissions = response;
      });
    };
    return submissionsService;
  };

  srv.$inject = ['$q', 'StepsAPIService', 'SubmissionsAPIService'];

  angular.module('appirio-tech-submissions').factory('SubmissionsService', srv);

}).call(this);

(function() {
  'use strict';
  var FinalFixesController;

  FinalFixesController = function($scope, $state, StepsService, SubmissionsService) {
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
      var updatePromise;
      StepsService.acceptFixes(vm.stepId);
      onChange();
      updatePromise = StepsService.acceptFixesRemote(vm.projectId, vm.stepId);
      updatePromise.then(function() {
        return onChange();
      });
      return updatePromise["catch"](function() {
        return console.log('Oops. Something went wrong accepting fixes!');
      });
    };
    activate = function() {
      var stepsPromise, submissionsPromise;
      stepsPromise = StepsService.fetch(vm.projectId);
      stepsPromise.then(function() {
        return onChange();
      });
      stepsPromise["catch"](function() {
        return console.log("Unable to fetch steps from server. Data may be out of date.");
      });
      submissionsPromise = SubmissionsService.fetch(vm.projectId, vm.stepId);
      submissionsPromise.then(function() {
        return onChange();
      });
      submissionsPromise["catch"](function() {
        return console.log("Unable to fetch submissions from server. Data may be out of date.");
      });
      return onChange();
    };
    onChange = function() {
      var currentStep, prevStep, stepParams, steps, submissions;
      steps = StepsService.steps;
      submissions = SubmissionsService.submissions;
      if (steps.length <= 0 || submissions.length <= 0) {
        return null;
      }
      vm.loaded = true;
      currentStep = StepsService.findInCollection(steps, 'stepType', config.stepType);
      prevStep = StepsService.findInCollection(steps, 'stepType', config.prevStepType);
      vm.startsAt = currentStep.startsAt;
      vm.endsAt = currentStep.endsAt;
      stepParams = {
        projectId: $scope.projectId,
        stepId: $scope.stepId
      };
      vm.prevStepRef = $state.href(config.prevStepState, stepParams);
      vm.submission = angular.copy(submissions[0]);
      vm.submission = SubmissionsService.decorateSubmissionWithUnreadCounts(vm.submission);
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

  FinalFixesController.$inject = ['$scope', '$state', 'StepsService', 'SubmissionsService'];

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

  SubmissionDetailController = function($scope, StepsService, SubmissionsService) {
    var activate, config, onChange, vm;
    vm = this;
    config = {};
    config.rankNames = ['1st Place', '2nd Place', '3rd Place', '4th Place', '5th Place', '6th Place', '7th Place', '8th Place', '9th Place', '10th Place'];
    vm.loaded = false;
    vm.submission = {};
    vm.allFilled = false;
    vm.projectId = $scope.projectId;
    vm.stepId = $scope.stepId;
    vm.submissionId = $scope.submissionId;
    vm.handleRankSelect = function(submission) {
      var updatePromise;
      StepsService.updateRank(vm.stepId, submission.id, submission.rank);
      onChange();
      updatePromise = StepsService.updateRankRemote(vm.projectId, vm.stepId);
      updatePromise.then(function() {
        return onChange();
      });
      return updatePromise["catch"](function() {
        return console.log('Oops. Something went wrong saving rank update!');
      });
    };
    activate = function() {
      var stepsPromise, submissionsPromise;
      stepsPromise = StepsService.fetch(vm.projectId);
      stepsPromise.then(function() {
        return onChange();
      });
      stepsPromise["catch"](function() {
        return console.log("Unable to fetch steps from server. Data may be out of date.");
      });
      submissionsPromise = SubmissionsService.fetch(vm.projectId, vm.stepId);
      submissionsPromise.then(function() {
        return onChange();
      });
      submissionsPromise["catch"](function() {
        return console.log("Unable to fetch submissions from server. Data may be out of date.");
      });
      return onChange();
    };
    onChange = function() {
      var currentStep, currentSubmission, steps, submissions;
      steps = StepsService.steps;
      submissions = SubmissionsService.submissions;
      if (steps.length <= 0 || submissions.length <= 0) {
        return null;
      }
      vm.loaded = true;
      currentStep = StepsService.findInCollection(steps, 'id', vm.stepId);
      currentSubmission = StepsService.findInCollection(submissions, 'id', vm.submissionId);
      vm.submission = angular.copy(currentSubmission);
      vm.submission = SubmissionsService.decorateSubmissionWithRank(vm.submission, currentStep.rankedSubmissions);
      vm.submission = SubmissionsService.decorateSubmissionWithUnreadCounts(vm.submission);
      vm.rankNames = config.rankNames.slice(0, currentStep.numberOfRanks);
      return vm.allFilled = currentStep.rankedSubmissions.length === currentStep.numberOfRanks;
    };
    activate();
    return vm;
  };

  SubmissionDetailController.$inject = ['$scope', 'StepsService', 'SubmissionsService'];

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

  FileDetailController = function($scope, SubmissionsService) {
    var activate, findInCollection, onChange, vm;
    vm = this;
    vm.loaded = false;
    vm.submission = {};
    vm.file = {};
    vm.prevFile = null;
    vm.nextFile = null;
    vm.showMessages = false;
    vm.projectId = $scope.projectId;
    vm.stepId = $scope.stepId;
    vm.submissionId = $scope.submissionId;
    vm.fileId = $scope.fileId;
    activate = function() {
      var submissionsPromise;
      submissionsPromise = SubmissionsService.fetch(vm.projectId, vm.stepId);
      submissionsPromise.then(function() {
        return onChange();
      });
      submissionsPromise["catch"](function() {
        return console.log("Unable to fetch submissions from server. Data may be out of date.");
      });
      return onChange();
    };
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
    onChange = function() {
      var currentIndex, currentSubmission, submissions;
      submissions = SubmissionsService.submissions;
      if (submissions <= 0) {
        return null;
      }
      vm.loaded = true;
      currentSubmission = findInCollection(submissions, 'id', vm.submissionId);
      vm.submission = angular.copy(currentSubmission);
      vm.submission = SubmissionsService.decorateSubmissionWithUnreadCounts(vm.submission);
      vm.file = findInCollection(vm.submission.files, 'id', vm.fileId);
      currentIndex = vm.submission.files.indexOf(vm.file);
      vm.prevFile = vm.submission.files[currentIndex - 1];
      return vm.nextFile = vm.submission.files[parseInt(currentIndex) + 1];
    };
    activate();
    return vm;
  };

  FileDetailController.$inject = ['$scope', 'SubmissionsService'];

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
