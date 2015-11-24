'use strict'

SubmissionsHeaderController = (helpers, $scope, $rootScope, $state, StepsService, SubmissionsService, UserV3Service) ->
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
    StepsService.subscribe $scope, render
    SubmissionsService.subscribe $scope, render

  getStepRef = (step) ->
    unless step
      return null

    stepStatus = helpers.statusOf(step)

    if vm.userType == 'member' && helpers.statusValueOf(stepStatus) < 4
      return null

    if vm.userType != 'member' && stepStatus == 'PLACEHOLDER'
      return null

    $state.href 'step',
      projectId: projectId
      stepId: step.id

  render = ->
    if stepId && projectId
      steps = StepsService.get(projectId)
      submissions = SubmissionsService.get(projectId, stepId)
    else
      return null

    if steps._pending || submissions._pending
      return null

    currentStep      = helpers.findInCollection steps, 'id', stepId
    currentStepOrder = stepOrder.indexOf(currentStep.stepType)

    if currentStepOrder > 0
      prevStep = helpers.findInCollection steps, 'stepType', stepOrder[currentStepOrder - 1]
      vm.prev = getStepRef prevStep

    if currentStepOrder < stepOrder.length - 1
      nextStep = helpers.findInCollection steps, 'stepType', stepOrder[currentStepOrder + 1]
      vm.next = getStepRef nextStep

    vm.title = stepNames[currentStep.stepType]

  activate()

  vm

SubmissionsHeaderController.$inject = ['SubmissionsHelpers', '$scope', '$rootScope', '$state', 'StepsService', 'SubmissionsService', 'UserV3Service']

angular.module('appirio-tech-submissions').controller 'SubmissionsHeaderController', SubmissionsHeaderController