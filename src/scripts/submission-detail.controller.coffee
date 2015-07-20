'use strict'

SubmissionDetailController = ($scope, SubmissionDetailService) ->
  vm = this
  vm.submissionAccepted = null;

  vm.acceptSubmission = ->
    vm.submissionAccepted = true;

  activate = ->
    #TODO: dynamic ids based on stateParams
    params =
      id: '123'
      submission_id: '321'

    SubmissionDetailService.getSubmissionDetail(params).then (response) ->
      vm.work = response
      vm.submissionAccepted = vm.work.accepted;
    return

  activate()

SubmissionDetailController.$inject = ['$scope', 'SubmissionDetailService']

angular.module('appirio-tech-submissions').controller 'SubmissionDetailController', SubmissionDetailController
