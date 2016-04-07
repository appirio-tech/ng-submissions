'use strict'

directive = ->
  restrict       : 'E'
  controller     : 'FileDetailController as vm'
  template       : require('../../views/file-detail.directive.jade')()
  scope          :
    projectId    : '@'
    stepId       : '@'
    submissionId : '@'
    fileId       : '@'
    userType     : '@'

angular.module('appirio-tech-submissions').directive 'fileDetail', directive
