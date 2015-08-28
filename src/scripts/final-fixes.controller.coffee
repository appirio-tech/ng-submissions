'use strict'

FinalFixesController = ($scope, $state, SubmissionsService) ->
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

  config.timeline = [ 'active', '', '' ]
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

  vm.confirmApproval = ->
    SubmissionsService.acceptFixes vm.stepId
    onChange()
    SubmissionsService.acceptFixesRemote().then ->
      onChange()

  activate = ->
    SubmissionsService.getSteps(vm.projectId).then ->
      onChange()

    SubmissionsService.getSubmissions(vm.projectId, vm.stepId).then ->
      onChange()

  onChange = ->
    steps = SubmissionsService.steps
    submissions = SubmissionsService.submissions

    if steps.length <= 0 || submissions.length <= 0
      return null

    vm.loaded = true

    currentStep = SubmissionsService.findStepByType steps, config.stepType
    prevStep = SubmissionsService.findStepByType steps, config.prevStepType

    vm.startsAt = currentStep.startsAt
    vm.endsAt = currentStep.endsAt

    stepParams =
      projectId: $scope.projectId
      stepId: $scope.stepId

    vm.prevStepRef = $state.href config.prevStepState, stepParams

    vm.submissions = angular.copy submissions
    vm.submissions = SubmissionsService.decorateSubmissionsWithUnreadCounts vm.submissions
    vm.submission = vm.submissions[0]

    vm.status = config.defaultStatus

    if Date.now() > new Date(currentStep.startsAt)
      vm.status = 'open'

    if currentStep.customerAcceptedFixes
      vm.status = 'closed'


  activate()

  vm

FinalFixesController.$inject = ['$scope', '$state', 'SubmissionsService']

angular.module('appirio-tech-submissions').controller 'FinalFixesController', FinalFixesController
