'use strict'

SubmissionsController = (helpers, $scope, $rootScope, $state, StepsService, SubmissionsService, UserV3Service) ->
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
    config.defaultStatus = 'PLACEHOLDER'

  if $scope.stepType == 'completeDesigns'
    config.stepType = 'completeDesigns'
    config.stepName = 'Complete Designs'

    config.prevStepType = 'designConcepts'
    config.prevStepName = 'Design Concepts'

    config.nextStepType = 'finalFixes'
    config.nextStepName = 'Final Fixes'

    config.timeline = [ '', 'active', '' ]
    config.defaultStatus = 'PLACEHOLDER'

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
  vm.stepType    = config.stepType
  vm.status      = config.defaultStatus
  vm.statusValue = 0
  vm.allFilled   = false
  vm.submissions = []
  vm.ranks       = []
  vm.projectId   = $scope.projectId
  vm.stepId      = $scope.stepId
  vm.userType    = $scope.userType

  userId = UserV3Service.getCurrentUser()?.id

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

    currentStep = helpers.findInCollection steps, 'id', vm.stepId
    prevStep = helpers.findInCollection steps, 'stepType', config.prevStepType
    nextStep = helpers.findInCollection steps, 'stepType', config.nextStepType

    vm.startsAt = currentStep.startsAt
    vm.endsAt = currentStep.endsAt

    vm.prevStepRef = getStepRef vm.projectId, prevStep
    vm.nextStepRef = getStepRef vm.projectId, nextStep

    vm.submissions = helpers.submissionsWithRanks submissions, currentStep.details.rankedSubmissions
    vm.submissions = helpers.sortSubmissions vm.submissions
    vm.submissions = helpers.submissionsWithMessageCounts vm.submissions
    vm.submissions = helpers.submissionsWithOwnership vm.submissions, userId
    vm.submissions = helpers.submissionsWithFileTypes vm.submissions
    vm.submissions = helpers.submissionsFilteredByType vm.submissions
    vm.submissions = helpers.submissionsWithFileLimit vm.submissions, 6

    numberOfRanks = Math.min currentStep.details.numberOfRanks, vm.submissions.length

    vm.rankNames = config.rankNames.slice 0, numberOfRanks
    vm.ranks     = helpers.makeEmptyRankList(vm.rankNames)
    vm.ranks     = helpers.populatedRankList vm.ranks, vm.submissions
    vm.userRank  = helpers.highestRank vm.ranks, userId

    if currentStep.rankedSubmissions_error
      vm.rankUpdateError = currentStep.rankedSubmissions_error

    vm.allFilled = currentStep.details.rankedSubmissions.length == numberOfRanks

    vm.status = helpers.statusOf currentStep
    vm.statusValue = helpers.statusValueOf vm.status

  activate()

  vm

SubmissionsController.$inject = ['SubmissionsHelpers', '$scope', '$rootScope', '$state', 'StepsService', 'SubmissionsService', 'UserV3Service']

angular.module('appirio-tech-submissions').controller 'SubmissionsController', SubmissionsController
