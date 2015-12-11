'use strict'

FileDetailSlideController = ($scope, $state, DataService, StepSubmissionsService, SubmissionsService) ->
  vm                = this
  vm.sendMessage    = $scope.sendMessage
  vm.toggleComments = $scope.toggleComments
  vm.messages       = $scope.messages
  vm.newMessage     = $scope.newMessage
  vm.showMessages   = $scope.showMessages


  # vm.messages     = []
  # vm.newMessage   = ''
  # vm.showMessages = false


    # currentIndex = vm.submission.files.indexOf(vm.file)

    # if currentIndex > 0
    #   vm.prevFile = vm.submission.files[currentIndex - 1]

    # if currentIndex + 1 < vm.submission.files.length
    #   vm.nextFile = vm.submission.files[currentIndex + 1]


  # vm.sendMessage = ->
  #   if vm.newMessage
  #     SubmissionsService.sendMessage projectId, stepId, submissionId, fileId, vm.newMessage
  #     vm.newMessage = ''

  # vm.toggleComments = ->
  #   vm.showMessages = !vm.showMessages

  #   if vm.showMessages and vm.file.unreadMessages > 0
  #     SubmissionsService.markMessagesAsRead(projectId, stepId, submissionId, fileId)

  activate()

  vm

FileDetailSlideController.$inject = ['$scope', '$state', 'DataService', 'StepSubmissionsService', 'SubmissionsService']

angular.module('appirio-tech-submissions').controller 'FileDetailSlideController', FileDetaiSlideController