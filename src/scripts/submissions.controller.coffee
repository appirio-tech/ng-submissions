'use strict'

SubmissionsController = ($scope, SubmissionAPIService) ->
  vm               = this
  vm.loaded        = false
  vm.submissions   = []
  vm.ranks         = []
  vm.timeline      = []

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
    current:
      name: ''
      status: 'scheduled'
    next:
      null

  activate = ->
    params =
      workId: $scope.workId
      phase : $scope.phase

    getSubmissions params

    vm

  vm.reorder = (changedSubmission) ->
    populateRankList vm.submissions

  populateTimeline = (phaseInfo) ->
    timeline = []

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
    # TODO: Move this to the schema
    data.submissions[0].rank = 0;
    data.submissions[1].rank = 1;
    data.submissions[2].rank = 2;

    vm.numberOfRanks = data.numberOfRanks
    vm.submissions = data.submissions
    vm.phase = data.phase

    trimRankNames data.numberOfRanks
    populateRankList data.submissions
    populateTimeline data.phase

  getSubmissions = (params) ->
    submissions =
      submissions: []
      avatars    : {}

    resource = SubmissionAPIService.get params

    resource.$promise.then (response) ->
      submissions = response

      onChange submissions

    resource.$promise.catch (response) ->
      # TODO: do something intelligent

    resource.$promise.finally ->
      vm.loaded = true
      # TODO: do something intelligent


  activate()

SubmissionsController.$inject = ['$scope', 'SubmissionAPIService']

angular.module('appirio-tech-submissions').controller 'SubmissionsController', SubmissionsController
