'use strict'

FileDetailController = (helpers, $scope, $rootScope, StepsService, SubmissionsService, UserV3Service) ->
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
  vm.avatars      = {}

  userId = UserV3Service.getCurrentUser()?.id

  activate = ->
    StepsService.subscribe $scope, onChange
    SubmissionsService.subscribe $scope, onChange

  vm.sendMessage = ->
    if vm.newMessage
      SubmissionsService.sendMessage vm.submissionId, vm.fileId, vm.newMessage, userId
      vm.newMessage = ''

  vm.toggleComments = ->
    vm.showComments = !vm.showComments

    if vm.showComments && vm.file.unreadMessages > 0
      SubmissionsService.markMessagesAsRead vm.submissionId, vm.fileId, userId

  onChange = ->
    steps = StepsService.get(vm.projectId)
    submissions = SubmissionsService.get(vm.projectId, vm.stepId)

    if steps._pending || submissions._pending
      vm.loaded = false
      return null

    vm.loaded     = true
    currentStep   = helpers.findInCollection steps, 'id', vm.stepId
    vm.submission = helpers.findInCollection submissions, 'id', vm.submissionId
    vm.submission = helpers.submissionWithMessageCounts vm.submission
    vm.submission = helpers.submissionWithFileTypes vm.submission
    vm.submission = helpers.submissionFilteredByType vm.submission
    vm.file       = helpers.findInCollection vm.submission.files, 'id', vm.fileId
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

    vm.status = helpers.statusOf currentStep


  activate()

  vm

FileDetailController.$inject = ['SubmissionsHelpers', '$scope', '$rootScope', 'StepsService', 'SubmissionsService', 'UserV3Service']

angular.module('appirio-tech-submissions').controller 'FileDetailController', FileDetailController