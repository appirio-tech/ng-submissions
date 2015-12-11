'use strict'

directive = ->
  restrict       : 'E'
  controller     : 'FileDetailSlideController as vm'
  templateUrl    : 'views/file-detail-slide.directive.html'
  scope          :
    files:           '='
    startingFile:    '='
    messages:        '='
    sumbitterAvatar: '@'
    submitterHandle: '@'
    userType:        '@'
    status:          '@'
    canComment:      '@'

angular.module('appirio-tech-submissions').directive 'fileDetailSlide', directive