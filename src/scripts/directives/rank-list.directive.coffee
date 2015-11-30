'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/rank-list.directive.html'
  controller : 'RankListController as vm'
  scope      :
    projectId : '@'
    stepId    : '@'
    userType  : '@'

angular.module('appirio-tech-submissions').directive 'rankList', directive
