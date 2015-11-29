'use strict'

SubmissionsService = ($rootScope, SubmissionsAPIService, SubmissionsMessagesAPIService, UserV3Service, MessageUpdateAPIService) ->
  data = {}
  pending = false
  error = false

  fileWithMessageCounts = (file) ->
    file.totalMessages = 0
    file.unreadMessages = 0

    file.threads?[0]?.messages.forEach (message) ->
      file.totalMessages = file.totalMessages + 1
      if !message.read
        file.unreadMessages = file.unreadMessages + 1

    file

  submissionWithMessageCounts = (submission) ->
    submission.totalMessages = 0
    submission.unreadMessages = 0

    submission.files.forEach (file) ->
      fileWithMessageCounts(file)
      submission.totalMessages = submission.totalMessages + file.totalMessages
      submission.unreadMessages = submission.unreadMessages + file.unreadMessages

    submission

  submissionsWithMessageCounts = (submissions) ->
    submissions.map (submission) ->
      submissionWithMessageCounts submission

  # With file types
  fileWithFileType = (file) ->
    extension = file.name.match /\.[0-9a-z]+$/i
    extension = extension[0].slice 1
    extension = extension.toLowerCase()

    file.fileType = extension

    file

  submissionWithFileTypes = (submission) ->
    submission.files = submission.files.map (file) ->
      fileWithFileType file

    submission

  submissionsWithFileTypes = (submissions) ->
    submissions.map (submission) ->
      submissionWithFileTypes submission

  # Limited by number of files
  submissionWithFileLimit = (submission, limit) ->
    submission.more = if submission.files.length > limit then submission.files.length - limit else 0
    submission.files   = submission.files.slice 0, limit

    submission

  submissionsWithFileLimit = (submissions, limit) ->
    submissions.map (submission) ->
      submissionWithFileLimit submission, limit

  # Filtered by file type
  submissionFilteredByType = (submission, allowedTypes = [ 'png', 'jpg', 'gif' ]) ->
    submission.files = submission.files.filter (file) ->
      allowedTypes.indexOf(file.fileType) > -1

    submission

  submissionsFilteredByType = (submissions, allowedTypes) ->
    submissions.map (submission) ->
      submissionFilteredByType submission, allowedTypes

  # Decorated with submission ownership
  submissionsWithOwnership = (submissions, userId) ->
    submissions.map (submission) ->
      angular.merge {}, submission,
        belongsToUser: submission.submitter.id == userId

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
    submissions = submissionsWithMessageCounts submissions
    submissions = submissionsWithOwnership submissions, user?.id
    submissions = submissionsWithFileTypes submissions
    submissions = submissionsFilteredByType submissions

    submissions

  get = (projectId, stepId) ->
    unless projectId && stepId
      throw 'SubmissionsService.get requires a projectId and a stepId'

    unless data[stepId]
      fetch(projectId, stepId)

    copy = []

    for item in data[stepId]
      copy.push angular.merge({}, item)

    copy._pending = true if pending
    copy._error = error if error

    dyanamicProps copy

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