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

  dependencies = ['ui.router', 'app.constants', 'appirio-tech-submissions'];

  angular.module('example', dependencies);

}).call(this);

(function() {
  'use strict';
  var config;

  config = function($stateProvider) {
    var key, results, state, states;
    states = {};
    states['step'] = {
      url: '/projects/:projectId/:stepId?userType',
      controller: 'StepController as vm',
      templateUrl: 'views/step.example.html'
    };
    states['submission-detail'] = {
      url: '/projects/:projectId/:stepId/:submissionId?userType',
      controller: 'SubmissionDetailExampleController as vm',
      templateUrl: 'views/submission-detail.example.html'
    };
    states['file-detail'] = {
      url: '/projects/:projectId/:stepId/:submissionId/:fileId?userType',
      controller: 'FileDetailExampleController as vm',
      templateUrl: 'views/file-detail.example.html'
    };
    states['submissions-header'] = {
      url: '/',
      templateUrl: 'views/submissions-header.example.html'
    };
    states['top-selections'] = {
      url: '/top-selections',
      controller: 'TopSelectionExampleController as vm',
      templateUrl: 'views/top-selections.example.html'
    };
    states['file-row'] = {
      url: '/file-row',
      controller: 'FileRowExampleController as vm',
      templateUrl: 'views/file-row.example.html'
    };
    states['file-grid'] = {
      url: '/file-grid',
      controller: 'FileGridExampleController as vm',
      templateUrl: 'views/file-grid.example.html'
    };
    states['submission-winner-card'] = {
      url: '/submission-winner-card',
      templateUrl: 'views/submission-winner-card.example.html'
    };
    states['submission-winners'] = {
      url: '/submission-winners',
      templateUrl: 'views/submission-winners.example.html'
    };
    states['submission-countdown'] = {
      url: '/submission-countdown',
      templateUrl: 'views/submission-countdown.example.html'
    };
    states['final-development'] = {
      url: '/final-development',
      templateUrl: 'views/final-development.example.html'
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

angular.module("example").run(["$templateCache", function($templateCache) {$templateCache.put("views/file-detail.example.html","<modal show=true background-click-close=background-click-close><file-detail project-id=abc step-id=abc submission-id=abc file-id=abc user-type=\"{{ vm.userType }}\"></file-detail></modal>");
$templateCache.put("views/file-grid.example.html","<file-grid thumbnail-groups=vm.thumbnailGroups></file-grid>");
$templateCache.put("views/file-row.example.html","<file-row thumbnails=vm.thumbnails view-all=http://www.google.com view-all-text=\"+3 more\" tool-tip=tool-tip></file-row><br><br><br><file-row thumbnails=vm.thumbnails2></file-row>");
$templateCache.put("views/final-development.example.html","<final-development></final-development>");
$templateCache.put("views/step.example.html","<submissions project-id=\"{{ vm.projectId }}\" step-id=\"{{ vm.stepId }}\" step-type=\"{{ vm.stepType }}\" user-type=\"{{ vm.userType }}\"></submissions>");
$templateCache.put("views/submission-countdown.example.html","<submission-countdown end=2015-09-08T23:24:48.374Z text=\"Recieve final design submissions\"></submission-countdown>");
$templateCache.put("views/submission-detail.example.html","<submission-detail project-id=abc step-id=abc submission-id=abc user-type=\"{{ vm.userType }}\"></submission-detail>");
$templateCache.put("views/submission-winner-card.example.html","<ul class=flex><li><submission-winner-card name-text=\"Jeffrey Ramirez\" avatar-url=/images/flower.png rank=1st class=\"light-bg elevated-bottom\"></submission-winner-card></li><li><submission-winner-card name-text=\"Martha Quintero\" avatar-url=/images/flower.png rank=2nd class=\"light-bg elevated-bottom\"></submission-winner-card></li><li><submission-winner-card name-text=\"Luisa Crespa\" avatar-url=/images/flower.png rank=3rd class=\"light-bg elevated-bottom\"></submission-winner-card></li><li><submission-winner-card name-text=\"Luisa Crespa\" avatar-url=/images/flower.png class=\"light-bg elevated-bottom\"></submission-winner-card></li></ul>");
$templateCache.put("views/submission-winners.example.html","<submission-winners></submission-winners>");
$templateCache.put("views/submissions-header.example.html","<submissions-header text=\"design concept phase\" subtext=\"You will see submissions here when they are ready.\" next=http://www.google.com prev=http://www.google.com></submissions-header>");
$templateCache.put("views/top-selections.example.html","<top-selections ranks=vm.ranks></top-selections><top-selections></top-selections>");}]);
(function() {
  'use strict';
  var controller;

  controller = function($stateParams) {
    var activate, vm;
    vm = this;
    vm.show = true;
    vm.userType = $stateParams.userType;
    activate = function() {
      return vm;
    };
    return activate();
  };

  controller.$inject = ['$stateParams'];

  angular.module('example').controller('FileDetailExampleController', controller);

}).call(this);

(function() {
  'use strict';
  var controller;

  controller = function($stateParams) {
    var activate, vm;
    vm = this;
    vm.userType = $stateParams.userType;
    activate = function() {
      return vm;
    };
    return activate();
  };

  controller.$inject = ['$stateParams'];

  angular.module('example').controller('SubmissionDetailExampleController', controller);

}).call(this);

(function() {
  'use strict';
  var StepController;

  StepController = function($scope, $stateParams, $rootScope, StepsService) {
    var activate, onChange, vm;
    vm = this;
    vm.projectId = $stateParams.projectId;
    vm.stepId = $stateParams.stepId;
    vm.userType = $stateParams.userType;
    vm.stepType = null;
    onChange = function() {
      var currentStep;
      currentStep = StepsService.getStepById(vm.projectId, vm.stepId);
      if (currentStep) {
        vm.stepId = currentStep.id;
        return vm.stepType = currentStep.stepType;
      }
    };
    activate = function() {
      var destroyStepsListener;
      destroyStepsListener = $rootScope.$on('StepsService:changed', function() {
        return onChange();
      });
      $scope.$on('$destroy', function() {
        return destroyStepsListener();
      });
      return onChange();
    };
    activate();
    return vm;
  };

  StepController.$inject = ['$scope', '$stateParams', '$rootScope', 'StepsService'];

  angular.module('example').controller('StepController', StepController);

}).call(this);

(function() {
  'use strict';
  var TopSelectionExampleController;

  TopSelectionExampleController = function($scope) {
    var activate, avatars, vm;
    vm = this;
    vm.ranks = [];
    avatars = ['/images/batman.jpg', '/images/phoenix.jpg', '/images/spider.png'];
    activate = function() {
      var avatar, i, j, len;
      for (i = j = 0, len = avatars.length; j < len; i = ++j) {
        avatar = avatars[i];
        vm.ranks.push({
          id: i + 1,
          value: i + 1,
          avatarUrl: avatar
        });
      }
      return vm;
    };
    return activate();
  };

  TopSelectionExampleController.$inject = ['$scope'];

  angular.module('appirio-tech-submissions').controller('TopSelectionExampleController', TopSelectionExampleController);

}).call(this);

(function() {
  'use strict';
  var controller;

  controller = function($scope) {
    var activate, images, vm;
    vm = this;
    vm.thumbnails = [];
    vm.thumbnails2 = [];
    vm.thumbnails3 = [];
    images = ['/images/batman.jpg', '/images/phoenix.jpg', '/images/spider.png', '/images/phoenix.jpg', '/images/spider.png'];
    activate = function() {
      var i, image, j, len;
      for (i = j = 0, len = images.length; j < len; i = ++j) {
        image = images[i];
        vm.thumbnails.push({
          id: i + 1,
          url: image,
          link: 'http://www.google.com'
        });
      }
      vm.thumbnails2 = vm.thumbnails.slice(0, 3);
      vm.thumbnails3 = vm.thumbnails.concat(vm.thumbnails);
      return vm;
    };
    return activate();
  };

  controller.$inject = ['$scope'];

  angular.module('appirio-tech-submissions').controller('FileRowExampleController', controller);

}).call(this);

(function() {
  'use strict';
  var controller;

  controller = function($scope) {
    var activate, images, vm;
    vm = this;
    vm.thumbnailGroups = [];
    images = ['/images/batman.jpg', '/images/phoenix.jpg', '/images/spider.png', '/images/phoenix.jpg'];
    activate = function() {
      var i, image, j, k, l, lastItem, len, thumbnails;
      for (j = k = 0; k <= 2; j = ++k) {
        thumbnails = [];
        for (i = l = 0, len = images.length; l < len; i = ++l) {
          image = images[i];
          thumbnails.push({
            id: i + 1,
            url: image,
            link: 'http://www.google.com'
          });
        }
        vm.thumbnailGroups.push(thumbnails);
      }
      lastItem = vm.thumbnailGroups[vm.thumbnailGroups.length - 1];
      lastItem = lastItem.slice(1);
      vm.thumbnailGroups[vm.thumbnailGroups.length - 1] = lastItem;
      return vm;
    };
    return activate();
  };

  controller.$inject = ['$scope'];

  angular.module('appirio-tech-submissions').controller('FileGridExampleController', controller);

}).call(this);
