'use strict'

FileDetailController = ($scope, SubmissionsService) ->
  vm = this

  vm.loaded       = false
  vm.submission   = {}
  vm.file         = {}
  vm.prevFile     = null
  vm.nextFile     = null
  vm.showMessages = false
  vm.projectId    = $scope.projectId
  vm.stepId       = $scope.stepId
  vm.submissionId = $scope.submissionId
  vm.fileId       = $scope.fileId

  activate = ->
    SubmissionsService.getSubmissions(vm.projectId, vm.stepId).then ->
      onChange()

  onChange = ->
    submissions = SubmissionsService.submissions

    if submissions <= 0
      return null

    vm.loaded         = true
    currentSubmission = SubmissionsService.findInCollection submissions, 'id', vm.submissionId
    vm.submission     = angular.copy currentSubmission
    vm.submission     = SubmissionsService.decorateSubmissionWithUnreadCounts vm.submission
    vm.file           = SubmissionsService.findInCollection vm.submission.files, 'id', vm.fileId

    currentIndex = vm.submission.files.indexOf vm.file
    vm.prevFile = vm.submission.files[currentIndex - 1]
    vm.nextFile = vm.submission.files[parseInt(currentIndex) + 1]

  activate()

  vm

FileDetailController.$inject = ['$scope', 'SubmissionsService']

angular.module('appirio-tech-submissions').controller 'FileDetailController', FileDetailController