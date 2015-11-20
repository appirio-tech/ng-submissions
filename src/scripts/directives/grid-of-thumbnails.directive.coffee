'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/grid-of-thumbnails.directive.html'
  scope      :
    thumbnailGroups: '='

angular.module('appirio-tech-submissions').directive 'gridOfThumbnails', directive
