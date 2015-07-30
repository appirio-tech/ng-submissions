'use strict'

SubmissionDetailController = ($scope, SubmissionDetailAPIService) ->
  vm = this
  vm.work = null
  vm.positions = null
  vm.submissionsCount = null
  vm.selectedPosition = null

  vm.selectPosition = ->
    body =
      workId      : $scope.workId
      submissionId: $scope.submissionId
      position: vm.selectedPosition
    # TODO: Correct API call to update submission body
    # SubmissionDetailAPIService.put body

  activate = ->
    params =
      workId      : $scope.workId
      submissionId: $scope.submissionId

    resource = SubmissionDetailAPIService.get params

    resource.$promise.then (response) ->
      vm.work = response
      vm.submissionsCount = vm.work.files.length - 1
      #TODO: Dynamic positions count based on data
      vm.positions = [1, 2, 3, 4]

    resource.$promise.catch (error)->
      # TODO: add error handling

    vm

  activate()

SubmissionDetailController.$inject = ['$scope', 'SubmissionDetailAPIService']

angular.module('appirio-tech-submissions').controller 'SubmissionDetailController', SubmissionDetailController
