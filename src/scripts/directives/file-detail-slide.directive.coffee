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
    sumbitterAvatar: '@'
    submitterHandle: '@'
    userType:        '@'
    status:          '@'
    canComment:      '@'
    onFileChange:    '&'
    toggleComments:  '&'
    sendMessage:     '&'
    newMessage:      '='

angular.module('appirio-tech-submissions').directive 'fileDetailSlide', directive