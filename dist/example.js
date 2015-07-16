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

angular.module("example").run(["$templateCache", function($templateCache) {$templateCache.put("views/submissions.html","<submissions work-id=\"leonardo\"></submissions>");
$templateCache.put("views/submission-detail.html","<h1>Submission Detail</h1><submission-detail submission-id=\"michelangelo\"></submission-detail>");
$templateCache.put("views/submission-slides.html","<h1>Submission Slides</h1><submission-slides></submission-slides>");}]);