'use strict'

SubmissionsController = (helpers, $scope, $rootScope, $state, StepsService, SubmissionsService, UserV3Service) ->
  vm             = this
  vm.loaded      = false
  vm.status      = 'PLACEHOLDER'
  vm.statusValue = 0
  vm.projectId   = $scope.projectId
  vm.stepId      = $scope.stepId
  vm.userType    = $scope.userType

  activate = ->
    StepsService.subscribe $scope, onChange
    SubmissionsService.subscribe $scope, onChange

  onChange = ->
    steps = StepsService.get(vm.projectId)
    submissions = SubmissionsService.get(vm.projectId, vm.stepId)

    if steps._pending || submissions._pending
      vm.loaded = false
      return null

    vm.loaded = true

    currentStep = helpers.findInCollection steps, 'id', vm.stepId
    vm.startsAt = currentStep.startsAt
    vm.endsAt = currentStep.endsAt

    vm.status = helpers.statusOf currentStep
    vm.statusValue = helpers.statusValueOf vm.status

  activate()

  vm

SubmissionsController.$inject = ['SubmissionsHelpers', '$scope', '$rootScope', '$state', 'StepsService', 'SubmissionsService', 'UserV3Service']

angular.module('appirio-tech-submissions').controller 'SubmissionsController', SubmissionsController
