'use strict'

SubmissionDetailController = ($scope, SubmissionsService) ->
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
  vm.submission   = {}
  vm.allFilled    = false
  vm.projectId    = $scope.projectId
  vm.stepId       = $scope.stepId
  vm.submissionId = $scope.submissionId

  vm.handleRankSelect = (submission) ->
    SubmissionsService.updateRank vm.stepId, submission.id, submission.rank
    onChange()
    SubmissionsService.updateRankRemote().then ->
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
    currentStep = SubmissionsService.findInCollection steps, 'id', vm.stepId

    currentSubmission = SubmissionsService.findInCollection submissions, 'id', vm.submissionId
    vm.submission = angular.copy currentSubmission
    vm.submission = SubmissionsService.decorateSubmissionWithRank vm.submission, currentStep.rankedSubmissions
    vm.submission = SubmissionsService.decorateSubmissionWithUnreadCounts vm.submission

    vm.rankNames = config.rankNames.slice 0, currentStep.numberOfRanks
    vm.allFilled = currentStep.rankedSubmissions.length == currentStep.numberOfRanks

  activate()

  vm

SubmissionDetailController.$inject = ['$scope', 'SubmissionsService']

angular.module('appirio-tech-submissions').controller 'SubmissionDetailController', SubmissionDetailController
