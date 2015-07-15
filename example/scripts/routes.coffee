'use strict'

config = ($stateProvider) ->
  states = {}

  states['submission'] =
    url         : '/'
    title       : 'submission'
    templateUrl : 'views/submission.html'


  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('appirio-tech-submissions').config(config).run()


