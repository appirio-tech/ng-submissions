(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-ui-components', 'appirio-tech-ng-auth', angularDragula(angular)];

  angular.module('appirio-tech-submissions', dependencies);

}).call(this);

angular.module("appirio-tech-submissions").run(["$templateCache", function($templateCache) {$templateCache.put("views/submissions.directive.html","<loader ng-hide=\"vm.loaded\"></loader><ul class=\"header\"><li class=\"previous\"><a ng-if=\"vm.prevStepRef\" href=\"{{ vm.prevStepRef }}\">&lt;</a></li><li><h1>{{ vm.stepName }}</h1></li><li class=\"next\"><a ng-if=\"vm.nextStepRef\" href=\"{{ vm.nextStepRef }}\">&gt;</a></li></ul><div ng-if=\"vm.status == \'scheduled\'\" class=\"subheader\"><div class=\"icon warning biggest\"></div><p>Submissions for the {{ vm.stepName }} Phase coming in &hellip;</p><countdown end=\"{{ vm.startsAt }}\"></countdown></div><div ng-if=\"vm.status == \'closed\'\" class=\"subheader\"><p>Congratulations! These are your {{ vm.stepName }} winners.</p><hr class=\"small\"/><ul class=\"winners\"><li ng-repeat=\"rank in vm.ranks\"><div class=\"rank\"><strong>{{rank.label.slice(0, -5)}}</strong><br /> place</div><avatar avatar-url=\"{{rank.avatarUrl}}\"></avatar><a href=\"#\" class=\"name\">{{rank.handle}}</a></li></ul><button class=\"wider action\">view submissions</button></div><div ng-if=\"vm.status == \'open\'\" class=\"subheader\"><p>Give feedback and select the top {{ vm.ranks.length }} designs. You have <countdown end=\"{{vm.endsAt}}\"></countdown> \nto give feedback.</p><ul class=\"top-selection\"><li ng-repeat=\"rank in vm.ranks\"><div dragula=\"\'ranked-submissions\'\" dragula-scope=\"$parent\" ng-class=\"{ \'has-avatar\': rank.avatarUrl }\" data-rank=\"{{ $index }}\" class=\"shell\"><div ng-if=\"rank.avatarUrl\" data-id=\"{{ rank.id }}\" class=\"draggable\"><avatar avatar-url=\"{{ rank.avatarUrl }}\"></avatar><div class=\"rank\">{{ rank.value }}</div></div><div ng-if=\"!rank.avatarUrl\" class=\"rank\">{{ rank.value }}</div></div></li><li ng-if=\"vm.rankUpdatePending\"><div class=\"loader\"></div></li><li ng-show=\"vm.allFilled\"><button ng-click=\"vm.confirmRanks()\" class=\"action\">Confirm your selections </button></li></ul><p ng-if=\"vm.rankUpdateError\">{{ vm.rankUpdateError }}</p></div><ul class=\"submissions\"><li ng-repeat=\"submission in vm.submissions track by $index\" class=\"submission elevated-bottom\"><ul class=\"user-details\"><li><avatar avatar-url=\"{{ submission.submitter.avatar }}\"></avatar></li><li><div class=\"name-time\"><div class=\"name\">{{ submission.submitter.handle }}</div><time>{{ submission.createdAt | timeLapse }}</time></div></li></ul><ul class=\"thumbnails\"><li ng-repeat=\"file in submission.files track by $index\" class=\"thumbnail\"><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: submission.id, fileId: file.id})\"><img ng-src=\"{{ file.images.thumbnail }}\" class=\"img\"/></a><div class=\"pop-over elevated\"><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: submission.id, fileId: file.id})\" class=\"preview\"><img ng-src=\"{{ file.images.large }}\" class=\"previewImage\"/></a><div class=\"icon bubble\"></div><a href=\"{{ file.images.full }}\" target=\"_blank\"><div class=\"clean icon download\"></div></a></div></li></ul><ul class=\"actions\"><li><a ui-sref=\"submission-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: submission.id})\">view all</a></li><li class=\"comments\"><div class=\"icon download small\"></div></li><li ng-if=\"vm.status == \'closed\' &amp;&amp; submission.rank\"><a href=\"#\" target=\"_blank\"><div class=\"clean icon download\"></div></a></li><li ng-if=\"vm.status == \'open\'\"><select ng-model=\"submission.rank\" ng-change=\"vm.handleRankSelect(submission)\" ng-init=\"\"><option ng-repeat=\"rank in vm.ranks\" value=\"{{rank.value}}\" ng-selected=\"{{ rank.value == submission.rank }}\">{{ rank.label }}</option></select></li><li ng-if=\"vm.status == \'closed\'\">{{ vm.rankNames[submission.rank -1] }}</li></ul></li></ul>");
$templateCache.put("views/final-fixes.directive.html","<loader ng-show=\"!vm.loaded\"></loader><ul class=\"header\"><li class=\"previous\"><a ng-if=\"vm.prevStepRef\" href=\"{{ vm.prevStepRef }}\">&lt;</a></li><li><h1>{{ vm.stepName }}</h1></li><li class=\"next\"><a ng-if=\"vm.nextStepRef\" href=\"{{ vm.nextStepRef }}\">&gt;</a></li></ul><div ng-if=\"vm.status == \'scheduled\'\" class=\"subheader\"><div class=\"icon warning biggest\"></div><p>Final Fixes Phase starts in &hellip;</p><countdown end=\"{{ vm.work.phase.startDate }}\"></countdown><hr/><ul class=\"winners\"><li><div class=\"rank\"><strong>winner</strong></div><avatar avatar-url=\"{{vm.submission.submitter.avatar}}\"></avatar><a href=\"#\" class=\"name\">{{vm.submission.submitter.handle}}</a></li></ul></div><div ng-if=\"vm.status == \'closed\'\" class=\"subheader\"><p>Project Complete! Review final submission</p></div><div ng-if=\"vm.status == \'open\'\" class=\"subheader\"><p>Give your final feedback to complete this design project.</p><countdown end=\"{{ vm.work.phase.endDate }}\"></countdown><p class=\"duration\">remaining to give feedback</p></div><button ng-if=\"vm.status == \'open\' || vm.status == \'closed\'\" class=\"action\"><div class=\"icon download smallest\"></div><span>download final submissions</span></button><button ng-click=\"vm.confirmApproval()\" ng-if=\"vm.status == \'open\'\" class=\"action\">confirm final approval</button><ul ng-if=\"vm.status == \'open\' || vm.status == \'closed\'\" class=\"previews\"><li ng-repeat=\"file in vm.submission.files track by $index\" class=\"preview\"><img ng-src=\"{{ file.images.small }}\" ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submission.id, fileId: file.id})\" class=\"img\"/></li></ul>");
$templateCache.put("views/submission-detail.directive.html","<div class=\"submitter\"><a href=\"\">submissions</a><div class=\"arrow\">&rsaquo;</div><avatar avatar-url=\"{{ vm.submission.submitter.avatar }}\"></avatar><div class=\"name\">{{ vm.submission.submitter.handle }}</div></div><p class=\"download\"><button class=\"clean\"><div class=\"icon download small\"></div></button></p><select ng-model=\"vm.submission.rank\" ng-change=\"vm.handleRankSelect(vm.submission)\" ng-init=\"\"><option ng-repeat=\"rank in vm.rankNames\" value=\"$index+1\" ng-selected=\"{{ $index+1 == vm.submission.rank }}\">{{ rank }}</option></select><hr/><ul class=\"previews\"><li ng-repeat=\"file in vm.submission.files track by $index\" class=\"preview\"><a ui-sref=\"file-detail({projectId: vm.projectId, stepId: vm.stepId, submissionId: vm.submissionId, fileId: file.id})\"><img ng-src=\"{{ file.images.small }}\" class=\"img\"/></a><p>{{ file.name }}</p></li></ul>");
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
      destroyStepsListener = $rootScope.$on('stepsService.steps:changed', function() {
        return onChange();
      });
      destroySubmissionsListener = $rootScope.$on('submissionsService.submissions:changed', function() {
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
      var currentStep, nextStep, prevStep, ref, ref1, ref2, ref3, ref4, ref5, stepParams, steps, submissions;
      steps = StepsService.steps;
      submissions = SubmissionsService.submissions;
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
      vm.rankUpdatePending = (ref = currentStep.o) != null ? (ref1 = ref.pending) != null ? ref1.rankedSubmissions : void 0 : void 0;
      if ((ref2 = currentStep.o) != null ? (ref3 = ref2.errors) != null ? ref3.rankedSubmissions : void 0 : void 0) {
        vm.rankUpdateError = (ref4 = currentStep.o) != null ? (ref5 = ref4.errors) != null ? ref5.rankedSubmissions : void 0 : void 0;
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
  var Service, enumProps, noop;

  Service = function() {};

  noop = function() {};

  enumProps = function() {
    var props;
    return props = {
      value: {},
      configurable: true,
      writable: true,
      enumerable: false
    };
  };

  Service.prototype.fetch = function(options) {
    var apiCall, clearErrorsOnSuccess, collection, replaceCollection, request, updateCallback;
    collection = options.collection;
    apiCall = options.apiCall || noop;
    updateCallback = options.updateCallback || noop;
    replaceCollection = options.replaceCollection !== false;
    clearErrorsOnSuccess = options.clearErrorsOnSuccess !== false;
    request = apiCall();
    if (collection.o == null) {
      Object.defineProperty(collection, 'o', enumProps());
    }
    collection.o.pending = true;
    updateCallback(collection);
    request.then(function(response) {
      var i, j, now, ref, results;
      now = new Date();
      collection.o.lastUpdated = now.toISOString();
      if (replaceCollection) {
        collection.length = 0;
        results = [];
        for (i = j = 0, ref = response.length; j < ref; i = j += 1) {
          results.push(collection.push(response[i]));
        }
        return results;
      }
    });
    request["catch"](function(err) {
      return collection.o.error = err;
    });
    return request["finally"](function() {
      collection.o.pending = false;
      return updateCallback(collection);
    });
  };

  Service.prototype.addToCollection = function(options) {
    var apiCall, clearErrorsOnSuccess, collection, handleResponse, item, request, updateCallback;
    collection = options.collection;
    item = options.item;
    apiCall = options.apiCall || noop;
    updateCallback = options.updateCallback || noop;
    handleResponse = options.handleResponse !== false;
    clearErrorsOnSuccess = options.clearErrorsOnSuccess !== false;
    request = apiCall(item);
    if (item.o == null) {
      Object.defineProperty(item, 'o', enumProps());
    }
    item.o.pending = true;
    item.o.confirmed = false;
    collection.push(item);
    updateCallback(collection);
    request.then(function(response) {
      var name, now, prop, results;
      now = new Date();
      item.o.lastUpdated = now.toISOString();
      item.o.confirmed = true;
      if (handleResponse) {
        results = [];
        for (name in response) {
          prop = response[name];
          results.push(item[name] = response[name]);
        }
        return results;
      }
    });
    request["catch"](function(err) {
      return item.o.error = err;
    });
    return request["finally"](function() {
      item.o.pending = false;
      return updateCallback(collection);
    });
  };

  Service.prototype.fetchOne = function(options) {
    var apiCall, clearErrorsOnSuccess, handleResponse, model, request, updateCallback, updates;
    model = options.model || {};
    updates = options.updates || [];
    apiCall = options.apiCall || noop;
    updateCallback = options.updateCallback || noop;
    handleResponse = options.handleResponse !== false;
    clearErrorsOnSuccess = options.clearErrorsOnSuccess !== false;
    request = apiCall();
    if (model.o == null) {
      Object.defineProperty(model, 'o', enumProps());
    }
    model.o.hasPending = true;
    updateCallback(model);
    request.then(function(response) {
      var name, now, prop, results;
      now = new Date();
      model.o.lastUpdated = now.toISOString();
      if (clearErrorsOnSuccess) {
        model.o.errors = {};
      }
      if (handleResponse) {
        results = [];
        for (name in response) {
          prop = response[name];
          results.push(model[name] = response[name]);
        }
        return results;
      }
    });
    request["catch"](function(err) {
      return model.o.error = err;
    });
    return request["finally"](function() {
      model.o.hasPending = false;
      return updateCallback(model);
    });
  };

  Service.prototype.update = function(options) {
    var apiCall, backup, clearErrorsOnSuccess, handleResponse, model, name, o, prop, request, updateCallback, updates;
    model = options.model || {};
    updates = options.updates || [];
    apiCall = options.apiCall || noop;
    updateCallback = options.updateCallback || noop;
    handleResponse = options.handleResponse !== false;
    clearErrorsOnSuccess = options.clearErrorsOnSuccess !== false;
    backup = {};
    for (name in updates) {
      prop = updates[name];
      backup[name] = model[name];
      model[name] = prop;
    }
    if (model.o) {
      o = model.o;
      delete model.o;
    }
    request = apiCall(model);
    Object.defineProperty(model, 'o', enumProps());
    if (o) {
      model.o = o;
    } else {
      model.o = {};
    }
    model.o.pending = {};
    model.o.errors = {};
    for (name in updates) {
      prop = updates[name];
      model.o.pending[name] = true;
    }
    updateCallback(model);
    request.then(function(response) {
      var now, results;
      now = new Date();
      model.o.lastUpdated = now.toISOString();
      if (clearErrorsOnSuccess) {
        model.o.errors = {};
      }
      if (handleResponse) {
        results = [];
        for (name in updates) {
          prop = updates[name];
          results.push(model[name] = response[name]);
        }
        return results;
      }
    });
    request["catch"](function(err) {
      var results;
      results = [];
      for (name in backup) {
        prop = backup[name];
        model[name] = prop;
        results.push(model.o.errors[name] = err);
      }
      return results;
    });
    return request["finally"](function() {
      model.o.pending.rankedSubmissions = false;
      return updateCallback(model);
    });
  };

  Service.$inject = ['$rootScope'];

  angular.module('appirio-tech-submissions').service('Optimist', Service);

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
          rank: (parseInt(index) + 1) + '',
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
    file.totalMessages = 0;
    file.unreadMessages = 0;
    file.threads[0].messages.forEach(function(message) {
      file.totalMessages = file.totalMessages + 1;
      if (!message.read) {
        return file.unreadMessages = file.unreadMessages + 1;
      }
    });
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

  srv = function($rootScope, helpers, StepsAPIService, O) {
    var currentProjectId, emitUpdates, stepsService;
    currentProjectId = null;
    stepsService = {
      steps: []
    };
    emitUpdates = function() {
      return $rootScope.$emit('stepsService.steps:changed');
    };
    stepsService.fetch = function(projectId) {
      var apiCall;
      if (projectId !== currentProjectId) {
        stepsService.steps = [];
        currentProjectId = projectId;
      }
      apiCall = function() {
        var params;
        params = {
          projectId: projectId
        };
        return StepsAPIService.query(params).$promise;
      };
      return O.fetch({
        collection: stepsService.steps,
        apiCall: apiCall,
        updateCallback: emitUpdates
      });
    };
    stepsService.updateRank = function(projectId, stepId, submissionId, rank) {
      var apiCall, numberOfRanks, rankedSubmissions, step;
      step = helpers.findInCollection(stepsService.steps, 'id', stepId);
      numberOfRanks = step.details.numberOfRanks;
      rankedSubmissions = step.details.rankedSubmissions;
      rankedSubmissions = helpers.updateRankedSubmissions(rankedSubmissions, numberOfRanks, submissionId, rank);
      apiCall = function(step) {
        var params;
        params = {
          projectId: projectId,
          stepId: stepId
        };
        return StepsAPIService.updateRanks(params, step).$promise;
      };
      return O.update({
        model: step.details,
        updates: {
          rankedSubmissions: rankedSubmissions
        },
        apiCall: apiCall,
        updateCallback: emitUpdates
      });
    };
    stepsService.confirmRanks = function(projectId, stepId) {
      var apiCall, step;
      step = helpers.findInCollection(stepsService.steps, 'id', stepId);
      apiCall = function(step) {
        var params;
        params = {
          projectId: projectId,
          stepId: stepId
        };
        return StepsAPIService.confirmRanks(params, step).$promise;
      };
      return O.update({
        model: step.details,
        updates: {
          customerConfirmedRanks: true
        },
        apiCall: apiCall,
        updateCallback: emitUpdates
      });
    };
    stepsService.acceptFixes = function(projectId, stepId) {
      var apiCall, step;
      step = helpers.findInCollection(stepsService.steps, 'id', stepId);
      apiCall = function(step) {
        var params;
        params = {
          projectId: projectId,
          stepId: stepId
        };
        return StepsAPIService.confirmRanks(params, step).$promise;
      };
      return O.update({
        model: step.details,
        updates: {
          customerAcceptedFixes: true
        },
        apiCall: apiCall,
        updateCallback: emitUpdates
      });
    };
    return stepsService;
  };

  srv.$inject = ['$rootScope', 'SubmissionsHelpers', 'StepsAPIService', 'Optimist'];

  angular.module('appirio-tech-submissions').factory('StepsService', srv);

}).call(this);

(function() {
  'use strict';
  var srv;

  srv = function($rootScope, helpers, StepsAPIService, SubmissionsAPIService, MessagesAPIService, O) {
    var currentProjectId, currentStepId, emitUpdates, submissionsService;
    currentProjectId = null;
    currentStepId = null;
    submissionsService = {
      submissions: []
    };
    emitUpdates = function() {
      return $rootScope.$emit('submissionsService.submissions:changed');
    };
    submissionsService.fetch = function(projectId, stepId) {
      var apiCall;
      if (projectId !== currentProjectId || stepId !== currentStepId) {
        submissionsService.submissions = [];
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
      return O.fetch({
        collection: submissionsService.submissions,
        apiCall: apiCall,
        updateCallback: emitUpdates
      });
    };
    submissionsService.markMessagesAsRead = function(submissionId, fileId, userId) {
      var currentFile, currentSubmissions, messages, ref;
      currentSubmissions = helpers.findInCollection(submissionsService.submissions, 'id', submissionId);
      currentFile = helpers.findInCollection(currentSubmissions.files, 'id', fileId);
      messages = (ref = currentFile.threads[0]) != null ? ref.messages : void 0;
      return messages.forEach(function(message) {
        var apiCall;
        if (!message.read) {
          apiCall = function() {
            var body, params;
            params = {
              id: message.id
            };
            body = {
              read: true,
              subscriberId: userId
            };
            return MessagesAPIService.put(params, body).$promise;
          };
          return O.update({
            model: message,
            updates: {
              read: true
            },
            apiCall: apiCall,
            updateCallback: emitUpdates,
            handleResponse: false
          });
        }
      });
    };
    submissionsService.sendMessage = function(submissionId, fileId, message, userId) {
      var apiCall, currentFile, currentSubmissions, messages, newMessage, now, ref;
      currentSubmissions = helpers.findInCollection(submissionsService.submissions, 'id', submissionId);
      currentFile = helpers.findInCollection(currentSubmissions.files, 'id', fileId);
      messages = (ref = currentFile.threads[0]) != null ? ref.messages : void 0;
      now = new Date();
      newMessage = {
        publisherId: userId,
        body: message,
        createdAt: now.toISOString(),
        read: true
      };
      apiCall = function(message) {
        return MessagesAPIService.save(message).$promise;
      };
      return O.addToCollection({
        collection: messages,
        item: newMessage,
        apiCall: apiCall,
        updateCallback: emitUpdates
      });
    };
    return submissionsService;
  };

  srv.$inject = ['$rootScope', 'SubmissionsHelpers', 'StepsAPIService', 'SubmissionsAPIService', 'MessagesAPIService', 'Optimist'];

  angular.module('appirio-tech-submissions').factory('SubmissionsService', srv);

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
      destroyStepsListener = $rootScope.$on('stepsService.steps:changed', function() {
        return onChange();
      });
      destroySubmissionsListener = $rootScope.$on('submissionsService.submissions:changed', function() {
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
      steps = StepsService.steps;
      submissions = SubmissionsService.submissions;
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
      destroyStepsListener = $rootScope.$on('stepsService.steps:changed', function() {
        return onChange();
      });
      destroySubmissionsListener = $rootScope.$on('submissionsService.submissions:changed', function() {
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
      steps = StepsService.steps;
      submissions = SubmissionsService.submissions;
      if (steps.length <= 0 || submissions.length <= 0) {
        return null;
      }
      vm.loaded = true;
      currentStep = helpers.findInCollection(steps, 'id', vm.stepId);
      currentSubmission = helpers.findInCollection(submissions, 'id', vm.submissionId);
      vm.submission = angular.copy(currentSubmission);
      vm.submission = helpers.decorateSubmissionWithRank(vm.submission, currentStep.rankedSubmissions);
      vm.submission = helpers.decorateSubmissionWithMessageCounts(vm.submission);
      vm.rankNames = config.rankNames.slice(0, currentStep.numberOfRanks);
      return vm.allFilled = currentStep.rankedSubmissions.length === currentStep.numberOfRanks;
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
      destroySubmissionsListener = $rootScope.$on('submissionsService.submissions:changed', function() {
        return onChange();
      });
      $scope.$on('$destroy', function() {
        return destroySubmissionsListener();
      });
      return SubmissionsService.fetch(vm.projectId, vm.stepId);
    };
    onChange = function() {
      var currentIndex, currentSubmission, nextIndex, prevIndex, ref, submissions, user;
      submissions = SubmissionsService.submissions;
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
      vm.nextFile = vm.submission.files[nextIndex];
      user = UserV3Service.getCurrentUser() || {};
      vm.userId = user.id;
      return vm.avatars[vm.userId] = 'http://www.topcoder.com/i/m/cardiboy_big.jpg';
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
