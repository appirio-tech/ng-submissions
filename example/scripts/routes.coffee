'use strict'

config = ($stateProvider) ->
  states = {}

  states['submissions'] =
    url         : '/:workId/submissions/:phase'
    templateUrl : 'views/submissions.html'

  states['final-fixes'] =
    url         : '/final-fixes'
    templateUrl : 'views/final-fixes.html'

  states['submission-detail'] =
    url         : '/:workId/detail/:submissionId'
    templateUrl : 'views/submission-detail.html'

  states['submission-slides'] =
    url         : '/:workId/slides/:submissionId/:fileId'
    templateUrl : 'views/submission-slides.html'

  states['messaging'] =
    url : 'messaging/:id'
    templateUrl: 'views/messaging.html'
    controller: 'messagingController'
    controllerAs: 'vm'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()


