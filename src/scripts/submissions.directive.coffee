'use strict'

directive = ->
  restrict    : 'E'
  controller  : 'SubmissionsController as vm'
  templateUrl : 'views/submissions.directive.html'
  scope       :
    workId    : '@workId'

angular.module('appirio-tech-submissions').directive 'submissions', directive
