'use strict'

directive = ->
  restrict    : 'E'
  controller  : 'SubmissionsController as vm'
  templateUrl : 'views/submissions.directive.html'
  scope       :
    projectId : '@projectId'
    stepId    : '@stepId'
    stepType  : '@stepType'

angular.module('appirio-tech-submissions').directive 'submissions', directive
