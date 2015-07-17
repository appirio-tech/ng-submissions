'use strict'

SubmissionDetailController = ($scope, SubmissionDetailService) ->
  vm = this
  vm.submissionAccepted = false;

  vm.acceptSubmission = ->
    SubmissionDetailService.acceptSubmission()

  activate = ->
    vm.work = SubmissionDetailService.initializeSubmissionDetail()
    return

  watchSubmissionAccepted = ->
    SubmissionDetailService.submissionAccepted

  setSubmissionAccepted = (accepted) ->
    vm.submissionAccepted = accepted
    return

  $scope.$watch watchSubmissionAccepted, setSubmissionAccepted

  activate()

SubmissionDetailController.$inject = ['$scope', 'SubmissionDetailService']

angular.module('appirio-tech-submissions').controller 'SubmissionDetailController', SubmissionDetailController
