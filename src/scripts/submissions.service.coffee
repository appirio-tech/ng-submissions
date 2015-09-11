'use strict'

srv = (helpers, StepsAPIService, SubmissionsAPIService, MessagesAPIService, ModelHelpers) ->
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

    apiCall = () ->
      params =
        projectId: projectId
        stepId   : stepId

      SubmissionsAPIService.query(params).$promise

    ModelHelpers.fetch {
      collection: submissionsService.submissions
      apiCall: apiCall
      eventName: 'submissionsService.submissions:changed'
    }

  submissionsService.markMessagesAsRead = (submissionId, fileId, userId) ->
    currentSubmissions = helpers.findInCollection submissionsService.submissions, 'id', submissionId
    currentFile        = helpers.findInCollection currentSubmissions.files, 'id', fileId
    messages           = currentFile.threads[0]?.messages

    messages.forEach (message) ->
      if !message.read
        apiCall = () ->
          params =
            id: message.id

          body =
            read: true
            subscriberId: userId

          MessagesAPIService.put(params, body).$promise

        ModelHelpers.update {
          model: message
          updates:
            read: true
          apiCall: apiCall
          eventName: 'submissionsService.submissions:changed'
          handleResponse: false
        }

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

    apiCall = (message) ->
      MessagesAPIService.save(message).$promise

    ModelHelpers.addToCollection {
      collection: messages
      item: newMessage
      apiCall: apiCall
      eventName: 'submissionsService.submissions:changed'
    }

  submissionsService

srv.$inject = ['SubmissionsHelpers', 'StepsAPIService', 'SubmissionsAPIService', 'MessagesAPIService', 'ModelHelpers']

angular.module('appirio-tech-submissions').factory 'SubmissionsService', srv