'use strict'

directive = ->
  restrict       : 'E'
  controller     : 'FileDetailController as vm'
  templateUrl    : 'views/file-detail.directive.html'
  scope          :
    projectId    : '@'
    stepId       : '@'
    submissionId : '@'
    fileId       : '@'
    userType     : '@'

angular.module('appirio-tech-submissions').directive 'fileDetail', directive
