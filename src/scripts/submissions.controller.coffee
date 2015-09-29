'use strict'

SubmissionsController = (helpers, $scope, $rootScope, $state, dragulaService, StepsService, SubmissionsService) ->
  vm             = this
  config         = {}

  if $scope.stepType == 'designConcepts'
    config.stepType = 'designConcepts'
    config.stepName = 'Design Concepts'

    config.prevStepType = null
    config.prevStepName = null
    config.prevStepState = null

    config.nextStepType = 'completeDesigns'
    config.nextStepName = 'Complete Designs'
    config.nextStepState = 'complete-designs'

    config.timeline = [ 'active', '', '' ]
    config.defaultStatus = 'scheduled'

  if $scope.stepType == 'completeDesigns'
    config.stepType = 'completeDesigns'
    config.stepName = 'Complete Designs'

    config.prevStepType = 'designConcepts'
    config.prevStepName = 'Design Concepts'
    config.prevStepState = 'design-concepts'

    config.nextStepType = 'finalFixes'
    config.nextStepName = 'Final Fixes'
    config.nextStepState = 'final-fixes'

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
  vm.status      = config.defaultStatus
  vm.allFilled   = false
  vm.submissions = []
  vm.ranks       = []
  vm.projectId   = $scope.projectId
  vm.stepId      = $scope.stepId
  vm.rankUpdatePending = false
  vm.rankUpdateError = ''

  ##############
  # vm Methods #
  ##############

  vm.handleRankSelect = (submission) ->
    StepsService.updateRank vm.projectId, vm.stepId, submission.id, submission.rank

  vm.confirmRanks = ->
    StepsService.confirmRanks vm.projectId, vm.stepId

  ##############
  # Activation #
  ##############

  activate = ->
    destroyStepsListener = $rootScope.$on 'stepsService.steps:changed', ->
      onChange()

    destroySubmissionsListener = $rootScope.$on 'submissionsService.submissions:changed', ->
      onChange()

    $scope.$on '$destroy', ->
      destroyStepsListener()
      destroySubmissionsListener()

    StepsService.fetch vm.projectId
    SubmissionsService.fetch vm.projectId, vm.stepId

  ###################
  # Dragula helpers #
  ###################

  isDraggable = (el, source, handle) ->
    source.classList.contains 'has-avatar'

  dragulaOptions =
    moves: isDraggable
    copy: true

  dragulaService.options $scope, 'ranked-submissions', dragulaOptions

  handleRankDrop = (el, target, source) ->
    if !source
      return false

    movedSubmissionId = target[0].dataset.id
    rankToAssign = (parseInt(source[0].dataset.rank) + 1) + ''

    StepsService.updateRank vm.projectId, vm.stepId, movedSubmissionId, rankToAssign

  $scope.$on 'ranked-submissions.drop', handleRankDrop

  ####################
  # Helper functions #
  ####################

  makeEmptyRankList = (rankNames) ->
    ranks = []

    for i in [1..rankNames.length] by 1
      ranks.push
        value    : i
        label    : rankNames[i - 1]
        id       : null
        avatarUrl: null

    ranks

  decorateRankListWithSubmissions = (ranks = [], submissions = []) ->
    submissions.forEach (submission) ->
      if submission.rank != ''
        submissionRank = submission.rank - 1
        if submissionRank < ranks.length
          ranks[submissionRank].avatarUrl = submission.submitter.avatar
          ranks[submissionRank].id = submission.id
          ranks[submissionRank].handle = submission.submitter.handle

    ranks

  onChange = ->
    steps = StepsService.steps
    submissions = SubmissionsService.submissions

    if steps.length <= 0 || submissions.length <= 0
      return null

    vm.loaded = true

    currentStep = helpers.findInCollection steps, 'stepType', config.stepType
    prevStep = helpers.findInCollection steps, 'stepType', config.prevStepType
    nextStep = helpers.findInCollection steps, 'stepType', config.nextStepType

    vm.startsAt = currentStep.startsAt
    vm.endsAt = currentStep.endsAt

    stepParams =
      projectId: $scope.projectId
      stepId: $scope.stepId

    vm.prevStepRef = $state.href config.prevStepState, stepParams
    vm.nextStepRef = $state.href config.nextStepState, stepParams

    vm.submissions = angular.copy submissions
    vm.submissions = helpers.decorateSubmissionsWithRanks vm.submissions, currentStep.rankedSubmissions
    vm.submissions = helpers.sortSubmissions vm.submissions
    vm.submissions = helpers.decorateSubmissionsWithMessageCounts vm.submissions

    vm.rankNames = config.rankNames.slice 0, currentStep.numberOfRanks
    vm.ranks     = makeEmptyRankList(vm.rankNames)
    vm.ranks     = decorateRankListWithSubmissions vm.ranks, vm.submissions

    vm.rankUpdatePending = currentStep.o?.pending?.rankedSubmissions

    if currentStep.o?.errors?.rankedSubmissions
      vm.rankUpdateError = currentStep.o?.errors?.rankedSubmissions

    vm.allFilled = currentStep.rankedSubmissions.length == currentStep.numberOfRanks

    vm.status = config.defaultStatus

    if Date.now() > new Date(currentStep.startsAt)
      vm.status = 'open'

    if currentStep.customerConfirmedRanks
      vm.status = 'closed'

  activate()

  vm

SubmissionsController.$inject = ['SubmissionsHelpers', '$scope', '$rootScope', '$state', 'dragulaService', 'StepsService', 'SubmissionsService']

angular.module('appirio-tech-submissions').controller 'SubmissionsController', SubmissionsController
