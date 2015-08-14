'use strict'

directive = ->
  restrict    : 'E'
  controller  : 'FinalFixesController as vm'
  templateUrl : 'views/final-fixes.directive.html'
  scope       :
    workId    : '@workId'
    phase     : '@phase'

angular.module('appirio-tech-submissions').directive 'finalFixes', directive
