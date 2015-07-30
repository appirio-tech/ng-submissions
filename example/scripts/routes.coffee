'use strict'

config = ($stateProvider) ->
  states = {}

  states['submissions'] =
    url         : '/'
    templateUrl : 'views/submissions.html'

  states['final-fixes'] =
    url         : '/final-fixes'
    templateUrl : 'views/final-fixes.html'

  states['submission-detail'] =
    url         : '/detail/:submissionId'
    templateUrl : 'views/submission-detail.html'

  states['submission-slides'] =
    url         : '/slides/:submissionId/:index'
    templateUrl : 'views/submission-slides.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()


