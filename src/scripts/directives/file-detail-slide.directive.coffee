'use strict'

directive = ->
  link = (scope, element, attrs) ->
    showLast = (newValue, oldValue) ->
      if newValue
        scope.showLast = false # to allow trigger change
        uls            = element.find 'ul'
        messageList    = uls[4]
        $messageList   = angular.element messageList
        bottom         = messageList.scrollHeight

        if newValue == 'scroll'
          $messageList.scrollTopAnimated bottom
        else
          $messageList.scrollTop bottom

    showLast true

    scope.$watch 'showLast', showLast

  restrict       : 'E'
  controller     : 'FileDetailSlideController as vm'
  templateUrl    : 'views/file-detail-slide.directive.html'
  link           : link
  scope          :
    files:           '='
    startingFile:    '='
    messages:        '='
    showMessages:    '='
    newMessage:      '='
    showLast:        '='
    title:           '@'
    sumbitterAvatar: '@'
    submitterHandle: '@'
    userType:        '@'
    status:          '@'
    canComment:      '@'
    onFileChange:    '&'
    toggleComments:  '&'
    sendMessage:     '&'

angular.module('appirio-tech-submissions').directive 'fileDetailSlide', directive