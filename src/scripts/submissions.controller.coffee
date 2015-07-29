'use strict'

SubmissionsController = ($scope, SubmissionAPIService) ->
  vm             = this
  vm.submissions = []
  vm.loaded      = false
  vm.phase        = $scope.phase

  activate = ->
    params =
      linkId: $scope.linkId
      phase : $scope.phase

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
      # TODO: do something intelligent

    resource.$promise.finally ->
      vm.loaded = true
      # TODO: do something intelligent


  activate()

SubmissionsController.$inject = ['$scope', 'SubmissionAPIService']

angular.module('appirio-tech-submissions').controller 'SubmissionsController', SubmissionsController
