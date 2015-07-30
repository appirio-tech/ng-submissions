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

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-submissions'];

  angular.module('example', dependencies);

}).call(this);

(function() {
  'use strict';
  var config;

  config = function($stateProvider) {
    var key, results, state, states;
    states = {};
    states['submissions'] = {
      url: '/',
      templateUrl: 'views/submissions.html'
    };
    states['final-fixes'] = {
      url: '/final-fixes',
      templateUrl: 'views/final-fixes.html'
    };
    states['submission-detail'] = {
      url: '/detail',
      templateUrl: 'views/submission-detail.html'
    };
    states['submission-slides'] = {
      url: '/slides',
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

angular.module("example").run(["$templateCache", function($templateCache) {$templateCache.put("views/submissions.html","<submissions work-id=\"leonardo\" phase=\"Final\"></submissions>");
$templateCache.put("views/final-fixes.html","<final-fixes work-id=\"leonardo\"></final-fixes>");
$templateCache.put("views/submission-detail.html","<h1>Submission Detail</h1><submission-detail work-id=\"123\" submission-id=\"123\"></submission-detail>");
$templateCache.put("views/submission-slides.html","<h1>Submission Slides</h1><submission-slides work-id=\"123\" submission-id=\"123\"></submission-slides>");}]);