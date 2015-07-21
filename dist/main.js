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

  dependencies = ['ui.router', 'ngResource', 'app.constants'];

  angular.module('appirio-tech-submissions', dependencies);

}).call(this);

angular.module("appirio-tech-submissions").run(["$templateCache", function($templateCache) {$templateCache.put("views/submissions.directive.html","<h1 class=\"work-name\">{{ vm.workName }} : {{ vm.workType }}</h1><hr/><h3>Screening Submissions Phase</h3><h4>Review and comment on submissions. Choose the participants that will move to the final phase.</h4><ul class=\"submissions\"><li ng-repeat=\"submission in vm.screeningSubmissions track by $index\" class=\"submission\"><ul class=\"user-details\"><li><div class=\"avatar\"></div></li><li><div class=\"name-time\"><div class=\"name\">{{ submission.name }}</div><time>{{ submission.createdAt }}</time></div></li></ul><ul class=\"thumbnails\"><li ng-repeat=\"i in [1, 2, 3, 4, 5, 6, 7, 8] track by $index\" class=\"thumbnail\"><div class=\"img\"></div></li></ul><ul class=\"actions\"><li class=\"view\"><a href=\"#\">and 123 more</a></li><li><div class=\"checkmark\"></div></li><li><div class=\"bubble\"></div></li></ul></li></ul><hr/><h3>Final Submissions</h3><h4>Begins in 3 days</h4>");
$templateCache.put("views/submission-detail.directive.html","<ul class=\"actions\"><li class=\"submitter\"><div class=\"avatar\"></div><div class=\"name-time\"><div class=\"name\">{{vm.work.submitter.handle}}</div><time>{{vm.work.createdAt | date: \'h:mm a, MMMM d, y\'}}</time></div></li><li class=\"accept\"><button ng-click=\"vm.acceptSubmission()\" class=\"checkmark\"></button><p ng-if=\"!vm.submissionAccepted\">Accept this submission</p><p ng-if=\"vm.submissionAccepted\">Submission Accepted</p></li><li class=\"comment\"><button class=\"bubble\"></button><p>Comment on this submission</p></li></ul><ul class=\"previews\"><li ng-repeat=\"file in vm.work.files track by $index\" class=\"preview\"><div class=\"checkmark\"></div><img src=\"{{file.thumbnailUrl}}\" ui-sref=\"submission-slides\" class=\"img\"/><p>{{file.id}}</p></li></ul>");
$templateCache.put("views/submission-slides.directive.html","<ul class=\"header\"><li class=\"submitter\"><div class=\"avatar\"></div><div class=\"name-time\"><div class=\"name\">{{vm.work.submitter.handle}}</div><time>{{vm.work.createdAt | date: \'h:mm a, MMMM d, y\'}}</time></div></li><li><div class=\"checkmark\"></div><div class=\"bubble\"></div></li></ul><hr/><ul class=\"slideshow\"><li><button ng-click=\"vm.previewPrevious()\" class=\"left-arrow\"></button></li><li class=\"preview\"><div class=\"img\"><img src=\"{{vm.selectedPreview.url}}\" class=\"img\"/></div><p>{{vm.work.files[vm.selectedPreviewIndex][\'id\']}}</p></li><li><button ng-click=\"vm.previewNext()\" class=\"right-arrow\"></button></li></ul><ul class=\"thumbnails\"><li ng-repeat=\"file in vm.work.files\" class=\"thumbnail\"><img src=\"{{file.thumbnailUrl}}\" ng-click=\"vm.previewSelected($index)\" class=\"img\"/></li></ul>");}]);
(function() {
  'use strict';
  var SubmissionsController;

  SubmissionsController = function($scope) {
    var activate, vm;
    vm = this;
    activate = function() {
      vm.workName = 'IBM Internal HR';
      vm.workType = 'mobile app';
      vm.screeningSubmissions = [];
      vm.screeningSubmissions.push({
        name: 'Batman',
        createdAt: '4 Days ago'
      });
      vm.screeningSubmissions.push({
        name: 'Robin',
        createdAt: '4 Days ago'
      });
      vm.screeningSubmissions.push({
        name: 'Dude with freaking long name',
        createdAt: '4 Days ago'
      });
      return vm.screeningSubmissions.push({
        name: 'Jesus',
        createdAt: '4 Days ago'
      });
    };
    return activate();
  };

  SubmissionsController.$inject = ['$scope'];

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
        response;
        vm.work = response;
        return vm.submissionAccepted = vm.work.accepted;
      });
      resource.$promise["catch"](function(error) {
        return console.log('error on submission detail', error);
      });
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
        workId: '$scope.workId',
        submissionId: '$scope.submissionId'
      };
      resource = SubmissionDetailAPIService.get(params);
      resource.$promise.then(function(response) {
        response;
        vm.work = response;
        return vm.selectedPreview = vm.work.files[vm.selectedPreviewIndex];
      });
      resource.$promise["catch"](function(error) {
        return console.log('error on submission detail', error);
      });
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
        workId: '@workId'
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
