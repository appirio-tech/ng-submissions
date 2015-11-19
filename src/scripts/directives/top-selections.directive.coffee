'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/top-selections.directive.html'
  controller : 'TopSelectionsController as vm'
  scope      :
    ranks: '='

angular.module('appirio-tech-submissions').directive 'topSelections', directive
