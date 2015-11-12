'use strict'

SubmissionDetailController = (helpers, $scope, $rootScope, StepsService, SubmissionsService) ->
  vm     = this
  config = {}

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

  vm.loaded       = false
  vm.rankNames    = []
  vm.submission   = {}
  vm.allFilled    = false
  vm.projectId    = $scope.projectId
  vm.stepId       = $scope.stepId
  vm.submissionId = $scope.submissionId
  vm.userType     = $scope.userType

  activate = ->
    StepsService.subscribe $scope, onChange
    SubmissionsService.subscribe $scope, onChange

  vm.handleRankSelect = (submission) ->
    StepsService.updateRank vm.projectId, vm.stepId, submission.id, submission.rank

  onChange = ->
    steps = StepsService.get(vm.projectId)
    submissions = SubmissionsService.get(vm.projectId, vm.stepId)

    if steps._pending || submissions._pending
      vm.loaded = false
      return null

    vm.loaded = true
    currentStep = helpers.findInCollection steps, 'id', vm.stepId

    vm.submission = helpers.findInCollection submissions, 'id', vm.submissionId
    vm.submission = helpers.submissionWithRank vm.submission, currentStep.details.rankedSubmissions
    vm.submission = helpers.submissionWithMessageCounts vm.submission
    vm.submission = helpers.submissionWithFileTypes vm.submission
    vm.submission = helpers.submissionFilteredByType vm.submission

    numberOfRanks = Math.min currentStep.details.numberOfRanks, currentStep.details.submissionIds.length

    vm.rankNames = config.rankNames.slice 0, numberOfRanks
    vm.ranks     = helpers.makeEmptyRankList(vm.rankNames)
    vm.ranks     = helpers.populatedRankList vm.ranks, vm.submissions

    vm.rank = if vm.submission.rank then config.rankNames[vm.submission.rank - 1] else null

    vm.allFilled = currentStep.details.rankedSubmissions.length == numberOfRanks

    vm.status = helpers.statusOf currentStep

  activate()

  vm

SubmissionDetailController.$inject = ['SubmissionsHelpers', '$scope', '$rootScope', 'StepsService', 'SubmissionsService']

angular.module('appirio-tech-submissions').controller 'SubmissionDetailController', SubmissionDetailController
