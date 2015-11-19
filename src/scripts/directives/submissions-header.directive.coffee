'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/submissions-header.directive.html'
  scope       :
    text   : '@'
    subtext: '@'
    prev   : '@'
    next   : '@'

angular.module('appirio-tech-submissions').directive 'submissionsHeader', directive
