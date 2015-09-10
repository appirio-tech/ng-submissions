'use strict'

srv = (helpers, $rootScope, StepsAPIService, SubmissionsAPIService, MessagesAPIService) ->

  # Used for caching
  currentProjectId = null
  currentStepId = null

  submissionsService =
    submissions: []

  submissionsService.fetch = (projectId, stepId) ->
    if projectId != currentProjectId || stepId != currentStepId
      submissionsService.submissions = []
      currentProjectId = projectId
      currentStepId = stepId

    params =
      projectId: projectId
      stepId   : stepId

    SubmissionsAPIService.query(params).$promise.then (response) ->
      submissionsService.submissions = response
      $rootScope.$emit 'submissionsService.submissions:changed'

  submissionsService.markMessagesAsRead = (submissionId, fileId) ->
    currentSubmissions = helpers.findInCollection submissionsService.submissions, 'id', submissionId
    currentFile        = helpers.findInCollection currentSubmissions.files, 'id', fileId
    messages           = currentFile.threads[0]?.messages

    messages.forEach (message) ->
      message.read = true

    $rootScope.$emit 'submissionsService.submissions:changed'

  submissionsService.markMessagesAsReadRemote = (submissionId, fileId, userId) ->
    currentSubmissions = helpers.findInCollection submissionsService.submissions, 'id', submissionId
    currentFile        = helpers.findInCollection currentSubmissions.files, 'id', fileId
    messages           = currentFile.threads[0]?.messages

    messages.forEach (message) ->
      queryParams =
        id: message.id

      putParams =
        read        : true
        subscriberId: userId

      MessagesAPIService.put queryParams, putParams

  submissionsService.sendMessage = (submissionId, fileId, message, userId) ->
    currentSubmissions = helpers.findInCollection submissionsService.submissions, 'id', submissionId
    currentFile        = helpers.findInCollection currentSubmissions.files, 'id', fileId
    messages           = currentFile.threads[0]?.messages
    now                = new Date()

    newMessage =
      publisherId: userId
      body: message
      createdAt: now.toISOString()
      read: true

    messages.push newMessage

    $rootScope.$emit 'submissionsService.submissions:changed'

  submissionsService.sendMessageRemote = (message) ->
    resource = MessagesAPIService.save message

  submissionsService

srv.$inject = ['SubmissionsHelpers', '$rootScope', 'StepsAPIService', 'SubmissionsAPIService', 'MessagesAPIService']

angular.module('appirio-tech-submissions').factory 'SubmissionsService', srv