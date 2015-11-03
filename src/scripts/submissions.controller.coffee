'use strict'

SubmissionsController = (helpers, $scope, $rootScope, $state, StepsService, SubmissionsService) ->
  vm             = this
  config         = {}

  if $scope.stepType == 'designConcepts'
    config.stepType = 'designConcepts'
    config.stepName = 'Design Concepts'

    config.prevStepType = null
    config.prevStepName = null

    config.nextStepType = 'completeDesigns'
    config.nextStepName = 'Complete Designs'

    config.timeline = [ 'active', '', '' ]
    config.defaultStatus = 'scheduled'

  if $scope.stepType == 'completeDesigns'
    config.stepType = 'completeDesigns'
    config.stepName = 'Complete Designs'

    config.prevStepType = 'designConcepts'
    config.prevStepName = 'Design Concepts'

    config.nextStepType = 'finalFixes'
    config.nextStepName = 'Final Fixes'

    config.timeline = [ '', 'active', '' ]
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
  vm.status      = null
  vm.allFilled   = false
  vm.submissions = []
  vm.ranks       = []
  vm.projectId   = $scope.projectId
  vm.stepId      = $scope.stepId
  vm.userType    = $scope.userType

  activate = ->
    StepsService.subscribe $scope, onChange
    SubmissionsService.subscribe $scope, onChange

  # IMPORTANT: This must be an object for the onDrop directive to work
  # See: https://github.com/angular/angular.js/wiki/Understanding-Scopes
  vm.drop =
    handle: (event, rankToAssign) ->
      submissionId = event.dataTransfer.getData 'submissionId'

      # The dataTransfer method returns String("undefined") if item is not found
      # Thus the seeminly bizarre check below
      if submissionId != 'undefined' && submissionId && rankToAssign
        StepsService.updateRank vm.projectId, vm.stepId, submissionId, rankToAssign

  vm.handleRankSelect = (submission) ->
    if submission.id && submission.rank
      StepsService.updateRank vm.projectId, vm.stepId, submission.id, submission.rank

  vm.confirmRanks = ->
    StepsService.confirmRanks vm.projectId, vm.stepId

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

    currentStep = helpers.findInCollection steps, 'id', vm.stepId
    prevStep = helpers.findInCollection steps, 'stepType', config.prevStepType
    nextStep = helpers.findInCollection steps, 'stepType', config.nextStepType

    vm.startsAt = currentStep.startsAt
    vm.endsAt = currentStep.endsAt

    vm.prevStepRef = getStepRef vm.projectId, prevStep
    vm.nextStepRef = getStepRef vm.projectId, nextStep

    vm.submissions = helpers.decorateSubmissionsWithRanks submissions, currentStep.details.rankedSubmissions
    vm.submissions = helpers.sortSubmissions vm.submissions
    vm.submissions = helpers.decorateSubmissionsWithMessageCounts vm.submissions

    vm.rankNames = config.rankNames.slice 0, currentStep.details.numberOfRanks
    vm.ranks     = helpers.makeEmptyRankList(vm.rankNames)
    vm.ranks     = helpers.decorateRankListWithSubmissions vm.ranks, vm.submissions

    if currentStep.rankedSubmissions_error
      vm.rankUpdateError = currentStep.rankedSubmissions_error

    vm.allFilled = currentStep.details.rankedSubmissions.length == currentStep.details.numberOfRanks

    vm.status = config.defaultStatus

    if Date.now() > new Date(currentStep.startsAt)
      vm.status = 'open'

    if currentStep.details.customerConfirmedRanks
      vm.status = 'closed'

  activate()

  vm

SubmissionsController.$inject = ['SubmissionsHelpers', '$scope', '$rootScope', '$state', 'StepsService', 'SubmissionsService']

angular.module('appirio-tech-submissions').controller 'SubmissionsController', SubmissionsController
