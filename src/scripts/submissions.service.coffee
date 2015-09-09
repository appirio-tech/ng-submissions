'use strict'

decorateSubmissionWithRank = (submission, rankedSubmissions = []) ->
  submission.rank = ''
  rankedSubmissions.forEach (rankedSubmission) ->
    if submission.id == rankedSubmission.submissionId
      submission.rank = rankedSubmission.rank

  submission

decorateSubmissionsWithRanks = (submissions, rankedSubmissions = []) ->
  submissions.forEach (submission) ->
    submission = decorateSubmissionWithRank submission, rankedSubmissions

  submissions

decorateFileWithMessageCounts = (file) ->
  file.totalMessages = 0
  file.unreadMessages = 0

  file.threads[0].messages.forEach (message) ->
    file.totalMessages = file.totalMessages + 1
    if !message.read
      file.unreadMessages = file.unreadMessages + 1

  file

decorateSubmissionWithMessageCounts = (submission) ->
  submission.totalMessages = 0
  submission.unreadMessages = 0

  submission.files.forEach (file) ->
    decorateFileWithMessageCounts(file)
    submission.totalMessages = submission.totalMessages + file.totalMessages
    submission.unreadMessages = submission.unreadMessages + file.unreadMessages

  submission

decorateSubmissionsWithMessageCounts = (submissions) ->
  submissions.forEach (submission) ->
    submission = decorateSubmissionWithMessageCounts submission

  submissions

sortSubmissions = (submissions) ->
  ranked = submissions.filter (submission) ->
    submission.rank != ''

  unRanked = submissions.filter (submission) ->
    submission.rank == ''

  orderedByRank = ranked.sort (previousSubmission, nextSubmission) ->
    return previousSubmission.rank - nextSubmission.rank

  orderedBySubmitter = unRanked.sort (previousSubmission, nextSubmission) ->
    previousSubmission.submitter.id - nextSubmission.submitter.id

  orderedSubmissions = orderedByRank.concat orderedBySubmitter
  orderedSubmissions

srv = ($rootScope, StepsAPIService, SubmissionsAPIService) ->

  # Used for caching
  currentProjectId = null
  currentStepId = null

  submissionsService =
    submissions: []
    decorateSubmissionsWithRanks: decorateSubmissionsWithRanks
    decorateSubmissionWithRank: decorateSubmissionWithRank
    decorateSubmissionsWithMessageCounts: decorateSubmissionsWithMessageCounts
    decorateSubmissionWithMessageCounts: decorateSubmissionWithMessageCounts
    sortSubmissions: sortSubmissions

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

  submissionsService

srv.$inject = ['$rootScope', 'StepsAPIService', 'SubmissionsAPIService']

angular.module('appirio-tech-submissions').factory 'SubmissionsService', srv