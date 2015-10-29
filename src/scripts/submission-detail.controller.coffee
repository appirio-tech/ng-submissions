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

  vm.handleRankSelect = (submission) ->
    StepsService.updateRank vm.projectId, vm.stepId, submission.id, submission.rank

  activate = ->
    destroyStepsListener = $rootScope.$on 'StepsService:changed', ->
      onChange()

    destroySubmissionsListener = $rootScope.$on 'SubmissionsService:changed', ->
      onChange()

    $scope.$on '$destroy', ->
      destroyStepsListener()
      destroySubmissionsListener()

    onChange()

  onChange = ->
    steps = StepsService.get(vm.projectId)
    submissions = SubmissionsService.get(vm.projectId, vm.stepId)

    if steps._pending || submissions._pending
      vm.loaded = false
      return null

    vm.loaded = true
    currentStep = helpers.findInCollection steps, 'id', vm.stepId

    vm.submission = helpers.findInCollection submissions, 'id', vm.submissionId
    vm.submission = helpers.decorateSubmissionWithRank vm.submission, currentStep.details.rankedSubmissions
    vm.submission = helpers.decorateSubmissionWithMessageCounts vm.submission

    vm.rankNames = config.rankNames.slice 0, currentStep.details.numberOfRanks
    vm.ranks     = helpers.makeEmptyRankList(vm.rankNames)
    vm.ranks     = helpers.decorateRankListWithSubmissions vm.ranks, vm.submissions

    vm.allFilled = currentStep.details.rankedSubmissions.length == currentStep.details.numberOfRanks
    vm.allFilled = currentStep.details.rankedSubmissions.length == currentStep.details.numberOfRanks

  activate()

  vm

SubmissionDetailController.$inject = ['SubmissionsHelpers', '$scope', '$rootScope', 'StepsService', 'SubmissionsService']

angular.module('appirio-tech-submissions').controller 'SubmissionDetailController', SubmissionDetailController
