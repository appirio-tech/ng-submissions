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

decorateSubmissionWithUnreadCounts = (submission) ->
  submission.files.forEach (file) ->
    total = 0
    unread = 0

    file.threads[0].messages.forEach (message) ->
      total = total + 1
      if !message.read
        unread = unread + 1

    file.totalMessages = total
    file.unreadMessages = unread

  submission

decorateSubmissionsWithUnreadCounts = (submissions) ->
  submissions.forEach (submission) ->
    submission = decorateSubmissionWithUnreadCounts submission

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

srv = ($q, StepsAPIService, SubmissionsAPIService) ->

  # Used for caching
  currentProjectId = null
  currentStepId = null

  submissionsService =
    submissions: []
    decorateSubmissionsWithRanks: decorateSubmissionsWithRanks
    decorateSubmissionWithRank: decorateSubmissionWithRank
    decorateSubmissionsWithUnreadCounts: decorateSubmissionsWithUnreadCounts
    decorateSubmissionWithUnreadCounts: decorateSubmissionWithUnreadCounts
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

  submissionsService

srv.$inject = ['$q', 'StepsAPIService', 'SubmissionsAPIService']

angular.module('appirio-tech-submissions').factory 'SubmissionsService', srv