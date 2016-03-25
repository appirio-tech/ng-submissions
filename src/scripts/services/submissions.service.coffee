'use strict'

SubmissionsService = ($rootScope, SubmissionsAPIService, SubmissionsMessagesAPIService, UserV3Service, MessageUpdateAPIService) ->
  data = {}
  pending = false
  error = false

  emitUpdates = (projectId, stepId) ->
    $rootScope.$emit "SubmissionsService:changed:#{projectId}:#{stepId}"

  subscribe = (scope, onChange) ->
    destroySubmissionsListener = $rootScope.$on "SubmissionsService:changed:#{projectId}:#{stepId}", ->
      onChange()

    scope.$on '$destroy', ->
      destroySubmissionsListener()

    onChange()

  dyanamicProps = (submissions) ->
    user = UserV3Service.getCurrentUser()

    submissions.map (submission) ->
      submission = withSeparateDeliverable submission
      submission = withMessageCounts submission
      submission = withOwnership submission, user?.id
      submission = withSortedMessages submission

      submission

  get = (projectId, stepId) ->
    unless projectId && stepId
      throw 'SubmissionsService.get requires a projectId and a stepId'

    unless data[stepId]
      fetch(projectId, stepId)

    copy = []

    for item in data[stepId]
      copy.push angular.merge({}, item)

    copy = dyanamicProps copy

    copy._pending = true if pending
    copy._error = error if error

    copy


  fetch = (projectId, stepId) ->
    data[stepId] = []
    submissions  = []
    pending      = true

    emitUpdates(projectId, stepId)

    params =
      projectId: projectId
      stepId   : stepId

    promise = SubmissionsAPIService.query(params).$promise

    promise.then (res) ->
      error = false
      data[stepId] = res

      submissions

    promise.catch (err) ->
      error = err

    promise.finally ->
      pending = false
      emitUpdates(projectId, stepId)

  markMessagesAsRead = (projectId, stepId, submissionId, fileId) ->
    user           = UserV3Service.getCurrentUser()
    submission     = data[stepId].filter((submission) -> submission.id == submissionId)[0]
    file           = submission.files.filter((file) -> file.id == fileId)[0]
    messages       = file.threads[0].messages

    messages.forEach (message) ->
      message.read = true

    emitUpdates(projectId, stepId)

    message = messages[messages.length - 1]

    queryParams =
      threadId: message.threadId
      messageId: message.id

    putParams =
      param:
        readFlag:     true
        subscriberId: user.id

    MessageUpdateAPIService.put queryParams, putParams

  sendMessage = (projectId, stepId, submissionId, fileId, message) ->
    user       = UserV3Service.getCurrentUser()
    submission = data[stepId].filter((submission) -> submission.id == submissionId)[0]
    file       = submission.files.filter((file) -> file.id == fileId)[0]
    thread     = file.threads[0]
    messages   = thread.messages
    now        = new Date()

    payload =
      param:
        publisherId: user.id
        threadId: thread.id
        body: message

    params =
      projectId: projectId
      submissionId: submissionId
      threadId: thread.id
      stepId: stepId
      fileId: fileId

    SubmissionsMessagesAPIService.post params, payload

    newMessage = angular.merge {}, payload.param,
      read: true
      createdAt: now.toISOString()
      publisher:
        handle: user.handle
        avatar: user.avatar

    messages.push newMessage
    emitUpdates(projectId, stepId)

  name               : 'SubmissionsService'
  subscribe          : subscribe
  get                : get
  markMessagesAsRead : markMessagesAsRead
  sendMessage        : sendMessage

SubmissionsService.$inject = ['$rootScope', 'SubmissionsAPIService', 'SubmissionsMessagesAPIService', 'UserV3Service', 'MessageUpdateAPIService']

angular.module('appirio-tech-submissions').factory 'SubmissionsService', SubmissionsService

withMessageCounts = (submission) ->
  withFileMessageCounts = angular.extend {}, submission,
    files: submission.files.map (file) ->
      angular.extend {}, file,
        totalMessages: file.threads[0]?.messages?.length
        unreadMessages: file.threads[0]?.messages?.filter((m) -> !m.read).length

  angular.extend {}, withFileMessageCounts,
    totalMessages: withFileMessageCounts.files.reduce ((t, f) -> t + f.totalMessages), 0
    unreadMessages: withFileMessageCounts.files.reduce ((t, f) -> t + f.unreadMessages), 0

withOwnership = (submission, userId) ->
  angular.extend {}, submission,
    belongsToUser: submission.submitter.userId == userId

withSeparateDeliverable = (submission) ->
  angular.extend {}, submission,
    downloadUrl: submission.files.filter((f) -> f.role == 'PREVIEW_COLLECTION')[0]?.url
    files: submission.files.filter((f) -> f.role != 'PREVIEW_COLLECTION')

withSortedMessages = (submission) ->
  angular.extend {}, submission,
    files: submission.files.map (file) ->
      angular.extend {}, file,
        threads: file.threads.map (thread) ->
          angular.extend {}, thread,
            messages: thread.messages.slice(0).sort (a, b) ->
              aDate = new Date a.createdAt
              bDate = new Date b.createdAt

              aDate - bDate
