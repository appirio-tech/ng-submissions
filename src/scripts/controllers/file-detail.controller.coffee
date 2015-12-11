'use strict'

FileDetailController = ($scope, $state, DataService, StepSubmissionsService, SubmissionsService) ->
  vm              = this
  vm.projectId    = $scope.projectId
  vm.stepId       = $scope.stepId
  vm.submissionId = $scope.submissionId
  vm.fileId       = $scope.fileId
  vm.userType     = $scope.userType

  # vm.messages     = []
  # vm.newMessage   = ''
  # vm.showMessages = false

  # activate = ->
  #   DataService.subscribe $scope, render, [StepSubmissionsService, 'get', projectId, stepId]

  # render = (step) ->
  #   vm.loaded     = true
  #   vm.submission = step.submissions.filter((submission) -> submission.id == submissionId)[0]
  #   vm.file       = vm.submission.files.filter((file) -> file.id == fileId)[0]
  #   vm.file.isCurrent = true
  #   vm.messages   = vm.file.threads[0]?.messages || []
  #   vm.status     = step.status
  #   vm.canComment = vm.userType == 'customer' || vm.userType == 'copilot' || vm.submission.belongsToUser

  #   currentIndex = vm.submission.files.indexOf(vm.file)

  #   if currentIndex > 0
  #     vm.prevFile = vm.submission.files[currentIndex - 1]

  #   if currentIndex + 1 < vm.submission.files.length
  #     vm.nextFile = vm.submission.files[currentIndex + 1]

  # vm.generateProfileUrl = (handle) ->
  #   "https://www.topcoder.com/members/#{handle}"

  # vm.sendMessage = ->
  #   if vm.newMessage
  #     SubmissionsService.sendMessage projectId, stepId, submissionId, fileId, vm.newMessage
  #     vm.newMessage = ''

  # vm.toggleComments = ->
  #   vm.showMessages = !vm.showMessages

  #   if vm.showMessages and vm.file.unreadMessages > 0
  #     SubmissionsService.markMessagesAsRead(projectId, stepId, submissionId, fileId)

  # activate()

  vm

FileDetailController.$inject = ['$scope', '$state', 'DataService', 'StepSubmissionsService', 'SubmissionsService']

angular.module('appirio-tech-submissions').controller 'FileDetailController', FileDetailController