'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/submission-countdown.directive.html'
  scope      :
    end : '@'
    text: '@'

angular.module('appirio-tech-submissions').directive 'submissionCountdown', directive
