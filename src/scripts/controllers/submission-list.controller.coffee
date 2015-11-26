'use strict'

SubmissionListController = (helpers, $scope, $state, StepsService, UserV3Service, DataService) ->
  vm             = this
  config         = {}

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

  vm.status      = 'PLACEHOLDER'
  vm.statusValue = 0
  vm.submissions = []
  vm.projectId   = $scope.projectId
  vm.stepId      = $scope.stepId
  vm.userType    = $scope.userType

  userId = UserV3Service.getCurrentUser()?.id

  activate = ->
    DataService.subscribe $scope, render, [
      ['Steps', 'getStepById', vm.projectId, vm.stepId]
      ['Submissions', 'get', vm.projectId, vm.stepId]
    ]

  vm.handleRankSelect = (submission) ->
    if submission.id && submission.rank
      StepsService.updateRank vm.projectId, vm.stepId, submission.id, submission.rank

  render = (currentStep, submissions) ->
    vm.submissions = helpers.submissionsWithRanks submissions, currentStep.details.rankedSubmissions
    vm.submissions = helpers.sortSubmissions vm.submissions
    vm.submissions = helpers.submissionsWithMessageCounts vm.submissions
    vm.submissions = helpers.submissionsWithOwnership vm.submissions, userId
    vm.submissions = helpers.submissionsWithFileTypes vm.submissions
    vm.submissions = helpers.submissionsFilteredByType vm.submissions

    numberOfRanks = Math.min currentStep.details.numberOfRanks, submissions.length

    vm.rankNames = config.rankNames.slice 0, numberOfRanks
    vm.ranks     = helpers.makeEmptyRankList(vm.rankNames)
    vm.ranks     = helpers.populatedRankList vm.ranks, vm.submissions
    vm.userRank  = helpers.highestRank vm.ranks, userId

    vm.status = helpers.statusOf currentStep
    vm.statusValue = helpers.statusValueOf vm.status

  activate()

  vm

SubmissionListController.$inject = ['SubmissionsHelpers', '$scope', '$state', 'StepsService', 'UserV3Service', 'DataService']

angular.module('appirio-tech-submissions').controller 'SubmissionListController', SubmissionListController
