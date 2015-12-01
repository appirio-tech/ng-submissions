'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/file-grid.directive.html'
  scope      :
    files: '='

angular.module('appirio-tech-submissions').directive 'fileGrid', directive
