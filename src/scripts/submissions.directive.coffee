'use strict'

directive = ->
  restrict    : 'E'
  controller  : 'SubmissionsController as vm'
  templateUrl : 'views/submissions.directive.html'
  controller  : 'SubmissionsController'
  controllerAs: 'vm'
  scope       :
    workId: '@workId'

angular.module('appirio-tech-submissions').directive 'submissions', directive
