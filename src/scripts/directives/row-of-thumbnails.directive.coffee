'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/row-of-thumbnails.directive.html'
  # controller : 'RowOfThumbnails as vm'
  scope      :
    thumbnails : '='
    viewAll    : '@'
    viewAllText: '@'

angular.module('appirio-tech-submissions').directive 'rowOfThumbnails', directive
