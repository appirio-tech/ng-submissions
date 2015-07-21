'use strict'

SubmissionDetailController = ($scope, SubmissionDetailAPIService) ->
  vm = this
  vm.submissionAccepted = null;

  vm.acceptSubmission = ->
    vm.submissionAccepted = true;

  activate = ->
    params =
      workId: $scope.workId
      submissionId: $scope.submissionId

    resource = SubmissionDetailAPIService.get params

    resource.$promise.then (response) ->
      vm.work = response
      vm.submissionAccepted = vm.work.accepted

    resource.$promise.catch (error)->
      # TODO: add error handling
    return


  activate()

SubmissionDetailController.$inject = ['$scope', 'SubmissionDetailAPIService']

angular.module('appirio-tech-submissions').controller 'SubmissionDetailController', SubmissionDetailController
