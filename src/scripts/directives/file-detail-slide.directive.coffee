'use strict'

directive = ->
  restrict         : 'E'
  controller       : 'FileDetailSlideController as vm'
  templateUrl      : 'views/file-detail-slide.directive.html'
  scope            : 
    onFileChange:    '&'
  bindToController :
    files:           '='
    startingFile:    '='
    messages:        '='
    showMessages:    '='
    newMessage:      '='
    title:           '@'
    submitterAvatar: '@'
    submissionNumber:'@'
    submitterHandle: '@'
    userType:        '@'
    status:          '@'
    canComment:      '='
    toggleComments:  '&'
    sendMessage:     '&'
    ranksConfirmed:  '='

angular.module('appirio-tech-submissions').directive 'fileDetailSlide', directive