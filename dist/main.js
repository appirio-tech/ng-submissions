angular.module("app.constants", [])

.constant("apiUrl", "https://api.topcoder-dev.com/v3/")

.constant("API_URL", "https://api.topcoder-dev.com/v3")

.constant("API_URL_V2", "https://api.topcoder-dev.com/v2")

.constant("AVATAR_URL", "http://www.topcoder.com")

.constant("SUBMISSION_URL", "https://studio.topcoder.com")

.constant("AUTH0_CLIENT_ID", "abc123")

.constant("AUTH0_DOMAIN", "topcoder-dev.auth0.com")

.constant("AUTH0_TOKEN_NAME", "userJWTToken")

;
(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-ui-components'];

  angular.module('appirio-tech-submissions', dependencies);

}).call(this);

angular.module("appirio-tech-submissions").run(["$templateCache", function($templateCache) {$templateCache.put("views/submissions.directive.html","<loader ng-hide=\"vm.loaded\"></loader><h1 class=\"work-name\">{{ vm.submissions.workName }} : {{ vm.submissions.workType }}</h1><hr/><h3>Screening Submissions Phase</h3><h4>Review and comment on submissions. Choose the participants that will move to the final phase.</h4><ul class=\"submissions\"><li ng-repeat=\"submission in vm.submissions.screeningSubmissions track by $index\" class=\"submission\"><ul class=\"user-details\"><li><avatar avatar-url=\"{{ submission.submitter.avatarUrl }}\"></avatar></li><li><div class=\"name-time\"><div class=\"name\">{{ submission.submitter.handle }}</div><time>{{ submission.createdAt | timeLapse }}</time></div></li></ul><ul class=\"thumbnails\"><li ng-repeat=\"file in submission.files track by $index\" class=\"thumbnail\"><div class=\"img\"></div></li></ul><ul class=\"actions\"><li class=\"view\"><a ui-sref=\"submission-slides\">and 123 more</a></li><li><div class=\"checkmark\"></div></li><li><div class=\"bubble\"></div></li></ul></li></ul><hr/><h3>Final Submissions</h3><h4>Begins in 3 days</h4>");
$templateCache.put("views/submission-detail.directive.html","<ul class=\"actions\"><li class=\"submitter\"><div class=\"avatar\"></div><div class=\"name-time\"><div class=\"name\">{{vm.work.submitter.handle}}</div><time>{{vm.work.createdAt | date: \'h:mm a, MMMM d, y\'}}</time></div></li><li class=\"accept\"><button ng-click=\"vm.acceptSubmission()\" class=\"checkmark\"></button><p ng-if=\"!vm.submissionAccepted\">Accept this submission</p><p ng-if=\"vm.submissionAccepted\">Submission Accepted</p></li><li class=\"comment\"><button class=\"bubble\"></button><p>Comment on this submission</p></li></ul><ul class=\"previews\"><li ng-repeat=\"file in vm.work.files track by $index\" class=\"preview\"><div class=\"checkmark\"></div><img src=\"{{file.thumbnailUrl}}\" ui-sref=\"submission-slides\" class=\"img\"/><p>{{file.id}}</p></li></ul>");
$templateCache.put("views/submission-slides.directive.html","<ul class=\"header\"><li class=\"submitter\"><div class=\"avatar\"></div><div class=\"name-time\"><div class=\"name\">{{vm.work.submitter.handle}}</div><time>{{vm.work.createdAt | date: \'h:mm a, MMMM d, y\'}}</time></div></li><li><div class=\"checkmark\"></div><div class=\"bubble\"></div></li></ul><hr/><ul class=\"slideshow\"><li><button ng-click=\"vm.previewPrevious()\" class=\"left-arrow\"></button></li><li class=\"preview\"><div class=\"img\"><img src=\"{{vm.selectedPreview.url}}\" class=\"img\"/></div><p>{{vm.work.files[vm.selectedPreviewIndex][\'id\']}}</p></li><li><button ng-click=\"vm.previewNext()\" class=\"right-arrow\"></button></li></ul><ul class=\"thumbnails\"><li ng-repeat=\"file in vm.work.files\" class=\"thumbnail\"><button class=\"thumbnail\"><img src=\"{{file.thumbnailUrl}}\" ng-click=\"vm.previewSelected($index)\" class=\"img\"/></button></li></ul>");}]);
(function() {
  'use strict';
  var SubmissionsController;

  SubmissionsController = function($scope, SubmissionAPIService) {
    var activate, getSubmissions, onChange, vm;
    vm = this;
    vm.submissions = [];
    vm.loaded = false;
    activate = function() {
      var params;
      params = {
        workId: $scope.workId
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
        vm.loaded = true;
        return onChange(submissions);
      });
      resource.$promise["catch"](function(response) {
        return vm.loaded = false;
      });
      return resource.$promise["finally"](function() {});
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
        workId: '@workId'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('submissions', directive);

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
    url = API_URL + '/work/:workId/submissions';
    params = {
      workId: '@workId'
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

  SubmissionSlidesController = function($scope, SubmissionDetailAPIService) {
    var activate, setSelectedPreview, vm, watchSelectedPreviewIndex;
    vm = this;
    vm.selectedPreviewIndex = 0;
    vm.selectedPreview = null;
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
      var isFirst;
      isFirst = vm.selectedPreviewIndex === 0;
      if (isFirst) {
        return vm.selectedPreviewIndex = vm.work.files.length - 1;
      } else {
        return vm.selectedPreviewIndex -= 1;
      }
    };
    vm.previewNext = function() {
      var isLast;
      isLast = vm.selectedPreviewIndex === vm.work.files.length - 1;
      if (isLast) {
        return vm.selectedPreviewIndex = 0;
      } else {
        return vm.selectedPreviewIndex += 1;
      }
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

  SubmissionSlidesController.$inject = ['$scope', 'SubmissionDetailAPIService'];

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
    url = API_URL + '/work/:workId/submissions/:submissionId';
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
