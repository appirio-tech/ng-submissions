'use strict'

FileDetailSlideContainerController = ($scope, $state, $filter, DataService, StepSubmissionsService, SubmissionsService) ->
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

  canComment = ->
    allow = vm.userType == 'customer' || vm.userType == 'copilot' || vm.submission.belongsToUser

    if vm.status == 'CLOSED' && vm.stepType != 'completeDesigns'
      allow = false

    allow

  render = (step) ->
    vm.loaded     = true
    vm.stepType   = step.stepType
    vm.submission = step.submissions.filter((submission) -> submission.id == submissionId)[0]

    if vm.submission
      vm.hasSubmission   = true
      vm.files           = vm.submission.files
      vm.startingFile    = vm.submission.files.filter((file) -> file.id == fileId)[0]

      if !vm.submissionIdMap && vm.submission
        vm.submissionIdMap = {}
        submissionsCopy = step.submissions.slice()

        ordered = submissionsCopy.sort (previous, next) ->
          new Date(previous.createdAt) - new Date(next.createdAt)

        ordered.forEach (submission, index) ->
          vm.submissionIdMap[submission.id] = index + 1

        vm.submissionNumber = "# #{vm.submissionIdMap[vm.submission.id]}"

      vm.submissionDate  = $filter('timeLapse')(vm.submission.createdAt)
      submitter          = vm.submission.submitter
      vm.messages        = vm.startingFile.threads[0]?.messages || []
      vm.status          = step.status
      vm.canComment      = canComment()

      if vm.file
        vm.file.threads[0]?.messages = vm.messages

  vm.onFileChange = (file) ->
    vm.file = file
    fileId = file.id
    vm.messages = vm.file.threads[0]?.messages || []

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

FileDetailSlideContainerController.$inject = ['$scope', '$state', '$filter', 'DataService', 'StepSubmissionsService', 'SubmissionsService']

angular.module('appirio-tech-submissions').controller 'FileDetailSlideContainerController', FileDetailSlideContainerController