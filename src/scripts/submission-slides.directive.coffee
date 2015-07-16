'use strict'

directive = ->
  restrict    : 'E'
  controller  : 'SubmissionSlidesController as vm'
  templateUrl : 'views/submission-slides.directive.html'
  scope       :
    workId    : '@workId'

angular.module('appirio-tech-submissions').directive 'submissionSlides', directive
