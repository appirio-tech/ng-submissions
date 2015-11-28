'use strict'

FileDetailController = ($scope, DataService, StepSubmissionsService) ->
  vm = this

  vm.loaded       = false
  vm.submission   = {}
  vm.file         = {}
  vm.prevFile     = null
  vm.nextFile     = null
  vm.projectId    = $scope.projectId
  vm.stepId       = $scope.stepId
  vm.submissionId = $scope.submissionId
  vm.fileId       = $scope.fileId
  vm.userType     = $scope.userType

  vm.messages     = []
  vm.newMessage   = ''
  vm.showMessages = false

  activate = ->
    DataService.subscribe $scope, render, [StepSubmissionsService, 'get', vm.projectId, vm.stepId]

  render = (step) ->
    vm.loaded     = true
    vm.submission = step.submissions.filter((submission) -> submission.id == vm.submissionId)[0]
    vm.file       = vm.submission.files.filter((file) -> file.id == vm.submissionId)[0]
    vm.messages   = vm.file.threads[0]?.messages || []

    currentIndex = vm.submission.files.indexOf vm.file

    prevIndex = currentIndex - 1
    if prevIndex < 0
      prevIndex = vm.submission.files.length - 1

    nextIndex = parseInt(currentIndex) + 1
    if nextIndex >= vm.submission.files.length
      nextIndex = 0

    vm.prevFile  = vm.submission.files[prevIndex]
    vm.nextFile  = vm.submission.files[nextIndex]

    vm.status = step.status

  vm.sendMessage = ->
    if vm.newMessage
      SubmissionsService.sendMessage vm.submissionId, vm.fileId, vm.newMessage
      vm.newMessage = ''

  vm.toggleComments = ->
    vm.showComments = !vm.showComments

    if vm.showComments && vm.file.unreadMessages > 0
      SubmissionsService.markMessagesAsRead vm.submissionId, vm.fileId

  activate()

  vm

FileDetailController.$inject = ['$scope', 'DataService', 'StepSubmissionsService']

angular.module('appirio-tech-submissions').controller 'FileDetailController', FileDetailController