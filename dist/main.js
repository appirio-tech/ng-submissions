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
$templateCache.put("views/submission-detail.directive.html","<h4 class=\"work-name\">{{ vm.workName }} : {{ vm.workType }}</h4><ul class=\"actions\"><li class=\"submitter\"><div class=\"avatar\"></div><div class=\"name-time\"><div class=\"name\">Rafael is the best ninja mutant turtle</div><time>Submitted: 12:30 June 24 2015</time></div></li><li class=\"accept\"><div class=\"checkmark\"></div><p>Accept this submission</p></li><li class=\"comment\"><div class=\"bubble\"></div><p>Comment on this submission</p></li></ul><ul class=\"previews\"><li ng-repeat=\"preview in [1, 2, 3, 4, 5, 6] track by $index\" class=\"preview\"><div class=\"checkmark\"></div><div class=\"img\"></div><p>a-long-freaking-name-oh-baby-jesus</p></li></ul>");
$templateCache.put("views/submission-slides.directive.html","<ul class=\"header\"><li class=\"submitter\"><div class=\"avatar\"></div><div class=\"name-time\"><div class=\"name\">alpha User</div><time>Submitted: 12:30 June 24 2015</time></div></li><li><div class=\"checkmark\"></div><div class=\"bubble\"></div></li></ul><hr/><ul class=\"slideshow\"><li><button class=\"left-arrow\"></button></li><li class=\"preview\"><div class=\"img\"></div><p>a-really-login-freaken-name-that-some-idiot-put</p></li><li><button class=\"right-arrow\"></button></li></ul><ul class=\"thumbnails\"><li class=\"thumbnail\"><button class=\"img\"></button></li><li class=\"thumbnail\"><button class=\"img\"></button></li><li class=\"thumbnail\"><button class=\"img\"></button></li><li class=\"thumbnail\"><button class=\"img\"></button></li><li class=\"thumbnail\"><button class=\"img\"></button></li><li class=\"thumbnail\"><button class=\"img\"></button></li><li class=\"thumbnail\"><button class=\"img\"></button></li></ul>");}]);
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
        submissionId: '@submissionId'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('submissions', directive);

}).call(this);

(function() {
  'use strict';
  var SubmissionDetailController;

  SubmissionDetailController = function($scope) {
    var activate, vm;
    vm = this;
    activate = function() {
      vm.workName = 'IBM Internal HR';
      return vm.workType = 'mobile app';
    };
    return activate();
  };

  SubmissionDetailController.$inject = ['$scope'];

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
        workId: '@workId'
      }
    };
  };

  angular.module('appirio-tech-submissions').directive('submissionDetail', directive);

}).call(this);

(function() {


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