'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/thumbnail-notification.directive.html'
  scope      :
    unreadMessages: '='
    totalMessages: '='

angular.module('appirio-tech-submissions').directive 'thumbnailNotification', directive