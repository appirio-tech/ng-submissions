'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/submissions-header.directive.html'
  controller  : 'SubmissionsHeaderController as vm'
  scope       :
    projectId : '@'
    stepId    : '@'

angular.module('appirio-tech-submissions').directive 'submissionsHeader', directive
