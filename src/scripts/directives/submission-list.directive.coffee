'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/submission-list.directive.html'
  controller : 'SubmissionListController as vm'
  scope      :
    projectId : '@'
    stepId    : '@'
    userType  : '@'

angular.module('appirio-tech-submissions').directive 'submissionList', directive
