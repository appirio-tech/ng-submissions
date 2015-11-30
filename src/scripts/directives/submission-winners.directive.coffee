'use strict'

directive = ->
  restrict   : 'E'
  controller : 'SubmissionWinnersController as vm'
  templateUrl: 'views/submission-winners.directive.html'
  scope      :
    projectId : '@'
    stepId    : '@'

angular.module('appirio-tech-submissions').directive 'submissionWinners', directive
