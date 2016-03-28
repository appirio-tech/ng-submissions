'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/file-grid.directive.html'
  controller: 'FileGridController as vm'
  scope      :
    files: '='

angular.module('appirio-tech-submissions').directive 'fileGrid', directive
