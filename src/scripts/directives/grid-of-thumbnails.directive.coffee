'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/grid-of-thumbnails.directive.html'
  scope      :
    thumbnails: '='

angular.module('appirio-tech-submissions').directive 'gridOfThumbnails', directive
