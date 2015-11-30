'use strict'

SubmissionListController = ($scope, DataService, StepSubmissionsService) ->
  vm             = this
  vm.status      = 'PLACEHOLDER'
  vm.statusValue = 0
  vm.submissions = []
  vm.projectId   = $scope.projectId
  vm.stepId      = $scope.stepId
  vm.userType    = $scope.userType

  activate = ->
    DataService.subscribe $scope, render, [StepSubmissionsService, 'get', vm.projectId, vm.stepId]

  render = (step) ->
    vm.submissions = step.submissions
    vm.status      = step.status
    vm.statusValue = step.statusValue
    vm.fileCount   = step.fileCount

  activate()

  vm

SubmissionListController.$inject = ['$scope', 'DataService', 'StepSubmissionsService']

angular.module('appirio-tech-submissions').controller 'SubmissionListController', SubmissionListController
