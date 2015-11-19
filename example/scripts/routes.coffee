'use strict'

config = ($stateProvider) ->
  states = {}

  states['step'] =
    url         : '/projects/:projectId/:stepId?userType'
    controller  : 'StepController as vm'
    templateUrl : 'views/step.example.html'

  states['submission-detail'] =
    url         : '/projects/:projectId/:stepId/:submissionId?userType'
    controller  : 'SubmissionDetailExampleController as vm'
    templateUrl : 'views/submission-detail.example.html'

  states['file-detail'] =
    url         : '/projects/:projectId/:stepId/:submissionId/:fileId?userType'
    controller  : 'FileDetailExampleController as vm'
    templateUrl : 'views/file-detail.example.html'

  states['submissions-header'] =
    url         : '/'
    templateUrl : 'views/submissions-header.example.html'

  states['top-selections'] =
    url         : '/top-selections'
    controller  : 'TopSelectionExampleController as vm'
    templateUrl : 'views/top-selections.example.html'

  states['row-of-thumbnails'] =
    url         : '/row-of-thumbnails'
    controller  : 'RowOfThumbnailsExampleController as vm'
    templateUrl : 'views/row-of-thumbnails.example.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()


