'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/final-development.directive.html'
  controller : 'FinalDevelopmentController as vm'
  scope      : true

angular.module('appirio-tech-submissions').directive 'finalDevelopment', directive
