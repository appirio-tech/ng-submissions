'use strict'

SubmissionsService = ($rootScope, helpers, StepsAPIService, SubmissionsAPIService, SubmissionsMessagesAPIService, OptimistCollection, UserV3Service, MessageUpdateAPIService) ->
  submissions = null
  currentProjectId = null
  currentStepId = null

  emitUpdates = ->
    $rootScope.$emit 'SubmissionsService:changed'

  createSubmissionCollection = ->
    newSteps = new OptimistCollection
      updateCallback: emitUpdates
      propsToIgnore: ['$promise', '$resolved']

    newSteps

  get = (projectId, stepId) ->
    unless projectId && stepId
      throw 'SubmissionsService.get requires a projectId and a stepId'

    if projectId != currentProjectId || stepId != currentStepId
      fetch(projectId, stepId)

    submissions.get()

  fetch = (projectId, stepId) ->
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

  markMessagesAsRead = (submissionId, fileId, userId, threadId) ->
    submission     = submissions.findOneWhere(id: submissionId)
    submissionData = submission.get()
    files          = submissionData.files
    file           = helpers.findInCollection files, 'id', fileId
    messages       = file.threads[0]?.messages

    message = messages[messages.length - 1]
    if !message.read
      updateMade = true
      message.read = true

      queryParams =
        threadId: message.threadId
        messageId: message.id

      putParams =
        param:
          readFlag:     true
          subscriberId: userId

      resource = MessageUpdateAPIService.put queryParams, putParams


  sendMessage = (submissionId, fileId, message, userId) ->
    currentSubmission = submissions.findOneWhere(id: submissionId)
    submissionData    = currentSubmission.get()
    currentFile       = helpers.findInCollection submissionData.files, 'id', fileId
    thread            = currentFile.threads[0]
    messages          = thread.messages
    now               = new Date()

    payload =
      param:
        publisherId: userId
        threadId: thread.id
        body: message

    params =
      projectId: currentProjectId
      submissionId: submissionId
      threadId: thread.id

    SubmissionsMessagesAPIService.post params, payload

    user = UserV3Service.getCurrentUser()

    newMessage = angular.merge {}, payload.param,
      read: true
      createdAt: now.toISOString()
      publisher:
        handle: user.handle
        avatar: user.avatar

    # Dirty hack alert
    privateFiles = currentSubmission._data.files
    privateCurrentFile = helpers.findInCollection privateFiles, 'id', currentFile.id

    privateCurrentFile.threads[0].messages.push newMessage
    emitUpdates()


  get                : get
  markMessagesAsRead : markMessagesAsRead
  sendMessage        : sendMessage

SubmissionsService.$inject = ['$rootScope', 'SubmissionsHelpers', 'StepsAPIService', 'SubmissionsAPIService', 'SubmissionsMessagesAPIService', 'OptimistCollection', 'UserV3Service', 'MessageUpdateAPIService']

angular.module('appirio-tech-submissions').factory 'SubmissionsService', SubmissionsService