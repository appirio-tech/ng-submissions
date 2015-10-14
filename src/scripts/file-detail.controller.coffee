'use strict'

FileDetailController = (helpers, $scope, $rootScope, SubmissionsService, UserV3Service) ->
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

  vm.messages     = []
  vm.newMessage   = ''
  vm.showMessages = false
  vm.userId       = null
  vm.avatars      = {}

  vm.sendMessage = ->
    if vm.newMessage
      SubmissionsService.sendMessage vm.submissionId, vm.fileId, vm.newMessage, vm.userId
      vm.newMessage = ''

  vm.toggleComments = ->
    vm.showComments = !vm.showComments

    if vm.showComments && vm.file.unreadMessages > 0
      SubmissionsService.markMessagesAsRead vm.submissionId, vm.fileId, vm.userId

  activate = ->
    destroySubmissionsListener = $rootScope.$on 'SubmissionsService:changed', ->
      onChange()

    $scope.$on '$destroy', ->
      destroySubmissionsListener()

    $scope.$watch UserV3Service.getCurrentUser, (user) ->
      vm.userId = user?.id

    SubmissionsService.fetch vm.projectId, vm.stepId

  onChange = ->
    submissions = SubmissionsService.get()

    if submissions.length <= 0
      return null

    vm.loaded         = true
    currentSubmission = helpers.findInCollection submissions, 'id', vm.submissionId
    vm.submission     = angular.copy currentSubmission
    vm.submission     = helpers.decorateSubmissionWithMessageCounts vm.submission
    vm.file           = helpers.findInCollection vm.submission.files, 'id', vm.fileId
    vm.messages       = vm.file.threads[0]?.messages || []

    currentIndex = vm.submission.files.indexOf vm.file

    prevIndex = currentIndex - 1
    if prevIndex < 0
      prevIndex = vm.submission.files.length - 1

    nextIndex = parseInt(currentIndex) + 1
    if nextIndex >= vm.submission.files.length
      nextIndex = 0

    vm.prevFile  = vm.submission.files[prevIndex]
    vm.nextFile  = vm.submission.files[nextIndex]


  activate()

  vm

FileDetailController.$inject = ['SubmissionsHelpers', '$scope', '$rootScope', 'SubmissionsService', 'UserV3Service']

angular.module('appirio-tech-submissions').controller 'FileDetailController', FileDetailController