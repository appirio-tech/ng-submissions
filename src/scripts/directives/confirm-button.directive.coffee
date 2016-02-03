'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/confirm-button.directive.html'
  controller : 'ConfirmButtonController as vm'
  scope      :
    projectId : '@'
    stepId    : '@'
    userType  : '@'

angular.module('appirio-tech-submissions').directive 'confirmButton', directive
