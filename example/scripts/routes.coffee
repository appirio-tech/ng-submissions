'use strict'

config = ($stateProvider) ->
  states = {}

  states['submissions'] =
    url         : '/'
    templateUrl : 'views/submissions.html'

  states['submission-detail'] =
    url         : '/detail'
    templateUrl : 'views/submission-detail.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('appirio-tech-submissions').config(config).run()


