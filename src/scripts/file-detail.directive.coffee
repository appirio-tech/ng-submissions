'use strict'

directive = ->
  restrict       : 'E'
  controller     : 'FileDetailController as vm'
  templateUrl    : 'views/file-detail.directive.html'
  scope          :
    projectId    : '@projectId'
    stepId       : '@stepId'
    fileId       : '@fileId'
    submissionId : '@submissionId'

angular.module('appirio-tech-submissions').directive 'fileDetail', directive
