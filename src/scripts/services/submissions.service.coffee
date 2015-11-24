'use strict'

SubmissionsService = ($rootScope, helpers, SubmissionsAPIService, SubmissionsMessagesAPIService, UserV3Service, MessageUpdateAPIService) ->
  submissions = null
  currentProjectId = null
  currentStepId = null
  pending = false
  error = false

  emitUpdates = ->
    $rootScope.$emit 'SubmissionsService:changed'

  subscribe = (scope, onChange) ->
    destroySubmissionsListener = $rootScope.$on 'SubmissionsService:changed', ->
      onChange()

    scope.$on '$destroy', ->
      destroySubmissionsListener()

    onChange()

  get = (projectId, stepId) ->
    unless projectId && stepId
      throw 'SubmissionsService.get requires a projectId and a stepId'

    if projectId != currentProjectId || stepId != currentStepId
      fetch(projectId, stepId)

    copy = []

    for item in submissions
      copy.push angular.merge({}, item)

    copy._pending = true if pending
    copy._error = error if error

    copy

  fetch = (projectId, stepId) ->
    currentProjectId = projectId
    currentStepId = stepId

    submissions          = []
    pending = true

    emitUpdates()

    params =
      projectId: projectId
      stepId   : stepId

    promise = SubmissionsAPIService.query(params).$promise

    promise.then (res) ->
      error = false
      submissions = res

      submissions.forEach (submission) ->
        submission.files.forEach (file) ->
          file.threads.forEach (thread) ->
            thread.messages.sort (a, b) ->
              aDate = new Date a.createdAt
              bDate = new Date b.createdAt

              aDate - bDate

    promise.catch (err) ->
      error = err

    promise.finally ->
      pending = false
      emitUpdates()

  markMessagesAsRead = (submissionId, fileId, userId, threadId) ->
    submission     = helpers.findInCollection submissions, 'id', submissionId
    file           = helpers.findInCollection submission.files, 'id', fileId
    messages       = file.threads[0].messages

    messages.forEach (message) ->
      message.read = true

    emitUpdates()

    message = messages[messages.length - 1]

    queryParams =
      threadId: message.threadId
      messageId: message.id

    putParams =
      param:
        readFlag:     true
        subscriberId: userId

    MessageUpdateAPIService.put queryParams, putParams

  sendMessage = (submissionId, fileId, message) ->
    user       = UserV3Service.getCurrentUser()
    submission = helpers.findInCollection submissions, 'id', submissionId
    file       = helpers.findInCollection submission.files, 'id', fileId
    thread     = file.threads[0]
    messages   = thread.messages
    now        = new Date()

    payload =
      param:
        publisherId: user.id
        threadId: thread.id
        body: message

    params =
      projectId: currentProjectId
      submissionId: submissionId
      threadId: thread.id

    SubmissionsMessagesAPIService.post params, payload

    newMessage = angular.merge {}, payload.param,
      read: true
      createdAt: now.toISOString()
      publisher:
        handle: user.handle
        avatar: user.avatar

    messages.push newMessage
    emitUpdates()

  subscribe          : subscribe
  get                : get
  markMessagesAsRead : markMessagesAsRead
  sendMessage        : sendMessage

SubmissionsService.$inject = ['$rootScope', 'SubmissionsHelpers', 'SubmissionsAPIService', 'SubmissionsMessagesAPIService', 'UserV3Service', 'MessageUpdateAPIService']

angular.module('appirio-tech-submissions').factory 'SubmissionsService', SubmissionsService