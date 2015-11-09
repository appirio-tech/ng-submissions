'use strict'

config = ($stateProvider) ->
  states = {}

  states['step'] =
    url         : '/projects/:projectId/:stepId?userType'
    controller  : 'StepController as vm'
    templateUrl : 'views/step.html'

  states['submission-detail'] =
    url         : '/projects/:projectId/:stepId/:submissionId?userType'
    controller  : 'SubmissionDetailExampleController as vm'
    templateUrl : 'views/submission-detail.html'

  states['file-detail'] =
    url         : '/projects/:projectId/:stepId/:submissionId/:fileId?userType'
    controller  : 'FileDetailExampleController as vm'
    templateUrl : 'views/file-detail.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()


