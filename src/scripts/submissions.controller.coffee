'use strict'

SubmissionsController = ($scope, SubmissionAPIService) ->
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

  activate = ->
    params =
      workId: $scope.workId
      phase : $scope.phase

    getSubmissions params

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

  vm.reorder = () ->
    populateRankList vm.submissions

  trimRankNames = (limit) ->
    vm.rankNames = vm.rankNames.slice 0, limit

  populateRankList = (submissions) ->
    ranks = []

    for i in [0...vm.numberOfRanks] by 1
      ranks.push
        value: i
        label: vm.rankNames[i]
        avatarUrl: null

    submissions.forEach (submission) ->
      if (submission.rank < vm.numberOfRanks)
        ranks[submission.rank].avatarUrl = submission.submitter.avatarUrl

    vm.ranks = ranks

  evaluateRanks = () ->
    count = 0

    vm.ranks.forEach (rank) ->
      if rank.avatarUrl != null
        count = count + 1

    vm.showConfirm = count == parseInt(vm.numberOfRanks)

  $scope.$watch 'vm.ranks', evaluateRanks, true

  # TODO: Remove me
  mockify = (data) ->
    if $scope.phase == 'design-concepts'
      data.phase.endDate = '2015-08-14T00:55:38.152Z'

    if $scope.phase == 'complete-designs' 
      data.phase.startDate = '2015-08-14T00:55:38.152Z'

    for i in [1..11] by 1
      data.submissions[0].files[i] = angular.copy data.submissions[0].files[0]

    for i in [1..5] by 1
      data.submissions[i] = angular.copy data.submissions[0]
      data.submissions[i].rank = i

    data

  onChange = (data) ->
    # Uncomment for development
    # data = mockify data
    vm.numberOfRanks           = data.numberOfRanks
    vm.submissions             = data.submissions
    vm.phase.current.startDate = data.phase.startDate
    vm.phase.current.endDate   = data.phase.endDate

    if Date.now() > new Date(vm.phase.current.startDate)
      vm.open = true

    trimRankNames data.numberOfRanks
    populateRankList data.submissions

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

  vm

SubmissionsController.$inject = ['$scope', 'SubmissionAPIService']

angular.module('appirio-tech-submissions').controller 'SubmissionsController', SubmissionsController
