'use strict'

SubmissionsController = ($scope, SubmissionAPIService, SubmissionDetailAPIService) ->
  vm             = this
  vm.loaded      = false
  vm.submissions = []
  vm.ranks       = []
  vm.timeline    = []
  vm.open        = false
  vm.showConfirm = false

  vm.rankNames = [
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

  vm.reorder = (changedSubmission) ->
    submissionsOfThisRank = getSubmissionsByRank changedSubmission.rank

    submissionsOfThisRank = submissionsOfThisRank.filter (submission) ->
      submission != changedSubmission

    submissionsOfThisRank.forEach (submission) ->
      submission.rank = (parseInt(submission.rank) + 1) + ''
      vm.reorder submission

    updateSubmissionRank changedSubmission
    populateRankList()
    evaluateRanks()

  activate = ->
    applyPhaseData()
    getSubmissionsData()

  getSubmissionsByRank = (rank) ->
    submissions = []

    vm.submissions.forEach (submission) ->
      if `submission.rank == rank`
        submissions.push submission

    submissions

  applyPhaseData = () ->
    if $scope.phase == 'design-concepts'
      vm.timeline = [ 'active', '', '' ]
      vm.phase =
        previous:
          name: null
          sref: null
        current:
          name: 'Design Concepts'
        next:
          name: 'Complete Designs'
          sref: 'complete-designs'


    if $scope.phase == 'complete-designs'
      vm.timeline = [ '', 'active', '' ]
      vm.phase =
        previous:
          name: 'Design Concepts'
          sref: 'design-concepts'
        current:
          name: 'Complete Designs'
        next:
          name: 'Final Fixes'
          sref: 'final-fixes'

  trimRankNames = (limit) ->
    vm.rankNames = vm.rankNames.slice 0, limit

  populateRankList = () ->
    ranks = []

    for i in [0...vm.numberOfRanks] by 1
      ranks.push
        value: i
        label: vm.rankNames[i]
        avatarUrl: null

    vm.submissions.forEach (submission) ->
      if submission.rank < vm.numberOfRanks
        ranks[submission.rank].avatarUrl = submission.submitter.avatarUrl

    vm.ranks = ranks

  # check if all available ranks are filled and toggle showConfirm
  evaluateRanks = () ->
    filledRanks = {}
    for i in [0...vm.numberOfRanks] by 1
      filledRanks[i] = false

    vm.submissions.forEach (submission) ->
      if submission.rank < vm.numberOfRanks
        filledRanks[submission.rank] = true

    allFilled = true

    for rank, filled of filledRanks
      if !filled
        allFilled = false

    vm.showConfirm = allFilled

  applySubmissionsData = (data) ->
    vm.numberOfRanks           = data.numberOfRanks
    vm.submissions             = data.submissions
    vm.phase.current.startDate = data.phase.startDate
    vm.phase.current.endDate   = data.phase.endDate

    if Date.now() > new Date(vm.phase.current.startDate)
      vm.open = true

    trimRankNames data.numberOfRanks
    populateRankList()

  getSubmissionsData = () ->
    params =
      workId: $scope.workId
      phase : $scope.phase

    resource = SubmissionAPIService.get params

    resource.$promise.then (res) ->
      applySubmissionsData res

    resource.$promise.catch (res) ->
      # TODO: do something intelligent

    resource.$promise.finally ->
      vm.loaded = true

  updateSubmissionRank = (submission) ->
    params =
      workId       : $scope.workId
      submissionId : submission.id

    resource = SubmissionDetailAPIService.updateRank params, submission

  activate()

  vm

SubmissionsController.$inject = ['$scope', 'SubmissionAPIService', 'SubmissionDetailAPIService']

angular.module('appirio-tech-submissions').controller 'SubmissionsController', SubmissionsController
