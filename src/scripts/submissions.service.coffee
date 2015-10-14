'use strict'

SubmissionsService = ($rootScope, helpers, StepsAPIService, SubmissionsAPIService, MessagesAPIService, OptimistCollection) ->
  currentProjectId = null
  currentStepId = null

  emitUpdates = ->
    $rootScope.$emit 'SubmissionsService:changed'

  createSubmissionCollection = ->
    newSteps = new OptimistCollection
      updateCallback: emitUpdates
      propsToIgnore: ['$promise', '$resolved']

    newSteps

  submissions = createSubmissionCollection()

  get = ->
    submissions.get()

  fetch = (projectId, stepId) ->
    if projectId != currentProjectId || stepId != currentStepId
      submissions = createSubmissionCollection()
      currentProjectId = projectId
      currentStepId = stepId

    apiCall = () ->
      params =
        projectId: projectId
        stepId   : stepId

      SubmissionsAPIService.query(params).$promise

    submissions.fetch
      apiCall: apiCall

  markMessagesAsRead = (submissionId, fileId, userId) ->
    submission     = submissions.findWhere { id: submissionId }
    submissionData = submission.get()
    files          = submissionData.files
    file           = helpers.findInCollection submission.files, 'id', fileId
    messages       = file.threads[0]?.messages
    updateMade     = false

    messages.forEach (message) ->
      if !message.read
        updateMade = true
        message.read = true

        params =
          id: message.id

        body =
          read: true
          subscriberId: userId

        MessagesAPIService.put(params, body).$promise

    if updateMade
      submission.updateLocal
        updates:
          read: true

  sendMessage = (submissionId, fileId, message, userId) ->
    currentSubmissions = helpers.findInCollection submissions, 'id', submissionId
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

    OptimistCollection.addToCollection
      collection: messages
      item: newMessage
      apiCall: apiCall
      updateCallback: emitUpdates

  get                : get
  fetch              : fetch
  markMessagesAsRead : markMessagesAsRead
  sendMessage        : sendMessage

SubmissionsService.$inject = ['$rootScope', 'SubmissionsHelpers', 'StepsAPIService', 'SubmissionsAPIService', 'MessagesAPIService', 'OptimistCollection']

angular.module('appirio-tech-submissions').factory 'SubmissionsService', SubmissionsService