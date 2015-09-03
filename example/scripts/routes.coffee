'use strict'

config = ($stateProvider) ->
  states = {}

  states['design-concepts'] =
    url         : '/'
    templateUrl : 'views/design-concepts.html'

  states['complete-designs'] =
    url         : '/projects/:projectId/:stepId/complete-designs'
    templateUrl : 'views/complete-designs.html'

  states['final-fixes'] =
    url         : '/projects/:projectId/:stepId/final-fixes'
    templateUrl : 'views/final-fixes.html'

  states['submission-detail'] =
    url         : '/projects/:projectId/:stepId/:submissionId'
    templateUrl : 'views/submission-detail.html'

  states['file-detail'] =
    url         : '/projects/:projectId/:stepId/:submissionId/:fileId'
    templateUrl : 'views/file-detail.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()


