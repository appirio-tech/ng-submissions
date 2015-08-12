angular.module("app.constants", [])

.constant("apiUrl", "http://api.topcoder.com/v3/")

.constant("API_URL", "http://api.topcoder.com/v3")

.constant("API_URL_V2", "https://api.topcoder.com/v2")

.constant("AVATAR_URL", "http://www.topcoder.com")

.constant("SUBMISSION_URL", "https://studio.topcoder.com")

.constant("AUTH0_CLIENT_ID", "abc123")

.constant("AUTH0_DOMAIN", "topcoder.auth0.com")

.constant("AUTH0_TOKEN_NAME", "userJWTToken")

.constant("AUTH0_REFRESH_TOKEN_NAME", "userRefreshJWTToken")

;
(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-submissions'];

  angular.module('example', dependencies);

}).call(this);

(function() {
  'use strict';
  var config;

  config = function($stateProvider) {
    var key, results, state, states;
    states = {};
    states['design-concepts'] = {
      url: '/design-concepts',
      templateUrl: 'views/design-concepts.html'
    };
    states['complete-designs'] = {
      url: '/complete-designs',
      templateUrl: 'views/complete-designs.html'
    };
    states['final-fixes'] = {
      url: '/final-fixes',
      templateUrl: 'views/final-fixes.html'
    };
    states['submission-detail'] = {
      url: '/:workId/detail/:submissionId',
      templateUrl: 'views/submission-detail.html'
    };
    states['submission-slides'] = {
      url: '/:workId/slides/:submissionId/:fileId',
      templateUrl: 'views/submission-slides.html'
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

angular.module("example").run(["$templateCache", function($templateCache) {$templateCache.put("views/final-fixes.html","<final-fixes work-id=\"leonardo\"></final-fixes>");
$templateCache.put("views/submission-detail.html","<submission-detail work-id=\"123\" submission-id=\"123\"></submission-detail>");
$templateCache.put("views/submission-slides.html","<submission-slides work-id=\"123\" submission-id=\"123\"></submission-slides>");}]);