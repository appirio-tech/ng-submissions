'use strict'

srv = ($rootScope, helpers, StepsAPIService, SubmissionsAPIService, MessagesAPIService, O) ->
  # Used for caching
  currentProjectId = null
  currentStepId = null

  submissionsService =
    submissions: []

  emitUpdates = ->
    $rootScope.$emit 'submissionsService.submissions:changed'

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

    O.fetch {
      collection: submissionsService.submissions
      apiCall: apiCall
      updateCallback: emitUpdates
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

        O.update {
          model: message
          updates:
            read: true
          apiCall: apiCall
          updateCallback: emitUpdates
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

    O.addToCollection {
      collection: messages
      item: newMessage
      apiCall: apiCall
      updateCallback: emitUpdates
    }

  submissionsService

srv.$inject = ['$rootScope', 'SubmissionsHelpers', 'StepsAPIService', 'SubmissionsAPIService', 'MessagesAPIService', 'Optimist']

angular.module('appirio-tech-submissions').factory 'SubmissionsService', srv