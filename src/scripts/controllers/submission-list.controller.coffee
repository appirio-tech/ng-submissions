'use strict'

SubmissionListController = ($scope, $state, DataService, StepSubmissionsService) ->
  vm             = this
  vm.status      = 'PLACEHOLDER'
  vm.statusValue = 0
  vm.submissions = []
  vm.projectId   = $scope.projectId
  vm.stepId      = $scope.stepId
  vm.userType    = $scope.userType

  activate = ->
    DataService.subscribe $scope, render, [StepSubmissionsService, 'get', vm.projectId, vm.stepId]

  render = (step) ->
    step.submissions = step.submissions.map (submission) ->
      submission.detailUrl = $state.href 'submission-detail',
        projectId    : vm.projectId
        stepId       : vm.stepId
        submissionId : submission.id

      submission.files = submission.files.map (file) ->
        file.detailUrl = $state.href 'file-detail',
          projectId    : vm.projectId
          stepId       : vm.stepId
          submissionId : submission.id
          fileId       : file.id

        file

      submission

    vm.submissions = step.submissions
    vm.status      = step.status
    vm.statusValue = step.statusValue

  activate()

  vm

SubmissionListController.$inject = ['$scope', '$state', 'DataService', 'StepSubmissionsService']

angular.module('appirio-tech-submissions').controller 'SubmissionListController', SubmissionListController
