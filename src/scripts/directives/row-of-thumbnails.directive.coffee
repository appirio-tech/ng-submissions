'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/row-of-thumbnails.directive.html'
  # controller : 'RowOfThumbnails as vm'
  scope      :
    thumbnails : '='
    viewAll    : '@'
    viewAllText: '@'
    toolTip    : '@'

angular.module('appirio-tech-submissions').directive 'rowOfThumbnails', directive
