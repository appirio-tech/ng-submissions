'use strict'

findInCollection = (collection, prop, value) ->
  for index, el of collection
    if el[prop] == value
      return el

  null

createOrderedRankList = (rankedSubmissions, numberOfRanks) ->
  orderedRanks = []

  for i in [0...numberOfRanks] by 1
    orderedRanks[i] = null

  rankedSubmissions.forEach (submission) ->
    orderedRanks[submission.rank - 1] = submission.submissionId

  orderedRanks

removeBlankAfterN = (array, n) ->
  for i in [n...array.length] by 1
    if array[i] == null
      array.splice i, 1
      return array

  array

updateRankedSubmissions = (rankedSubmissions, numberOfRanks, id, rank) ->
  rankedSubmissions = angular.copy rankedSubmissions
  rank               = rank - 1 # We're in zero-index land

  orderedRanks = createOrderedRankList rankedSubmissions, numberOfRanks
  currentRank  = orderedRanks.indexOf id

  if currentRank >= 0
    orderedRanks.splice currentRank, 1, null

  orderedRanks.splice rank, 0, id

  orderedRanks      = removeBlankAfterN orderedRanks, rank
  rankedSubmissions = []

  orderedRanks.forEach (id, index) ->
    if id != null && index < numberOfRanks
      rankedSubmission =
        rank: index + 1 # Convert back to one-index land
        submissionId: id

      rankedSubmissions.push rankedSubmission

  rankedSubmissions

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

  file.threads?[0]?.messages.forEach (message) ->
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

decorateRankListWithSubmissions = (ranks = [], submissions = []) ->
  submissions.forEach (submission) ->
    if submission.rank != ''
      submissionRank = submission.rank - 1
      if submissionRank < ranks.length
        ranks[submissionRank].avatarUrl = submission.submitter.avatar
        ranks[submissionRank].id = submission.id
        ranks[submissionRank].handle = submission.submitter.handle

  ranks

makeEmptyRankList = (rankNames) ->
  ranks = []

  for i in [1..rankNames.length] by 1
    ranks.push
      value    : i
      label    : rankNames[i - 1]
      id       : null
      avatarUrl: null

  ranks

SubmissionsHelpers = ->
  submissionsHelpers =
    findInCollection: findInCollection
    createOrderedRankList: createOrderedRankList
    removeBlankAfterN: removeBlankAfterN
    updateRankedSubmissions: updateRankedSubmissions
    decorateSubmissionWithRank: decorateSubmissionWithRank
    decorateSubmissionsWithRanks: decorateSubmissionsWithRanks
    decorateFileWithMessageCounts: decorateFileWithMessageCounts
    decorateSubmissionWithMessageCounts: decorateSubmissionWithMessageCounts
    decorateSubmissionsWithMessageCounts: decorateSubmissionsWithMessageCounts
    sortSubmissions: sortSubmissions
    decorateRankListWithSubmissions: decorateRankListWithSubmissions
    makeEmptyRankList: makeEmptyRankList

  submissionsHelpers

SubmissionsHelpers.$inject = []

angular.module('appirio-tech-submissions').factory 'SubmissionsHelpers', SubmissionsHelpers