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

submissionWithRank = (submission, rankedSubmissions = []) ->
  submission.rank = ''
  rankedSubmissions.forEach (rankedSubmission) ->
    if submission.id == rankedSubmission.submissionId
      submission.rank = rankedSubmission.rank

  submission

submissionsWithRanks = (submissions, rankedSubmissions = []) ->
  submissions.map (submission) ->
    submissionWithRank submission, rankedSubmissions

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

submissionsWithOwnership = (submissions, userId) ->
  submissions.map (submission) ->
    angular.merge {}, submission,
      belongsToUser: submission.submitter.id == userId

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

populatedRankList = (rankList, submissions = []) ->
  submissions.forEach (submission) ->
    if submission.rank != ''
      submissionRank = submission.rank - 1
      if submissionRank < rankList.length
        angular.extend rankList[submissionRank],
         avatarUrl     : submission.submitter.avatar
         id            : submission.id
         handle        : submission.submitter.handle
         belongsToUser : submission.belongsToUser

  rankList

makeEmptyRankList = (rankNames) ->
  ranks = []

  for i in [1..rankNames.length] by 1
    ranks.push
      value    : i
      label    : rankNames[i - 1]
      id       : null
      avatarUrl: null

  ranks

highestRank = (rankList, userId) ->
  for i in [0...rankList.length] by 1
    if rankList[i].id == userId
      return rankList[i].label

  null

statuses = [
  'PLACEHOLDER'
  'SCHEDULED'
  'OPEN'
  'OPEN_LATE'
  'REVIEWING'
  'REVIEWING_LATE'
  'CLOSED'
]

statusOf = (step) ->
  now              = Date.now()
  startsAt         = new Date(step.startsAt)
  submissionsDueBy = new Date(step.details.submissionsDueBy)
  endsAt           = new Date(step.endsAt)

  hasSubmissions   = step.details.rankedSubmissions?.length > 0
  closed = step.details.customerConfirmedRanks || step.details.customerAcceptedFixes

  if closed
    'CLOSED'
  else if now > endsAt
    'REVIEWING_LATE'
  else if hasSubmissions
    'REVIEWING'
  else if now > submissionsDueBy
    'OPEN_LATE'
  else if now > startsAt
    'OPEN'
  else
    'SCHEDULED'

statusValueOf = (status) ->
  statuses.indexOf status

SubmissionsHelpers = ->
  findInCollection             : findInCollection
  createOrderedRankList        : createOrderedRankList
  removeBlankAfterN            : removeBlankAfterN
  updateRankedSubmissions      : updateRankedSubmissions
  submissionWithRank           : submissionWithRank
  submissionsWithRanks         : submissionsWithRanks
  fileWithMessageCounts        : fileWithMessageCounts
  submissionWithMessageCounts  : submissionWithMessageCounts
  submissionsWithMessageCounts : submissionsWithMessageCounts
  submissionsWithOwnership     : submissionsWithOwnership
  sortSubmissions              : sortSubmissions
  populatedRankList            : populatedRankList
  makeEmptyRankList            : makeEmptyRankList
  highestRank                  : highestRank
  statusOf                     : statusOf
  statusValueOf                : statusValueOf

SubmissionsHelpers.$inject = []

angular.module('appirio-tech-submissions').factory 'SubmissionsHelpers', SubmissionsHelpers