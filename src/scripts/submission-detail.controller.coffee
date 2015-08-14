'use strict'

SubmissionDetailController = ($scope, SubmissionDetailAPIService) ->
  vm                  = this
  vm.work             = null
  vm.positions        = null
  vm.submissionsCount = null
  vm.selectedPosition = null
  vm.workId           = $scope.workId
  vm.submissionId     = $scope.submissionId

  vm.selectPosition = ->
    params =
      workId: vm.workId
      submissionId: vm.submissionId

    submission = vm.work
    resource = SubmissionDetailAPIService.updateRank params, submission

    resource.$promise.then (response) ->
    vm.selectedPosition = false

  activate = ->
    params =
      workId      : vm.workId
      submissionId: vm.submissionId

    resource = SubmissionDetailAPIService.get params

    resource.$promise.then (response) ->
      vm.work             = response
      vm.submissionsCount = vm.work.files.length - 1
      #TODO: Dynamic positions count based on data
      vm.positions = [
      '1st Place'
      '2nd Place'
      '3rd Place'
      '4th Place'
      ]

    resource.$promise.catch (error)->
      # TODO: add error handling

    vm

  activate()

SubmissionDetailController.$inject = ['$scope', 'SubmissionDetailAPIService']

angular.module('appirio-tech-submissions').controller 'SubmissionDetailController', SubmissionDetailController
