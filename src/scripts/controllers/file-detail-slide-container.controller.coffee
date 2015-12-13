'use strict'

FileDetailSlideContainerController = ($scope, $state, DataService, StepSubmissionsService, SubmissionsService) ->
  vm            = this
  vm.loaded     = false
  vm.submission = {}
  projectId     = $scope.projectId
  stepId        = $scope.stepId
  submissionId  = $scope.submissionId
  fileId        = $scope.fileId
  vm.userType   = $scope.userType
  vm.messages   = []
  vm.newMessage = ''

  activate = ->
    DataService.subscribe $scope, render, [StepSubmissionsService, 'get', projectId, stepId]

  render = (step) ->
    vm.loaded          = true
    vm.submission      = step.submissions.filter((submission) -> submission.id == submissionId)[0]
    if vm.submission
      vm.hasSubmission   = true
      vm.files           = vm.submission.files
      vm.startingFile    = vm.submission.files.filter((file) -> file.id == fileId)[0]
      submitter          = vm.submission.submitter
      vm.submitterAvatar = submitter.avatar
      vm.submitterHandle = submitter.handle
      vm.messages        = vm.startingFile.threads[0]?.messages || []
      vm.status          = step.status
      vm.canComment      = vm.userType == 'customer' || vm.userType == 'copilot' || vm.submission.belongsToUser

  vm.onFileChange = (file) ->
    vm.file = file

  vm.sendMessage = ->
    if vm.newMessage
      SubmissionsService.sendMessage projectId, stepId, submissionId, vm.file.id, vm.newMessage
      vm.newMessage = ''

  vm.toggleComments = ->
    vm.showMessages = !vm.showMessages

    if vm.showMessages and vm.file.unreadMessages > 0
      SubmissionsService.markMessagesAsRead(projectId, stepId, submissionId, vm.file.id)

  activate()

  vm

FileDetailSlideContainerController.$inject = ['$scope', '$state', 'DataService', 'StepSubmissionsService', 'SubmissionsService']

angular.module('appirio-tech-submissions').controller 'FileDetailSlideContainerController', FileDetailSlideContainerController