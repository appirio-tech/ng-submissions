'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/submission-winner-card.directive.html'
  scope      :
    nameText : '@'
    avatarUrl: '@'
    rank     : '@'

angular.module('appirio-tech-submissions').directive 'submissionWinnerCard', directive
