'use strict'

SubmissionsController = ($scope, $state, dragulaService, SubmissionsService) ->
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

  ##############
  # vm Methods #
  ##############

  vm.handleRankSelect = (submission) ->
    SubmissionsService.updateRank vm.stepId, submission.id, submission.rank
    onChange()
    SubmissionsService.updateRankRemote().then ->
      onChange()

  vm.confirmRanks = ->
    SubmissionsService.confirmRanks vm.stepId
    onChange()
    SubmissionsService.confirmRanksRemote().then ->
      onChange()

  ##############
  # Activation #
  ##############

  activate = ->
    SubmissionsService.getSteps(vm.projectId).then ->
      onChange()

    SubmissionsService.getSubmissions(vm.projectId, vm.stepId).then ->
      onChange()

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

    SubmissionsService.updateRank vm.stepId, movedSubmissionId, rankToAssign
    onChange()
    SubmissionsService.updateRankRemote().then ->
      onChange()

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

    ranks

  onChange = ->
    steps = SubmissionsService.steps
    submissions = SubmissionsService.submissions

    if steps.length <= 0 || submissions.length <= 0
      return null

    vm.loaded = true

    # Handle steps updates
    currentStep = SubmissionsService.findInCollection steps, 'stepType', config.stepType
    prevStep = SubmissionsService.findInCollection steps, 'stepType', config.prevStepType
    nextStep = SubmissionsService.findInCollection steps, 'stepType', config.nextStepType

    vm.startsAt = currentStep.startsAt
    vm.endsAt = currentStep.endsAt

    stepParams =
      projectId: $scope.projectId
      stepId: $scope.stepId

    vm.prevStepRef = $state.href config.prevStepState, stepParams
    vm.nextStepRef = $state.href config.nextStepState, stepParams

    # Handle submissions updates
    vm.submissions = angular.copy submissions
    vm.submissions = SubmissionsService.decorateSubmissionsWithRanks vm.submissions, currentStep.rankedSubmissions
    vm.submissions = SubmissionsService.sortSubmissions vm.submissions
    vm.submissions = SubmissionsService.decorateSubmissionsWithUnreadCounts vm.submissions

    # Handle ranks updates
    vm.rankNames = config.rankNames.slice 0, currentStep.numberOfRanks
    vm.ranks     = makeEmptyRankList(vm.rankNames)
    vm.ranks     = decorateRankListWithSubmissions vm.ranks, vm.submissions

    vm.allFilled = currentStep.rankedSubmissions.length == currentStep.numberOfRanks

    # Handle status updates
    vm.status = config.defaultStatus

    if Date.now() > new Date(currentStep.startsAt)
      vm.status = 'open'

    if currentStep.customerConfirmedRanks
      vm.status = 'closed'

  activate()

  vm

SubmissionsController.$inject = ['$scope', '$state', 'dragulaService', 'SubmissionsService']

angular.module('appirio-tech-submissions').controller 'SubmissionsController', SubmissionsController
