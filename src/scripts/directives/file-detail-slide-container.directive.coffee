'use strict'

directive = ->
  restrict       : 'E'
  controller     : 'FileDetailSlideContainerController as vm'
  templateUrl    : 'views/file-detail-slide-container.directive.html'
  scope          :
    projectId    : '@'
    stepId       : '@'
    submissionId : '@'
    fileId       : '@'
    userType     : '@'

angular.module('appirio-tech-submissions').directive 'fileDetailSlideContainer', directive