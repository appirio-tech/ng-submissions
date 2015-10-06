angular.module("app.constants", [])

.constant("API_URL", "https://api.topcoder-dev.com")

.constant("AVATAR_URL", "https://www.topcoder.com")

.constant("SUBMISSION_URL", "https://studio.topcoder.com")

.constant("AUTH0_CLIENT_ID", "JFDo7HMkf0q2CkVFHojy3zHWafziprhT")

.constant("AUTH0_DOMAIN", "topcoder-dev.auth0.com")

.constant("AUTH0_TOKEN_NAME", "userJWTToken")

.constant("AUTH0_REFRESH_TOKEN_NAME", "userRefreshJWTToken")

;
(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'app.constants', 'appirio-tech-submissions'];

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
      controller: 'FileDetailExampleController as vm',
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
$templateCache.put("views/file-detail.html","<modal show=\"true\" background-click-close=\"background-click-close\"><file-detail project-id=\"abc\" step-id=\"abc\" submission-id=\"abc\" file-id=\"abc\"></file-detail></modal>");}]);
(function() {
  'use strict';
  var controller;

  controller = function() {
    var activate, vm;
    vm = this;
    vm.show = true;
    activate = function() {
      return vm;
    };
    return activate();
  };

  angular.module('example').controller('FileDetailExampleController', controller);

}).call(this);
