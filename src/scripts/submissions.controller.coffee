'use strict'

SubmissionsController = ($scope, SubmissionAPIService) ->
  vm             = this
  vm.loaded      = false
  vm.submissions = []
  vm.ranks       = []
  vm.timeline    = []

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
  
  vm.phase =
    numberOfPhases: 3
    currentPhase: 1
    current:
      name: 'Design Concepts'
      status: 'scheduled'
    next:
      name: 'Final Designs'

  activate = ->
    params =
      workId: $scope.workId
      phase : $scope.phase

    getSubmissions params

    vm

  vm.reorder = (changedSubmission) ->
    populateRankList vm.submissions

  populateTimeline = (phaseInfo) ->
    timeline = [ 'active', '', '' ]

    for i in [1..phaseInfo.numberOfPhases] by 1
      if (i == phaseInfo.currentPhase)
        timeline.push 'active'
      else
        timeline.push ''

    vm.timeline = timeline

  trimRankNames = (limit) ->
    vm.rankNames = vm.rankNames.slice 0, limit

  populateRankList = (submissions) ->
    ranks = []

    for i in [0...vm.numberOfRanks] by 1
      ranks.push { value: i, label: vm.rankNames[i], avatar: null }

    submissions.forEach (submission) ->
      rank = submission.rank
      if (rank <= vm.numberOfRanks)
        ranks[rank].avatarUrl = submission.submitter.avatarUrl

    vm.ranks = ranks

  onChange = (data) ->
    vm.numberOfRanks = data.numberOfRanks
    vm.submissions = data.submissions

    vm.phase.current.startDate = data.phase.startDate
    vm.phase.current.endDate = data.phase.endDate
    vm.phase.next.startDate = data.phase.nextStartDate

    trimRankNames data.numberOfRanks
    populateRankList data.submissions
    populateTimeline data.phase

  getSubmissions = (params) ->
    resource = SubmissionAPIService.get params

    resource.$promise.then (response) ->
      onChange response

    resource.$promise.catch (response) ->
      # TODO: do something intelligent

    resource.$promise.finally ->
      vm.loaded = true
      # TODO: do something intelligent


  activate()

SubmissionsController.$inject = ['$scope', 'SubmissionAPIService']

angular.module('appirio-tech-submissions').controller 'SubmissionsController', SubmissionsController
