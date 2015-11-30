'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/submission-winner-card.directive.html'
  scope      :
    nameText      : '@'
    avatarUrl     : '@'
    rank          : '@'
    belongsToUser : '@'

angular.module('appirio-tech-submissions').directive 'submissionWinnerCard', directive
