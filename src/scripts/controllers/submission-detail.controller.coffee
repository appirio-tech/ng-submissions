'use strict'

SubmissionDetailController = ($scope, DataService, StepSubmissionsService) ->
  vm              = this
  vm.loaded       = false
  vm.submission   = {}
  vm.projectId    = $scope.projectId
  vm.stepId       = $scope.stepId
  vm.submissionId = $scope.submissionId
  vm.userType     = $scope.userType

  activate = ->
    DataService.subscribe $scope, render, [StepSubmissionsService, 'get', vm.projectId, vm.stepId]

  render = (step) ->
    vm.loaded           = true
    vm.submission       = step.submissions.filter((submission) -> submission.id == vm.submissionId)[0]
    vm.stepType         = step.stepType

    # assign an arbitrary number to identify each submission on the ui
    if !vm.submissionIdMap
      vm.submissionIdMap = {}
      ordered = vm.submissions.sort (previous, next) ->
        previous.id - next.id
      ordered.forEach (submission, index) ->
        vm.submissionIdMap[submission.id] = index

      vm.submissionNumber = "# #{submissionIdMap[vm.submission.id]}"

  activate()

  vm

SubmissionDetailController.$inject = ['$scope', 'DataService', 'StepSubmissionsService']

angular.module('appirio-tech-submissions').controller 'SubmissionDetailController', SubmissionDetailController