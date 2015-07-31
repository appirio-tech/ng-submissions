'use strict'

SubmissionsController = ($scope, SubmissionAPIService) ->
  vm             = this
  vm.submissions = []
  vm.loaded      = false
  vm.phase       = $scope.phase
  
  vm.phases =
    current:
      number: 1
      outOf: 3
      name: 'Design Concepts'
      status: 'open'
    next:
      name: 'Final Designs'
      starts: '2015-05-05T20:53:41.467Z'

  vm.ranks = [
    { value: 1, longLabel: '1st Place', avatarUrl: null }
    { value: 2, longLabel: '2nd Place', avatarUrl: null }
    { value: 3, longLabel: '3rd Place', avatarUrl: null }
    { value: 4, longLabel: '4th Place', avatarUrl: null }
    { value: 5, longLabel: '5th Place', avatarUrl: null }
  ]

  vm.timeline = [ 'active', '', '' ]

  vm.reorder = (submission) ->
    # TODO: Update order on server, then reload the collection
    onChange vm.submissions

  activate = ->
    params =
      workId: $scope.workId
      phase : $scope.phase

    getSubmissions params

    vm

  populateRanks = (submissions) ->
    submissions.forEach (submission) ->
      if (submission.position?.value <= vm.ranks.length)
        position                     = submission.position.value - 1
        vm.ranks[position].avatarUrl = submission.submitter.avatarUrl

  onChange = (submissions) ->
    vm.submissions = submissions
    populateRanks submissions.screeningSubmissions

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
