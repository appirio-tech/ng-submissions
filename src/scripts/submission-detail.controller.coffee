'use strict'

SubmissionDetailController = ($scope, SubmissionDetailAPIService) ->
  vm = this
  vm.submissionAccepted = null;

  vm.acceptSubmission = ->
    vm.submissionAccepted = true;

  activate = ->
    #TODO: dynamic ids based on stateParams
    params =
      id: '123'
      submission_id: '321'

    resource = SubmissionDetailAPIService.get params

    resource.$promise.then (response) ->
      response
      vm.work = response
      vm.submissionAccepted = vm.work.accepted

    resource.$promise.catch (error)->
      console.log 'error on submission detail', error
    return


  activate()

SubmissionDetailController.$inject = ['$scope', 'SubmissionDetailAPIService']

angular.module('appirio-tech-submissions').controller 'SubmissionDetailController', SubmissionDetailController
