'use strict'

FinalFixesController = (helpers, $scope, $rootScope, $state, StepsService, SubmissionsService) ->
  vm = this
  config = {}

  config.stepType = 'finalFixes'
  config.stepName = 'Final Fixes'

  config.prevStepType = 'completeDesigns'
  config.prevStepName = 'Complete Designs'

  config.nextStepType = 'code'
  config.nextStepName = 'Code'

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

  onChange = ->
    steps = StepsService.get(vm.projectId)
    submissions = SubmissionsService.get(vm.projectId, vm.stepId)

    if steps._pending || submissions._pending
      vm.loaded = false
      return null

    vm.loaded = true

    currentStep = helpers.findInCollection steps, 'stepType', config.stepType
    prevStep = helpers.findInCollection steps, 'stepType', config.prevStepType
    nextStep = helpers.findInCollection steps, 'stepType', config.nextStepType

    vm.startsAt = currentStep.startsAt
    vm.endsAt = currentStep.endsAt

    vm.prevStepRef = getStepRef vm.projectId, prevStep
    vm.nextStepRef = getStepRef vm.projectId, nextStep

    if submissions.length > 0
      vm.submission = helpers.submissionWithMessageCounts submissions[0]
      vm.submission = helpers.submissionWithFileTypes vm.submission
      vm.submission = helpers.submissionFilteredByType vm.submission

    vm.status = helpers.statusOf currentStep
    vm.statusValue = helpers.statusValueOf vm.status

  activate()

  vm

FinalFixesController.$inject = ['SubmissionsHelpers', '$scope', '$rootScope', '$state', 'StepsService', 'SubmissionsService']

angular.module('appirio-tech-submissions').controller 'FinalFixesController', FinalFixesController
