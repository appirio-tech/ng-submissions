'use strict'

SubmissionDetailController = (helpers, $scope, $rootScope, DataService, StepSubmissionsService) ->
  vm              = this
  vm.loaded       = false
  vm.submission   = {}
  vm.projectId    = $scope.projectId
  vm.stepId       = $scope.stepId
  vm.submissionId = $scope.submissionId
  vm.userType     = $scope.userType

  activate = ->
    DataService.subscribe $scope, render, [StepSubmissionsService, 'get', vm.projectId, vm.stepId]

  render = (step) ->
    vm.loaded = true
    vm.submission = helpers.findInCollection step.submissions, 'id', vm.submissionId
    vm.stepType = step.stepType

  activate()

  vm

SubmissionDetailController.$inject = ['SubmissionsHelpers', '$scope', '$rootScope', 'DataService', 'StepSubmissionsService']

angular.module('appirio-tech-submissions').controller 'SubmissionDetailController', SubmissionDetailController
