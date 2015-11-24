'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/file-row.directive.html'
  controller : 'FileRowController as vm'
  scope      :
    files      : '='
    limit      : '@'
    viewAllUrl : '@'

angular.module('appirio-tech-submissions').directive 'fileRow', directive
