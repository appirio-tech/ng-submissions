'use strict'

SubmissionsHeaderController = (helpers, $scope, $state, DataService, StepsService) ->
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
    currentStep      = helpers.findInCollection steps, 'id', stepId
    currentStepOrder = stepOrder.indexOf(currentStep.stepType)

    if currentStepOrder > 0
      prevStep = helpers.findInCollection steps, 'stepType', stepOrder[currentStepOrder - 1]
      vm.prev = getStepRef prevStep

    if currentStepOrder < stepOrder.length - 1
      nextStep = helpers.findInCollection steps, 'stepType', stepOrder[currentStepOrder + 1]
      vm.next = getStepRef nextStep

    vm.title = stepNames[currentStep.stepType]

  getStepRef = (step) ->
    unless step
      return null

    if vm.userType == 'member' && helpers.statusValueOf(step.status) < 4
      return null

    if vm.userType != 'member' && step.status == 'PLACEHOLDER'
      return null

    $state.href 'step',
      projectId: projectId
      stepId: step.id

  activate()

  vm

SubmissionsHeaderController.$inject = ['SubmissionsHelpers', '$scope', '$state', 'DataService', 'StepsService']

angular.module('appirio-tech-submissions').controller 'SubmissionsHeaderController', SubmissionsHeaderController