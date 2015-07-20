'use strict'

config = ($stateProvider) ->
  states = {}

  states['submissions'] =
    url         : '/'
    templateUrl : 'views/submissions.html'

  states['submission-detail'] =
    url         : '/detail'
    templateUrl : 'views/submission-detail.html'

  states['submission-slides'] =
    url         : '/slides'
    templateUrl : 'views/submission-slides.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()


