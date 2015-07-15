'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/submissions.directive.html'

angular.module('appirio-tech-submissions').directive 'submissions', directive
