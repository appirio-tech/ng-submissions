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

  states['grid-of-thumbnails'] =
    url         : '/grid-of-thumbnails'
    controller  : 'GridOfThumbnailsExampleController as vm'
    templateUrl : 'views/grid-of-thumbnails.example.html'

  states['submission-winner-card'] =
    url         : '/submission-winner-card'
    templateUrl : 'views/submission-winner-card.example.html'

  states['submission-winners'] =
    url         : '/submission-winners'
    templateUrl : 'views/submission-winners.example.html'

  states['submission-countdown'] =
    url         : '/submission-countdown'
    templateUrl : 'views/submission-countdown.example.html'

  states['final-development'] =
    url         : '/final-development'
    templateUrl : 'views/final-development.example.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()


