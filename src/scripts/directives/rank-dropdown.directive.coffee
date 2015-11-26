'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/rank-dropdown.directive.html'
  controller : 'RankDropdownController as vm'
  scope      :
    projectId    : '@'
    stepId       : '@'
    submissionId : '@'

angular.module('appirio-tech-submissions').directive 'rankDropdown', directive
