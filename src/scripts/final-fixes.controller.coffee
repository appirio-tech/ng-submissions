'use strict'

FinalFixesController = (helpers, $scope, $rootScope, $state, StepsService, SubmissionsService) ->
  vm = this
  config = {}

  config.stepType = 'finalFixes'
  config.stepName = 'Final Fixes'

  config.prevStepType = 'completeDesigns'
  config.prevStepName = 'Complete Designs'
  config.prevStepState = 'complete-designs'

  config.nextStepType = null
  config.nextStepName = null
  config.nextStepState = null

  config.timeline = [ '', '', 'active' ]
  config.defaultStatus = 'scheduled'

  config.rankNames = [
    '1st Place'
    '2nd Place'
    '3rd Place'
    '4th Place'
    '5th Place'
    '6th Place'
    '7th Place'
    '8th Place'
    '9th Place'
    '10th Place'
  ]

  vm.loaded      = false
  vm.timeline    = config.timeline
  vm.stepName    = config.stepName
  vm.status      = config.defaultStatus
  vm.allFilled   = false
  vm.submission  = {}
  vm.projectId   = $scope.projectId
  vm.stepId      = $scope.stepId
  vm.userType    = $scope.userType

  activate = ->
    StepsService.subscribe $scope, onChange
    SubmissionsService.subscribe $scope, onChange

  vm.confirmApproval = ->
    StepsService.acceptFixes vm.projectId, vm.stepId

  getStepRef = (projectId, step) ->
    if step
      $state.href 'step',
        projectId: projectId
        stepId: step.id
    else
      null

  onChange = ->
    steps = StepsService.get(vm.projectId)
    submissions = SubmissionsService.get(vm.projectId, vm.stepId)

    if steps._pending || submissions._pending
      vm.loaded = false
      return null

    vm.loaded = true

    currentStep = helpers.findInCollection steps, 'stepType', config.stepType
    prevStep = helpers.findInCollection steps, 'stepType', config.prevStepType

    vm.startsAt = currentStep.startsAt
    vm.endsAt = currentStep.endsAt

    vm.prevStepRef = getStepRef vm.projectId, prevStep

    vm.submission = helpers.submissionWithMessageCounts submissions[0]

    vm.status = config.defaultStatus

    if Date.now() > new Date(currentStep.startsAt)
      vm.status = 'open'

    if currentStep.customerAcceptedFixes
      vm.status = 'closed'

  activate()

  vm

FinalFixesController.$inject = ['SubmissionsHelpers', '$scope', '$rootScope', '$state', 'StepsService', 'SubmissionsService']

angular.module('appirio-tech-submissions').controller 'FinalFixesController', FinalFixesController
