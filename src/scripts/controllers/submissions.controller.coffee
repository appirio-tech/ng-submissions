'use strict'

SubmissionsController = ($scope, DataService, StepSubmissionsService) ->
  vm             = this
  vm.loaded      = false
  vm.status      = 'PLACEHOLDER'
  vm.statusValue = 0
  vm.projectId   = $scope.projectId
  vm.stepId      = $scope.stepId
  vm.userType    = $scope.userType

  activate = ->
    DataService.subscribe $scope, render, [StepSubmissionsService, 'get', vm.projectId, vm.stepId]

  render = (step) ->
    vm.loaded      = true
    vm.startsAt    = step.startsAt
    vm.endsAt      = step.endsAt
    vm.status      = step.status
    vm.statusValue = step.statusValue

  activate()

  vm

SubmissionsController.$inject = ['$scope', 'DataService', 'StepSubmissionsService']

angular.module('appirio-tech-submissions').controller 'SubmissionsController', SubmissionsController
