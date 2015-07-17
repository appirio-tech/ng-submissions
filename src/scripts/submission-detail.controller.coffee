'use strict'

SubmissionDetailController = ($scope, SubmissionDetailService) ->
  vm = this
  # vm.work = null;
  # vm.submissionAccepted = false;

  vm.acceptSubmission = ->
    SubmissionDetailService.acceptSubmission()

  activate = ->
    vm.work = SubmissionDetailService.initializeSubmissionDetail()
    console.log('initalizing', vm.work)

  watchSubmissionAccepted = ->
    SubmissionDetailService.submissionAccepted
    console.log('submission', SubmissionDetailService.submissionAccepted)

  setSubmissionAccepted = (accepted) ->
    console.log('setting', accepted)
    vm.submissionAccepted = accepted

  $scope.$watch watchSubmissionAccepted, setSubmissionAccepted, true

  activate()

SubmissionDetailController.$inject = ['$scope', 'SubmissionDetailService']

angular.module('appirio-tech-submissions').controller 'SubmissionDetailController', SubmissionDetailController
