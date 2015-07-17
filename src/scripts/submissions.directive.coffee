'use strict'

directive = ->
  restrict    : 'E'
  controller  : 'SubmissionsController as vm'
  templateUrl : 'views/submissions.directive.html'
  controller  : 'SubmissionsController'
  controllerAs: 'vm'
  scope       :
    submissionId: '@submissionId'

angular.module('appirio-tech-submissions').directive 'submissions', directive
