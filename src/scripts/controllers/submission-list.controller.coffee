'use strict'

SubmissionListController = ($scope, DataService, StepSubmissionsService) ->
  vm             = this
  vm.status      = 'PLACEHOLDER'
  vm.statusValue = 0
  vm.submissions = []
  vm.projectId   = $scope.projectId
  vm.stepId      = $scope.stepId
  vm.userType    = $scope.userType

  vm.generateProfileUrl = (handle) ->
    "https://www.topcoder.com/members/#{handle}"

  activate = ->
    DataService.subscribe $scope, render, [StepSubmissionsService, 'get', vm.projectId, vm.stepId]

  render = (step) ->
    vm.submissions = step.submissions
    vm.status      = step.status
    vm.statusValue = step.statusValue
    vm.fileCount   = step.fileCount

    # assign an arbitrary number to identify each submission on the ui
    if !vm.submissionIdMap
      vm.submissionIdMap = {}
      ordered = vm.submissions.sort (previous, next) ->
        previous.id - next.id
      ordered.forEach (submission, index) ->
        vm.submissionIdMap[submission.id] = index

  activate()

  vm

SubmissionListController.$inject = ['$scope', 'DataService', 'StepSubmissionsService']

angular.module('appirio-tech-submissions').controller 'SubmissionListController', SubmissionListController
