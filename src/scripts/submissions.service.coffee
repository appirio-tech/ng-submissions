'use strict'

mockSteps = [
  {
    "id": "abc",
    "stepType": "designConcepts",
    "startsAt": "20150129T1355+00:00",
    "endsAt": "20150129T1355+00:00",
    "completed": null,
    "numberOfRanks": 3,
    "rankedSubmissions": [
      {
        "rank": 1,
        "submissionId": "abc"
      }
    ],
    "customerConfirmedRanks": null
  },
  {
    "id": "def",
    "stepType": "completeDesigns",
    "startsAt": "20150129T1355+00:00",
    "endsAt": "20150129T1355+00:00",
    "completed": null,
    "numberOfRanks": 3,
    "rankedSubmissions": [],
    "customerConfirmedRanks": null
  },
  {
    "id": "ghi",
    "stepType": "finalFixes",
    "startsAt": "20150129T1355+00:00",
    "endsAt": "20150129T1355+00:00",
    "completed": null,
    "customerAcceptedFixes": null,
  }
]

mockSubmissions = [
  {
    "id": "abc",
    "createdAt": "2015-05-05T20:53:41.467Z",
    "downloadUrl": "http://placehold.it/400x800",
    "submitter": {
      "id": "abc",
      "handle": "Darth Vader",
      "avatar": "http://www.topcoder.com/i/m/cardiboy_big.jpg"
    },
    "files": [
      {
        "id": "abc",
        "name": "super-generic-file-1.jpg",
        "images": {
          "thumbnail": "http://placehold.it/50x40",
          "small": "http://placehold.it/160x130",
          "large": "http://placehold.it/200x400",
          "full": "http://placehold.it/400x800"
        },
        "threads": [
          {
            "id": "guid-or-identifier-for-thread-object",
            "subject": "Messages for file",
            "unreadCount": 1,
            "messages": [
              {
                "id": "guid-or-identifier-for-message-object",
                "threadId": "guid-or-identifier-for-thread-object",
                "body": "Some insightful comment about this file.",
                "createdAt": "2015-11-azax05T08:15:30-05:00",
                "publisherId": "sselvadurai",
                "read": false
              }
            ]
          }
        ]
      },
      {
        "id": "def",
        "name": "super-generic-file-2.jpg",
        "images": {
          "thumbnail": "http://placehold.it/50x40",
          "small": "http://placehold.it/160x130",
          "large": "http://placehold.it/200x400",
          "full": "http://placehold.it/400x800"
        },
        "threads": [
          {
            "id": "guid-or-identifier-for-thread-object",
            "subject": "Messages for file",
            "unreadCount": 2,
            "messages": [
              {
                "id": "abc",
                "threadId": "guid-or-identifier-for-thread-object",
                "body": "Some insightful comment about this file.",
                "createdAt": "2015-11-05T08:15:30-05:00",
                "publisherId": "sselvadurai",
                "read": false
              },
              {
                "id": "def",
                "threadId": "guid-or-identifier-for-thread-object",
                "body": "Another deeply insightful comment about this file.",
                "createdAt": "2015-11-05T08:15:30-05:00",
                "publisherId": "aselbie",
                "read": false
              }
            ]
          }
        ]
      },
      {
        "id": "ghi",
        "name": "super-generic-file-3.jpg",
        "images": {
          "thumbnail": "http://placehold.it/50x40",
          "small": "http://placehold.it/160x130",
          "large": "http://placehold.it/200x400",
          "full": "http://placehold.it/400x800"
        },
        "threads": [
          {
            "id": "guid-or-identifier-for-thread-object",
            "subject": "Messages for file",
            "unreadCount": 0,
            "messages": [
              {
                "id": "guid-or-identifier-for-message-object",
                "threadId": "guid-or-identifier-for-thread-object",
                "body": "Some insightful comment about this file.",
                "createdAt": "2015-11-05T08:15:30-05:00",
                "publisherId": "sselvadurai",
                "read": true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "def",
    "createdAt": "2015-05-05T20:53:41.467Z",
    "downloadUrl": "http://placehold.it/400x800",
    "submitter": {
      "id": "abc",
      "handle": "Darth Vader",
      "avatar": "http://www.topcoder.com/i/m/cardiboy_big.jpg"
    },
    "files": [
      {
        "id": "abc",
        "name": "super-generic-file-1.jpg",
        "images": {
          "thumbnail": "http://placehold.it/50x40",
          "small": "http://placehold.it/160x130",
          "large": "http://placehold.it/200x400",
          "full": "http://placehold.it/400x800"
        },
        "threads": [
          {
            "id": "guid-or-identifier-for-thread-object",
            "subject": "Messages for file",
            "unreadCount": 1,
            "messages": [
              {
                "id": "guid-or-identifier-for-message-object",
                "threadId": "guid-or-identifier-for-thread-object",
                "body": "Some insightful comment about this file.",
                "createdAt": "2015-11-azax05T08:15:30-05:00",
                "publisherId": "sselvadurai",
                "read": false
              }
            ]
          }
        ]
      },
      {
        "id": "def",
        "name": "super-generic-file-2.jpg",
        "images": {
          "thumbnail": "http://placehold.it/50x40",
          "small": "http://placehold.it/160x130",
          "large": "http://placehold.it/200x400",
          "full": "http://placehold.it/400x800"
        },
        "threads": [
          {
            "id": "guid-or-identifier-for-thread-object",
            "subject": "Messages for file",
            "unreadCount": 2,
            "messages": [
              {
                "id": "abc",
                "threadId": "guid-or-identifier-for-thread-object",
                "body": "Some insightful comment about this file.",
                "createdAt": "2015-11-05T08:15:30-05:00",
                "publisherId": "sselvadurai",
                "read": false
              },
              {
                "id": "def",
                "threadId": "guid-or-identifier-for-thread-object",
                "body": "Another deeply insightful comment about this file.",
                "createdAt": "2015-11-05T08:15:30-05:00",
                "publisherId": "aselbie",
                "read": false
              }
            ]
          }
        ]
      },
      {
        "id": "ghi",
        "name": "super-generic-file-3.jpg",
        "images": {
          "thumbnail": "http://placehold.it/50x40",
          "small": "http://placehold.it/160x130",
          "large": "http://placehold.it/200x400",
          "full": "http://placehold.it/400x800"
        },
        "threads": [
          {
            "id": "guid-or-identifier-for-thread-object",
            "subject": "Messages for file",
            "unreadCount": 0,
            "messages": [
              {
                "id": "guid-or-identifier-for-message-object",
                "threadId": "guid-or-identifier-for-thread-object",
                "body": "Some insightful comment about this file.",
                "createdAt": "2015-11-05T08:15:30-05:00",
                "publisherId": "sselvadurai",
                "read": true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "ghi",
    "createdAt": "2015-05-05T20:53:41.467Z",
    "downloadUrl": "http://placehold.it/400x800",
    "submitter": {
      "id": "abc",
      "handle": "Darth Vader",
      "avatar": "http://www.topcoder.com/i/m/cardiboy_big.jpg"
    },
    "files": [
      {
        "id": "abc",
        "name": "super-generic-file-1.jpg",
        "images": {
          "thumbnail": "http://placehold.it/50x40",
          "small": "http://placehold.it/160x130",
          "large": "http://placehold.it/200x400",
          "full": "http://placehold.it/400x800"
        },
        "threads": [
          {
            "id": "guid-or-identifier-for-thread-object",
            "subject": "Messages for file",
            "unreadCount": 1,
            "messages": [
              {
                "id": "guid-or-identifier-for-message-object",
                "threadId": "guid-or-identifier-for-thread-object",
                "body": "Some insightful comment about this file.",
                "createdAt": "2015-11-azax05T08:15:30-05:00",
                "publisherId": "sselvadurai",
                "read": false
              }
            ]
          }
        ]
      },
      {
        "id": "def",
        "name": "super-generic-file-2.jpg",
        "images": {
          "thumbnail": "http://placehold.it/50x40",
          "small": "http://placehold.it/160x130",
          "large": "http://placehold.it/200x400",
          "full": "http://placehold.it/400x800"
        },
        "threads": [
          {
            "id": "guid-or-identifier-for-thread-object",
            "subject": "Messages for file",
            "unreadCount": 2,
            "messages": [
              {
                "id": "abc",
                "threadId": "guid-or-identifier-for-thread-object",
                "body": "Some insightful comment about this file.",
                "createdAt": "2015-11-05T08:15:30-05:00",
                "publisherId": "sselvadurai",
                "read": false
              },
              {
                "id": "def",
                "threadId": "guid-or-identifier-for-thread-object",
                "body": "Another deeply insightful comment about this file.",
                "createdAt": "2015-11-05T08:15:30-05:00",
                "publisherId": "aselbie",
                "read": false
              }
            ]
          }
        ]
      },
      {
        "id": "ghi",
        "name": "super-generic-file-3.jpg",
        "images": {
          "thumbnail": "http://placehold.it/50x40",
          "small": "http://placehold.it/160x130",
          "large": "http://placehold.it/200x400",
          "full": "http://placehold.it/400x800"
        },
        "threads": [
          {
            "id": "guid-or-identifier-for-thread-object",
            "subject": "Messages for file",
            "unreadCount": 0,
            "messages": [
              {
                "id": "guid-or-identifier-for-message-object",
                "threadId": "guid-or-identifier-for-thread-object",
                "body": "Some insightful comment about this file.",
                "createdAt": "2015-11-05T08:15:30-05:00",
                "publisherId": "sselvadurai",
                "read": true
              }
            ]
          }
        ]
      }
    ]
  }
]

findStepByType = (steps, stepType) ->
  for index, step of steps
    if step.stepType == stepType
      return step

  null

findStepById = (steps, stepId) ->
  for index, step of steps
    if step.id == stepId
      return step

  null

removeBlankAfterN = (array, n) ->
  for i in [n...array.length] by 1
    if array[i] == null
      array.splice i, 1
      return array

  array

createOrderedRankList = (rankedSubmissions, numberOfRanks) ->
  orderedRanks = []

  for i in [0...numberOfRanks] by 1
    orderedRanks[i] = null

  rankedSubmissions.forEach (submission) ->
    orderedRanks[submission.rank - 1] = submission.submissionId

  orderedRanks

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
        rank: (parseInt(index) + 1) + '' # Convert back to one-index land
        submissionId: id

      rankedSubmissions.push rankedSubmission

  rankedSubmissions

decorateSubmissionsWithRanks = (submissions, rankedSubmissions = []) ->
  submissions.forEach (submission) ->
    submission.rank = ''
    rankedSubmissions.forEach (rankedSubmission) ->
      if submission.id == rankedSubmission.submissionId
        submission.rank = rankedSubmission.rank

  submissions

decorateSubmissionsWithUnreadCounts = (submissions) ->
  submissions.forEach (submission) ->
    submissionTotal = 0
    submissionUnread = 0
    submission.files.forEach (file) ->
      fileTotal = 0
      fileUnread = 0

      file.threads[0].messages.forEach (message) ->
        fileTotal = submissionTotal + 1
        submissionTotal = submissionTotal + 1
        if !message.read
          fileUnread = submissionUnread + 1
          submissionUnread = submissionUnread + 1

      file.totalMessages = fileTotal
      file.unreadMessages = fileUnread

    submission.totalMessages = submissionTotal
    submission.unreadMessages = submissionUnread

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

srv = ($q) ->

  currentProjectId = null
  currentStepId = null

  submissionsService =
    steps: []
    submissions: []
    findStepByType: findStepByType
    decorateSubmissionsWithRanks: decorateSubmissionsWithRanks
    decorateSubmissionsWithUnreadCounts: decorateSubmissionsWithUnreadCounts
    sortSubmissions: sortSubmissions

  submissionsService.getSteps = (projectId) ->
    deferred = $q.defer()

    if projectId == currentProjectId
      submissionsService.steps = []
      currentProjectId = projectId

    submissionsService.steps = mockSteps

    deferred.resolve()
    deferred.promise

  submissionsService.getSubmissions = (projectId, stepId) ->
    deferred = $q.defer()

    if projectId == currentProjectId
      submissionsService.steps = []
      currentProjectId = projectId

    if stepId == currentStepId
      submissionsService.submissions = []
      currentStepId = stepId

    submissionsService.submissions = mockSubmissions

    deferred.resolve()
    deferred.promise

  submissionsService.updateRank = (stepId, id, rank) ->
    currentStep       = findStepById submissionsService.steps, stepId
    numberOfRanks     = currentStep.numberOfRanks
    rankedSubmissions = currentStep.rankedSubmissions
    rankedSubmissions = updateRankedSubmissions rankedSubmissions, numberOfRanks, id, rank
 
    currentStep.rankedSubmissions = rankedSubmissions

  submissionsService.updateRankRemote = () ->
    deferred = $q.defer()

    deferred.resolve()
    deferred.promise

  submissionsService.confirmRanks = (stepId) ->
    step = findStepById submissionsService.steps, stepId
    step.customerConfirmedRanks = true

  submissionsService.confirmRanksRemote = () ->
    deferred = $q.defer()

    deferred.resolve()
    deferred.promise

  submissionsService.acceptFixes = (stepId) ->
    step = findStepById submissionsService.steps, stepId
    step.customerAcceptedFixes = true

  submissionsService.acceptFixesRemote = () ->
    deferred = $q.defer()

    deferred.resolve()
    deferred.promise

  submissionsService

srv.$inject = ['$q']

angular.module('appirio-tech-submissions').factory 'SubmissionsService', srv