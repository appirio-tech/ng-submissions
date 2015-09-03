angular.module("app.constants", [])

.constant("API_URL", "https://api.topcoder.com")

.constant("AVATAR_URL", "https://www.topcoder.com")

.constant("SUBMISSION_URL", "https://studio.topcoder.com")

.constant("AUTH0_CLIENT_ID", "abc123")

.constant("AUTH0_DOMAIN", "topcoder.auth0.com")

.constant("AUTH0_TOKEN_NAME", "userJWTToken")

.constant("AUTH0_REFRESH_TOKEN_NAME", "userRefreshJWTToken")

;
(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-submissions', 'appirio-tech-ng-api-services', angularDragula(angular)];

  angular.module('example', dependencies);

}).call(this);

(function() {
  'use strict';
  var config;

  config = function($stateProvider) {
    var key, results, state, states;
    states = {};
    states['design-concepts'] = {
      url: '/',
      templateUrl: 'views/design-concepts.html'
    };
    states['complete-designs'] = {
      url: '/projects/:projectId/:stepId/complete-designs',
      templateUrl: 'views/complete-designs.html'
    };
    states['final-fixes'] = {
      url: '/projects/:projectId/:stepId/final-fixes',
      templateUrl: 'views/final-fixes.html'
    };
    states['submission-detail'] = {
      url: '/projects/:projectId/:stepId/:submissionId',
      templateUrl: 'views/submission-detail.html'
    };
    states['file-detail'] = {
      url: '/projects/:projectId/:stepId/:submissionId/:fileId',
      templateUrl: 'views/file-detail.html'
    };
    results = [];
    for (key in states) {
      state = states[key];
      results.push($stateProvider.state(key, state));
    }
    return results;
  };

  config.$inject = ['$stateProvider'];

  angular.module('example').config(config).run();

}).call(this);

angular.module("example").run(["$templateCache", function($templateCache) {$templateCache.put("views/final-fixes.html","<final-fixes project-id=\"abc\" step-id=\"ghi\"></final-fixes>");
$templateCache.put("views/submission-detail.html","<submission-detail project-id=\"abc\" step-id=\"abc\" submission-id=\"abc\"></submission-detail>");
$templateCache.put("views/file-detail.html","<file-detail project-id=\"abc\" step-id=\"abc\" submission-id=\"abc\" file-id=\"abc\"></file-detail>");}]);