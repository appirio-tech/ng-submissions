'use strict'

directive = ->
  restrict       : 'E'
  controller     : 'FileDetailSlideController as vm'
  templateUrl    : 'views/file-detail-slide.directive.html'
  scope          :
    files:           '='
    startingFile:    '='
    messages:        '='
    showMessages:    '='
    newMessage:      '='
    sumbitterAvatar: '@'
    submitterHandle: '@'
    userType:        '@'
    status:          '@'
    canComment:      '@'
    onFileChange:    '&'
    toggleComments:  '&'
    sendMessage:     '&'

angular.module('appirio-tech-submissions').directive 'fileDetailSlide', directive