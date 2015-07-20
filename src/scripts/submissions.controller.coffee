'use strict'

SubmissionsController = ($scope, SubmissionAPIService) ->
  vm             = this
  vm.submissions = []

  activate = ->
    params =
      work_id: $scope.workId

    getSubmissions params

    vm

  onChange = (submissions) ->
    vm.submissions = submissions

  getSubmissions = (params) ->
    submissions =
      submissions: []
      avatars    : {}

    resource = SubmissionAPIService.get params

    resource.$promise.then (response) ->
      submissions = response

      onChange submissions

    resource.$promise.catch (response) ->
      # do something intelligent

    resource.$promise.finally ->
      # do something intelligent

  activate()

SubmissionsController.$inject = ['$scope', 'SubmissionAPIService']

angular.module('appirio-tech-submissions').controller 'SubmissionsController', SubmissionsController
