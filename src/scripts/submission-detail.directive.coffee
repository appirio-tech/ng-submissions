'use strict'

directive = ->
  restrict    : 'E'
  controller  : 'SubmissionDetailController as vm'
  templateUrl : 'views/submission-detail.directive.html'
  scope       :
    workId    : '@workId'

angular.module('appirio-tech-submissions').directive 'submissionDetail', directive
