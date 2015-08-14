(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-ui-components', 'appirio-tech-ng-auth', 'appirio-tech-messaging'];

  angular.module('appirio-tech-submissions', dependencies);

}).call(this);

angular.module("appirio-tech-submissions").run(["$templateCache", function($templateCache) {$templateCache.put("views/submissions.directive.html","<loader ng-hide=\"vm.loaded\"></loader><ul class=\"header\"><li class=\"previous\"><a ng-if=\"vm.phase.previous.sref\" ui-sref=\"{{ vm.phase.previous.sref }}\">&lt;</a></li><li><h1>{{ vm.phase.current.name }}</h1></li><li class=\"next\"><a ng-if=\"vm.phase.next.sref\" ui-sref=\"{{ vm.phase.next.sref }}\">&gt;</a></li></ul><ul class=\"timeline\"><li ng-repeat=\"phase in vm.timeline track by $index\" ng-class=\"phase\"></li></ul><section ng-if=\"!vm.open\"><h4>Submissions for the {{ vm.phase.current.name }} Phase coming in &hellip;</h4><countdown end=\"{{ vm.phase.current.startDate }}\"></countdown></section><section ng-if=\"vm.open\"><h4>Give feedback and select the top {{ vm.ranks.length }} designs.</h4><countdown end=\"{{ vm.phase.current.endDate }}\"></countdown><p class=\"duration\">remaining to give feedback</p><ul class=\"top-selection\"><li ng-repeat=\"rank in vm.ranks track by $index\"><div class=\"shell\">{{ rank.value + 1 }}</div><avatar avatar-url=\"{{ rank.avatarUrl }}\" ng-show=\"rank.avatarUrl\"></avatar><div class=\"rank\">{{ rank.label }}</div></li></ul><button ng-show=\"vm.showConfirm\" class=\"confirm info\">Confirm your selections</button><hr/><ul class=\"submissions color-even\"><li ng-repeat=\"submission in vm.submissions track by $index\" class=\"submission\"><ul class=\"user-details\"><li><avatar avatar-url=\"{{ submission.submitter.avatarUrl }}\"></avatar></li><li><div class=\"name-time\"><div class=\"name\">{{ submission.submitter.handle }}</div><time>{{ submission.createdAt | timeLapse }}</time></div></li></ul><ul class=\"thumbnails\"><li ng-repeat=\"file in submission.files track by $index\" class=\"thumbnail\"><a ui-sref=\"submission-slides({workId: vm.workId, submissionId: submission.id, fileId: file.id})\"><img ng-src=\"{{ file.thumbnailUrl }}\" class=\"img\"/></a></li></ul><ul class=\"actions\"><li><a ui-sref=\"submission-detail({workId: vm.workId, submissionId: submission.id})\">view all ({{ submission.files.length }})</a></li><li class=\"comments\">20/28<div class=\"icon bubble\"></div></li><li><select ng-model=\"submission.rank\" ng-change=\"vm.reorder(submission)\" ng-init=\"\"><option ng-repeat=\"rank in vm.rankNames\" value=\"{{ $index }}\" ng-selected=\"{{ $index == submission.rank }}\">{{ rank }}</option></select></li></ul></li></ul></section>");
$templateCache.put("views/final-fixes.directive.html","<loader ng-show=\"vm.loading\"></loader><ul class=\"header\"><li class=\"previous\"><a ng-if=\"vm.phase.previous.sref\" ui-sref=\"{{ vm.phase.previous.sref }}\">&lt;</a></li><li><h1>{{ vm.phase.current.name }}</h1></li><li class=\"next\"><a ng-if=\"vm.phase.next.sref\" ui-sref=\"{{ vm.phase.next.sref }}\">&gt;</a></li></ul><ul class=\"timeline\"><li ng-repeat=\"phase in vm.timeline track by $index\" ng-class=\"phase\"></li></ul><section ng-if=\"!vm.open\"><h4>Final Fixes Phase starts in &hellip;</h4><countdown end=\"{{ vm.work.phase.startDate }}\"></countdown></section><section ng-if=\"vm.open\"><h4 ng-if=\"!vm.approvalConfirmed\">Give final feedback and accept the submission to complete the design project.</h4><h4 ng-if=\"vm.approvalConfirmed\">Project Complete! Review Final Submission.</h4><countdown ng-if=\"!vm.approvalConfirmed\" end=\"{{ vm.work.phase.endDate }}\"></countdown><p ng-if=\"!vm.approvalConfirmed\" class=\"duration\">remaining to give feedback</p><ul class=\"winner\"><li><avatar></avatar></li><li>Alpha User is the Winner!</li><li class=\"download\"><button class=\"clean icon download\"></button><p>Download final submission</p></li><li ng-if=\"vm.approvalConfirmed\"><a ui-sref=\"submission-slides({workId: vm.workId, submissionId: vm.submissionId})\">View previous submission comments</a></li></ul><hr/><ul ng-if=\"!vm.approvalConfirmed\" class=\"approval\"><li class=\"approve-all\"><input type=\"checkbox\" ng-model=\"vm.approveAll\" ng-true-value=\"true\" ng-false-value=\"false\"/><label>Approve all</label></li><li class=\"confirm\"><button ng-show=\"vm.showConfirmApproval\" ng-click=\"vm.confirmApproval()\" class=\"info\">Confirm final approval</button></li></ul><ul class=\"previews\"><li ng-repeat=\"file in vm.files track by $index\" class=\"preview\"><ul class=\"icons\"><li class=\"notification\"><button class=\"clean\">1</button></li><li><button class=\"clean\"><div class=\"icon download smallest\"></div></button></li></ul><img ng-src=\"{{ file.thumbnailUrl }}\" ui-sref=\"submission-slides({workId: vm.workId, submissionId: vm.submissionId, fileId: file.id})\" class=\"img\"/><p>{{ file.name }}</p></li></ul></section>");
$templateCache.put("views/submission-detail.directive.html","<ul class=\"actions\"><li class=\"submitter\"><avatar avatar-url=\"{{ vm.work.submitter.avatarUrl }}\"></avatar><div class=\"name-time\"><div class=\"name\">{{ vm.work.submitter.handle }}</div><time>{{ vm.work.createdAt | date: \'h:mm a, MMMM d, y\' }}</time></div></li><li class=\"position\"><select ng-model=\"vm.selectedPosition\"><option value=\"\">Select Position</option><option ng-repeat=\"position in vm.positions\" value=\"{{position}}\">{{ position }}</option></select><button ng-show=\"vm.selectedPosition\" ng-click=\"vm.selectPosition()\" class=\"confirm info\">Select Position</button></li><li class=\"submissionsCount\"><p>{{ vm.submissionsCount }} Submissions</p></li></ul><ul class=\"previews\"><li ng-repeat=\"file in vm.work.files track by $index\" class=\"preview\"><ul class=\"icons\"><li class=\"notification\"><button class=\"clean\">1</button></li></ul><a ui-sref=\"submission-slides({workId: vm.workId, submissionId: vm.submissionId, fileId: file.id})\"><img ng-src=\"{{ file.thumbnailUrl }}\" class=\"img\"/></a><p>{{ file.name }}</p></li></ul>");
$templateCache.put("views/submission-slides.directive.html","<main><loader ng-show=\"vm.loading\"></loader><ul class=\"header\"><li class=\"submitter\"><avatar avatar-url=\"{{ vm.work.submitter.avatarUrl }}\"></avatar><div class=\"name-time\"><div class=\"name\">{{ vm.work.submitter.handle }}</div><time>{{ vm.work.createdAt | date: \'h:mm a, MMMM d, y\' }}</time></div></li><li class=\"icons\"><button class=\"clean\"><div class=\"icon download\"></div></button><button ng-click=\"vm.acceptFile()\" class=\"clean\"><div class=\"icon checkmark\"></div></button><button ng-click=\"vm.showComments = !vm.showComments\" class=\"clean\"><div class=\"icon bubble\"></div></button></li></ul><hr/><ul class=\"slideshow\"><li><button ng-click=\"vm.previewPrevious()\" class=\"clean icon circle-arrow biggest\"></button></li><li class=\"preview\"><div class=\"img-container\"><img ng-src=\"{{ vm.selectedPreview.url }}\"/></div><p>{{ vm.work.files[vm.selectedPreviewIndex].name }}</p></li><li><button ng-click=\"vm.previewNext()\" class=\"clean icon circle-arrow right biggest\"></button></li></ul><ul class=\"thumbnails\"><li ng-repeat=\"file in vm.work.files\" class=\"thumbnail\"><button class=\"clean thumbnail\"><img ng-src=\"{{ file.thumbnailUrl }}\" ng-click=\"vm.previewSelected($index)\"/><div class=\"notification\">1</div></button></li></ul></main><aside><messaging ng-class=\"{active:vm.showComments}\" thread-id=\"{{vm.selectedPreview.id}}\" subscriber-id=\"{{vm.subscriberId}}\"></messaging></aside>");}]);
(function() {
  'use strict';
  var SubmissionsController;

  SubmissionsController = function($scope, SubmissionAPIService, SubmissionDetailAPIService) {
    var activate, applyPhaseData, applySubmissionsData, evaluateRanks, getSubmissionsData, populateRankList, trimRankNames, updateSubmissionRank, vm;
    vm = this;
    vm.loaded = false;
    vm.submissions = [];
    vm.ranks = [];
    vm.timeline = [];
    vm.open = false;
    vm.showConfirm = false;
    vm.rankNames = ['1st Place', '2nd Place', '3rd Place', '4th Place', '5th Place', '6th Place', '7th Place', '8th Place', '9th Place', '10th Place'];
    vm.reorder = function(changedSubmission) {
      updateSubmissionRank(changedSubmission);
      populateRankList();
      return evaluateRanks();
    };
    activate = function() {
      applyPhaseData();
      return getSubmissionsData();
    };
    applyPhaseData = function() {
      if ($scope.phase === 'design-concepts') {
        vm.timeline = ['active', '', ''];
        vm.phase = {
          previous: {
            name: null,
            sref: null
          },
          current: {
            name: 'Design Concepts'
          },
          next: {
            name: 'Complete Designs',
            sref: 'complete-designs'
          }
        };
      }
      if ($scope.phase === 'complete-designs') {
        vm.timeline = ['', 'active', ''];
        return vm.phase = {
          previous: {
            name: 'Design Concepts',
            sref: 'design-concepts'
          },
          current: {
            name: 'Complete Designs'
          },
          next: {
            name: 'Final Fixes',
            sref: 'final-fixes'
          }
        };
      }
    };
    trimRankNames = function(limit) {
      return vm.rankNames = vm.rankNames.slice(0, limit);
    };
    populateRankList = function() {
      var i, j, ranks, ref;
      ranks = [];
      for (i = j = 0, ref = vm.numberOfRanks; j < ref; i = j += 1) {
        ranks.push({
          value: i,
          label: vm.rankNames[i],
          avatarUrl: null
        });
      }
      vm.submissions.forEach(function(submission) {
        if (submission.rank < vm.numberOfRanks) {
          return ranks[submission.rank].avatarUrl = submission.submitter.avatarUrl;
        }
      });
      return vm.ranks = ranks;
    };
    evaluateRanks = function() {
      var allFilled, filled, filledRanks, i, j, rank, ref;
      filledRanks = {};
      for (i = j = 0, ref = vm.numberOfRanks; j < ref; i = j += 1) {
        filledRanks[i] = false;
      }
      vm.submissions.forEach(function(submission) {
        if (submission.rank < vm.numberOfRanks) {
          return filledRanks[submission.rank] = true;
        }
      });
      allFilled = true;
      for (rank in filledRanks) {
        filled = filledRanks[rank];
        if (!filled) {
          allFilled = false;
        }
      }
      return vm.showConfirm = allFilled;
    };
    applySubmissionsData = function(data) {
      vm.numberOfRanks = data.numberOfRanks;
      vm.submissions = data.submissions;
      vm.phase.current.startDate = data.phase.startDate;
      vm.phase.current.endDate = data.phase.endDate;
      if (Date.now() > new Date(vm.phase.current.startDate)) {
        vm.open = true;
      }
      trimRankNames(data.numberOfRanks);
      return populateRankList();
    };
    getSubmissionsData = function() {
      var params, resource;
      params = {
        workId: $scope.workId,
        phase: $scope.phase
      };
      resource = SubmissionAPIService.get(params);
      resource.$promise.then(function(res) {
        return applySubmissionsData(res);
      });
      resource.$promise["catch"](function(res) {});
      return resource.$promise["finally"](function() {
        return vm.loaded = true;
      });
    };
    updateSubmissionRank = function(submission) {
      var params, resource;
      params = {
        workId: $scope.workId,
        submissionId: submission.id
      };
      return resource = SubmissionDetailAPIService.updateRank(params, submission);
    };
    activate();
    return vm;
  };

  SubmissionsController.$inject = ['$scope', 'SubmissionAPIService', 'SubmissionDetailAPIService'];

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
        workId: '@workId',
        phase: '@phase'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('submissions', directive);

}).call(this);

(function() {
  'use strict';
  var FinalFixesController;

  FinalFixesController = function($scope, FinalFixesAPIService) {
    var activate, vm;
    vm = this;
    vm.loading = true;
    vm.workId = $scope.workId;
    vm.submissionId = null;
    vm.showConfirmApproval = false;
    vm.approveAll = null;
    vm.timeline = [];
    vm.confirmApproval = function() {
      var body, params, resource;
      vm.loading = true;
      params = {
        workId: vm.workId
      };
      body = {
        confirmed: true
      };
      resource = FinalFixesAPIService.put(params, body);
      resource.$promise.then(function(response) {
        return vm.approvalConfirmed = true;
      });
      resource.$promise["catch"](function(error) {});
      return resource.$promise["finally"](function() {
        return vm.loading = false;
      });
    };
    $scope.$watch('vm.approveAll', function(approved) {
      if (approved) {
        return vm.showConfirmApproval = true;
      } else if (approved === false) {
        return vm.showConfirmApproval = false;
      }
    });
    activate = function() {
      var params, resource;
      if ($scope.phase === 'final-fixes') {
        vm.timeline = ['', '', 'active'];
        vm.phase = {
          previous: {
            name: 'Complete Concepts',
            sref: 'complete-designs'
          },
          current: {
            name: 'Final Fixes'
          },
          next: {
            name: null,
            sref: null
          }
        };
      }
      params = {
        workId: vm.workId
      };
      resource = FinalFixesAPIService.get(params);
      resource.$promise.then(function(response) {
        vm.work = response;
        console.log('the response', response);
        vm.submissionId = vm.work.id;
        vm.files = vm.work.files;
        return vm.approvalConfirmed = false;
      });
      resource.$promise["catch"](function(response) {});
      resource.$promise["finally"](function() {
        return vm.loading = false;
      });
      return vm;
    };
    return activate();
  };

  FinalFixesController.$inject = ['$scope', 'FinalFixesAPIService'];

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
        workId: '@workId',
        phase: '@phase'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('finalFixes', directive);

}).call(this);

(function() {
  'use strict';
  var srv, transformResponse;

  transformResponse = function(response) {
    var parsed, ref;
    parsed = JSON.parse(response);
    return (parsed != null ? (ref = parsed.result) != null ? ref.content : void 0 : void 0) || {};
  };

  srv = function($resource, API_URL) {
    var actions, params, url;
    url = API_URL + '/v3/projects/:workId/submissions/final-fixes';
    params = {
      workId: '@workId'
    };
    actions = {
      put: {
        method: 'PUT',
        isArray: false,
        transformResponse: transformResponse
      },
      get: {
        method: 'GET',
        isArray: false,
        transformResponse: transformResponse
      }
    };
    return $resource(url, params, actions);
  };

  srv.$inject = ['$resource', 'API_URL'];

  angular.module('appirio-tech-submissions').factory('FinalFixesAPIService', srv);

}).call(this);

(function() {
  'use strict';
  var srv, transformResponse;

  transformResponse = function(response) {
    var parsed, ref;
    parsed = JSON.parse(response);
    return (parsed != null ? (ref = parsed.result) != null ? ref.content : void 0 : void 0) || [];
  };

  srv = function($resource, API_URL) {
    var methods, params, url;
    url = API_URL + '/v3/projects/:workId/submissions';
    params = {
      workId: '@workId',
      phase: '@phase'
    };
    methods = {
      query: {
        method: 'GET',
        isArray: false,
        transformResponse: transformResponse
      },
      get: {
        method: 'GET',
        isArray: false,
        transformResponse: transformResponse
      }
    };
    return $resource(url, params, methods);
  };

  srv.$inject = ['$resource', 'API_URL'];

  angular.module('appirio-tech-submissions').factory('SubmissionAPIService', srv);

}).call(this);

(function() {
  'use strict';
  var SubmissionDetailController;

  SubmissionDetailController = function($scope, SubmissionDetailAPIService) {
    var activate, vm;
    vm = this;
    vm.work = null;
    vm.positions = null;
    vm.submissionsCount = null;
    vm.selectedPosition = null;
    vm.workId = $scope.workId;
    vm.submissionId = $scope.submissionId;
    vm.selectPosition = function() {
      var body;
      return body = {
        workId: vm.workId,
        submissionId: vm.submissionId,
        position: vm.selectedPosition
      };
    };
    activate = function() {
      var params, resource;
      params = {
        workId: vm.workId,
        submissionId: vm.submissionId
      };
      resource = SubmissionDetailAPIService.get(params);
      resource.$promise.then(function(response) {
        vm.work = response;
        vm.submissionsCount = vm.work.files.length - 1;
        return vm.positions = [1, 2, 3, 4];
      });
      resource.$promise["catch"](function(error) {});
      return vm;
    };
    return activate();
  };

  SubmissionDetailController.$inject = ['$scope', 'SubmissionDetailAPIService'];

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
        workId: '@workId',
        submissionId: '@submissionId'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('submissionDetail', directive);

}).call(this);

(function() {
  'use strict';
  var SubmissionSlidesController;

  SubmissionSlidesController = function($scope, $state, UserV3Service, SubmissionDetailAPIService, SubmissionSlidesService) {
    var activate, setSelectedPreview, vm, watchSelectedPreviewIndex;
    vm = this;
    vm.selectedPreview = null;
    vm.selectedPreviewIndex = null;
    vm.showComments = false;
    vm.subscriberId = null;
    vm.fileId = $state.params.fileId;
    vm.workId = $scope.workId;
    vm.submissionId = $scope.submissionId;
    vm.loading = false;
    activate = function() {
      var params, resource;
      vm.loading = true;
      params = {
        workId: vm.workId,
        submissionId: vm.submissionId
      };
      resource = SubmissionDetailAPIService.get(params);
      resource.$promise.then(function(response) {
        var ref, ref1;
        vm.work = response;
        if ((ref = vm.work) != null) {
          ref.files.forEach(function(file, index) {
            if (file.id === vm.fileId) {
              return vm.selectedPreviewIndex = index;
            } else {
              return vm.selectedPreviewIndex = 0;
            }
          });
        }
        return vm.selectedPreview = (ref1 = vm.work) != null ? ref1.files[vm.selectedPreviewIndex] : void 0;
      });
      resource.$promise["catch"](function(error) {});
      resource.$promise["finally"](function() {
        return vm.loading = false;
      });
    };
    vm.acceptFile = function() {
      var body;
      return body = {
        fileId: vm.selectedPreview.id,
        submissionId: $scope.submissionId,
        accepted: true
      };
    };
    vm.previewPrevious = function() {
      var srv;
      srv = SubmissionSlidesService;
      return vm.selectedPreviewIndex = srv.previewPrevious(vm.selectedPreviewIndex, vm.work.files);
    };
    vm.previewNext = function() {
      var srv;
      srv = SubmissionSlidesService;
      return vm.selectedPreviewIndex = srv.previewNext(vm.selectedPreviewIndex, vm.work.files);
    };
    vm.previewSelected = function(index) {
      return vm.selectedPreviewIndex = index;
    };
    watchSelectedPreviewIndex = function() {
      return vm.selectedPreviewIndex;
    };
    setSelectedPreview = function(index) {
      var params, ref, ref1;
      if ((ref = vm.work) != null ? ref.files : void 0) {
        vm.selectedPreview = vm.work.files[index];
      }
      if ($state.current.name) {
        params = {
          submissionId: vm.submissionId,
          fileId: (ref1 = vm.selectedPreview) != null ? ref1.id : void 0
        };
        return $state.go('submission-slides', params, {
          notify: false
        });
      }
    };
    $scope.$watch(watchSelectedPreviewIndex, setSelectedPreview);
    $scope.$watch(UserV3Service.getCurrentUser, function() {
      var user;
      user = UserV3Service.getCurrentUser();
      if (user) {
        return vm.subscriberId = user.id;
      }
    });
    return activate();
  };

  SubmissionSlidesController.$inject = ['$scope', '$state', 'UserV3Service', 'SubmissionDetailAPIService', 'SubmissionSlidesService'];

  angular.module('appirio-tech-submissions').controller('SubmissionSlidesController', SubmissionSlidesController);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      controller: 'SubmissionSlidesController as vm',
      templateUrl: 'views/submission-slides.directive.html',
      scope: {
        workId: '@workId',
        submissionId: '@submissionId'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('submissionSlides', directive);

}).call(this);

(function() {
  'use strict';
  var srv, transformResponse, updateRank;

  transformResponse = function(response) {
    var parsed, ref;
    parsed = JSON.parse(response);
    return (parsed != null ? (ref = parsed.result) != null ? ref.content : void 0 : void 0) || {};
  };

  updateRank = function(submission) {
    var dataToUpdate;
    dataToUpdate = {
      rank: submission.rank
    };
    return dataToUpdate;
  };

  srv = function($resource, API_URL) {
    var actions, params, url;
    url = API_URL + '/v3/projects/:workId/submissions/:submissionId';
    params = {
      workId: '@workId',
      submissionId: '@submissionId'
    };
    actions = {
      query: {
        method: 'GET',
        isArray: false,
        transformResponse: transformResponse
      },
      get: {
        method: 'GET',
        isArray: false,
        transformResponse: transformResponse
      },
      updateRank: {
        method: 'PUT',
        transformRequest: updateRank
      }
    };
    return $resource(url, params, actions);
  };

  srv.$inject = ['$resource', 'API_URL'];

  angular.module('appirio-tech-submissions').factory('SubmissionDetailAPIService', srv);

}).call(this);

(function() {
  'use strict';
  var srv;

  srv = function() {
    srv.previewPrevious = function(selectedPreviewIndex, files) {
      var isFirst;
      isFirst = selectedPreviewIndex === 0;
      if (isFirst) {
        selectedPreviewIndex = files.length - 1;
      } else {
        selectedPreviewIndex -= 1;
      }
      return selectedPreviewIndex;
    };
    srv.previewNext = function(selectedPreviewIndex, files) {
      var isLast;
      isLast = selectedPreviewIndex === files.length - 1;
      if (isLast) {
        selectedPreviewIndex = 0;
      } else {
        selectedPreviewIndex += 1;
      }
      return selectedPreviewIndex;
    };
    return srv;
  };

  srv.$inject = [];

  angular.module('appirio-tech-submissions').factory('SubmissionSlidesService', srv);

}).call(this);
