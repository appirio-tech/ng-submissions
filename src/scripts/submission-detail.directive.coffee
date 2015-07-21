'use strict'

directive = ->
  restrict    : 'E'
  controller  : 'SubmissionDetailController as vm'
  templateUrl : 'views/submission-detail.directive.html'
  scope       :
    workId    : '@workId'
    submissionId: '@submissionId'

angular.module('appirio-tech-submissions').directive 'submissionDetail', directive
