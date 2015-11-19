'use strict'

directive = ->
  restrict   : 'E'
  controller : 'SubmissionWinnersController as vm'
  templateUrl: 'views/submission-winners.directive.html'
  scope      :
    nameText : '@'
    avatarUrl: '@'
    rank     : '@'

angular.module('appirio-tech-submissions').directive 'submissionWinners', directive
