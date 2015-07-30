(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-ui-components'];

  angular.module('appirio-tech-submissions', dependencies);

}).call(this);

angular.module("appirio-tech-submissions").run(["$templateCache", function($templateCache) {$templateCache.put("views/submissions.directive.html","<loader ng-hide=\"vm.loaded\"></loader><h1>Concept Designs</h1><h1>Final Designs</h1><ul class=\"timeline\"><li></li><li class=\"active\"></li><li></li></ul><h4>Submissions for the Design Concept Phase coming in &hellip;</h4><h4>Final Design Phase starts in &hellip;</h4><ul class=\"countdown\"><li><span class=\"value\">9</span><span class=\"unit\">hrs</span></li><li><span class=\"value\">12</span><span class=\"unit\">mins</span></li><li><span class=\"value\">32</span><span class=\"unit\">sec</span></li></ul><h4>Give feedback and select the top 5 design concepts.</h4><p class=\"duration\">You have 39 hours to give feedback</p><ul class=\"top-selection\"><li><div class=\"shell\">1</div><avatar></avatar><div class=\"rank\">1st Place</div></li><li><div class=\"shell\">2</div><avatar></avatar><div class=\"rank\">2nd Place</div></li><li><div class=\"shell\">3</div><avatar></avatar><div class=\"rank\">3rd Place</div></li><li><div class=\"shell\">4</div><avatar></avatar><div class=\"rank\">4th Place</div></li><li><div class=\"shell\">5</div><avatar></avatar><div class=\"rank\">5th Place</div></li></ul><button class=\"confirm info\">Confirm your selections</button><hr/><ul class=\"submissions color-even\"><li ng-repeat=\"submission in vm.submissions.screeningSubmissions track by $index\" class=\"submission\"><ul class=\"user-details\"><li><avatar avatar-url=\"{{ submission.submitter.avatarUrl }}\"></avatar></li><li><div class=\"name-time\"><div class=\"name\">{{ submission.submitter.handle }}</div><time>{{ submission.createdAt | timeLapse }}</time></div></li></ul><ul class=\"thumbnails\"><li ng-repeat=\"file in submission.files track by $index\" class=\"thumbnail\"><a href=\"{{ file.url }}\"><img ng-src=\"{{ file.thumbnailUrl }}\" class=\"img\"/></a></li></ul><ul class=\"actions\"><li><a ui-sref=\"submission-slides({id: submission.id})\">view all (12)</a></li><li class=\"comments\">20/28<div class=\"icon bubble\"></div></li><li><select><option value=\"1\">1st Place</option><option value=\"2\">2nd Place</option><option value=\"3\">3rd Place</option><option value=\"4\">4th Place</option><option value=\"5\">5th Place</option></select></li></ul></li></ul>");
$templateCache.put("views/final-fixes.directive.html","<h1>Final Fixes</h1><ul class=\"timeline\"><li></li><li class=\"active\"></li><li></li></ul><h4>Final Fixes Phase starts in &hellip;</h4><ul class=\"countdown\"><li><span class=\"value\">9</span><span class=\"unit\">hrs</span></li><li><span class=\"value\">12</span><span class=\"unit\">mins</span></li><li><span class=\"value\">32</span><span class=\"unit\">sec</span></li></ul><h4>Give final feedback and accept each image to complate the design project.</h4><p class=\"duration\">You have 39 hours to give feedback</p><ul class=\"winner\"><li><avatar></avatar></li><li>Alpha User is the Winner!</li><li><button class=\"clean icon download\"></button></li></ul><hr/><ul class=\"approval\"><li class=\"filter\"><button class=\"clean\">Approved Screen</button> \n| <button class=\"clean\">Un-approved</button></li><li class=\"approve-all\"><input type=\"checkbox\"/><label>Approve all</label></li><li class=\"confirm\"><button class=\"info\">Confirm final approval</button></li></ul><ul class=\"previews\"><li ng-repeat=\"file in vm.files track by $index\" class=\"preview\"><div class=\"checkmark-container\"><div class=\"icon checkmark smallest\"></div></div><img ng-src=\"{{ file.thumbnailUrl }}\" ui-sref=\"submission-slides\" class=\"img\"/><p>{{ file.name }}</p></li></ul>");
$templateCache.put("views/submission-detail.directive.html","<ul class=\"actions\"><li class=\"submitter\"><avatar avatar-url=\"{{ vm.work.submitter.avatarUrl }}\"></avatar><div class=\"name-time\"><div class=\"name\">{{ vm.work.submitter.handle }}</div><time>{{ vm.work.createdAt | date: \'h:mm a, MMMM d, y\' }}</time></div></li><li class=\"accept\"><button ng-click=\"vm.acceptSubmission()\" class=\"clean icon checkmark\"></button><p ng-if=\"!vm.submissionAccepted\">Accept this submission</p><p ng-if=\"vm.submissionAccepted\">Submission Accepted</p></li><li class=\"comment\"><button class=\"clean icon bubble\"></button><p>Comment on this submission</p></li></ul><ul class=\"previews\"><li ng-repeat=\"file in vm.work.files track by $index\" class=\"preview\"><div class=\"checkmark-container\"><div class=\"icon checkmark smallest\"></div></div><img ng-src=\"{{ file.thumbnailUrl }}\" ui-sref=\"submission-slides\" class=\"img\"/><p>{{ file.name }}</p></li></ul>");
$templateCache.put("views/submission-slides.directive.html","<ul class=\"header\"><li class=\"submitter\"><avatar avatar-url=\"{{ vm.work.submitter.avatarUrl }}\"></avatar><div class=\"name-time\"><div class=\"name\">{{ vm.work.submitter.handle }}</div><time>{{ vm.work.createdAt | date: \'h:mm a, MMMM d, y\' }}</time></div></li><li><div class=\"icon checkmark\"></div><div class=\"icon bubble\"></div></li></ul><hr/><ul class=\"slideshow\"><li><button ng-click=\"vm.previewPrevious()\" class=\"clean icon circle-arrow biggest\"></button></li><li class=\"preview\"><div class=\"img-container\"><img ng-src=\"{{ vm.selectedPreview.url }}\"/></div><p>{{ vm.work.files[vm.selectedPreviewIndex].name }}</p></li><li><button ng-click=\"vm.previewNext()\" class=\"clean icon circle-arrow right biggest\"></button></li></ul><ul class=\"thumbnails\"><li ng-repeat=\"file in vm.work.files\" class=\"thumbnail\"><button class=\"clean thumbnail\"><img ng-src=\"{{ file.thumbnailUrl }}\" ng-click=\"vm.previewSelected($index)\"/></button></li></ul>");}]);
(function() {
  'use strict';
  var SubmissionsController;

  SubmissionsController = function($scope, SubmissionAPIService) {
    var activate, getSubmissions, onChange, vm;
    vm = this;
    vm.submissions = [];
    vm.loaded = false;
    vm.phase = $scope.phase;
    activate = function() {
      var params;
      params = {
        workId: $scope.workId,
        phase: $scope.phase
      };
      getSubmissions(params);
      return vm;
    };
    onChange = function(submissions) {
      return vm.submissions = submissions;
    };
    getSubmissions = function(params) {
      var resource, submissions;
      submissions = {
        submissions: [],
        avatars: {}
      };
      resource = SubmissionAPIService.get(params);
      resource.$promise.then(function(response) {
        submissions = response;
        return onChange(submissions);
      });
      resource.$promise["catch"](function(response) {});
      return resource.$promise["finally"](function() {
        return vm.loaded = true;
      });
    };
    return activate();
  };

  SubmissionsController.$inject = ['$scope', 'SubmissionAPIService'];

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

  FinalFixesController = function($scope) {
    var activate, vm;
    vm = this;
    vm.files = JSON.parse('[{"id":"abc","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"abc","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"abc","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"abc","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"abc","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"abc","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"}]');
    vm.acceptSubmission = function() {
      return vm.submissionAccepted = true;
    };
    activate = function() {
      return vm;
    };
    return activate();
  };

  FinalFixesController.$inject = ['$scope'];

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
        workId: '@workId'
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
    return (parsed != null ? (ref = parsed.result) != null ? ref.content : void 0 : void 0) || [];
  };

  srv = function($resource, API_URL) {
    var methods, params, url;
    url = API_URL + '/projects/:workId/submissions';
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
    vm.submissionAccepted = null;
    vm.acceptSubmission = function() {
      return vm.submissionAccepted = true;
    };
    activate = function() {
      var params, resource;
      params = {
        workId: $scope.workId,
        submissionId: $scope.submissionId
      };
      resource = SubmissionDetailAPIService.get(params);
      resource.$promise.then(function(response) {
        vm.work = response;
        return vm.submissionAccepted = vm.work.accepted;
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

  SubmissionSlidesController = function($scope, SubmissionDetailAPIService, SubmissionSlidesService) {
    var activate, setSelectedPreview, vm, watchSelectedPreviewIndex;
    vm = this;
    vm.selectedPreview = null;
    vm.selectedPreviewIndex = 0;
    activate = function() {
      var params, resource;
      params = {
        workId: $scope.workId,
        submissionId: $scope.submissionId
      };
      resource = SubmissionDetailAPIService.get(params);
      resource.$promise.then(function(response) {
        var ref;
        vm.work = response;
        return vm.selectedPreview = (ref = vm.work) != null ? ref.files[vm.selectedPreviewIndex] : void 0;
      });
      resource.$promise["catch"](function(error) {});
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
      var ref;
      if ((ref = vm.work) != null ? ref.files : void 0) {
        return vm.selectedPreview = vm.work.files[index];
      }
    };
    $scope.$watch(watchSelectedPreviewIndex, setSelectedPreview);
    return activate();
  };

  SubmissionSlidesController.$inject = ['$scope', 'SubmissionDetailAPIService', 'SubmissionSlidesService'];

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
  var srv, transformResponse;

  transformResponse = function(response) {
    var parsed, ref;
    parsed = JSON.parse(response);
    return (parsed != null ? (ref = parsed.result) != null ? ref.content : void 0 : void 0) || {};
  };

  srv = function($resource, API_URL) {
    var actions, params, url;
    url = API_URL + '/projects/:workId/submissions/:submissionId';
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
