'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/rank-dropdown.directive.html'
  controller : 'RankDropdownController as vm'
  scope      :
    projectId    : '@'
    stepId       : '@'
    submissionId : '@'
    userType     : '@'
    permissions  : '='

angular.module('appirio-tech-submissions').directive 'rankDropdown', directive
