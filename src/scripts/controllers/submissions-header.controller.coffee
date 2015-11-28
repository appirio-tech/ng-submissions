'use strict'

SubmissionsHeaderController = ($scope, $state, DataService, StepsService) ->
  vm        = this
  projectId = $scope.projectId
  stepId    = $scope.stepId

  stepOrder = [
    'designConcepts'
    'completeDesigns'
    'finalFixes'
    'code'
  ]
  
  stepNames =
    designConcepts  : 'Design Concepts'
    completeDesigns : 'Complete Designs'
    finalFixes      : 'Final Fixes'
    code            : 'Development'

  activate = ->
    DataService.subscribe $scope, render, [StepsService, 'get', projectId]

  render = (steps) ->
    currentStep      = steps.filter((step) -> step.id == stepId)[0]
    currentStepOrder = stepOrder.indexOf(currentStep.stepType)

    if currentStepOrder > 0
      prevStep = steps.filter((step) -> step.stepType == stepOrder[currentStepOrder - 1])[0]
      vm.prev = getStepRef prevStep

    if currentStepOrder < stepOrder.length - 1
      nextStep = steps.filter((step) -> step.stepType == stepOrder[currentStepOrder + 1])[0]
      vm.next = getStepRef nextStep

    vm.title = stepNames[currentStep.stepType]

  getStepRef = (step) ->
    unless step
      return null

    if vm.userType == 'member' && step.statusValue < 4
      return null

    if vm.userType != 'member' && step.status == 'PLACEHOLDER'
      return null

    $state.href 'step',
      projectId: projectId
      stepId: step.id

  activate()

  vm

SubmissionsHeaderController.$inject = ['$scope', '$state', 'DataService', 'StepsService']

angular.module('appirio-tech-submissions').controller 'SubmissionsHeaderController', SubmissionsHeaderController