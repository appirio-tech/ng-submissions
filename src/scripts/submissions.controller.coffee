'use strict'

SubmissionsController = ($scope, $state, SubmissionAPIService, SubmissionDetailAPIService, dragulaService) ->
  vm             = this
  steps          = []
  submissions    = []
  config         = {}

  if $scope.stepType == 'designConcepts'
    config.stepType = 'designConcepts'
    config.stepName = 'Design Concepts'

    config.prevStepType = null
    config.prevStepName = null
    config.prevStepState = null

    config.nextStepType = 'completeDesigns'
    config.nextStepName = 'Complete Designs'
    config.nextStepState = 'complete-designs'

    config.timeline = [ 'active', '', '' ]
    config.defaultStatus = 'scheduled'

  if $scope.stepType == 'completeDesigns'
    config.stepType = 'completeDesigns'
    config.stepName = 'Complete Designs'

    config.prevStepType = 'designConcepts'
    config.prevStepName = 'Design Concepts'
    config.prevStepState = 'design-concepts'

    config.nextStepType = 'finalFixes'
    config.nextStepName = 'Final Fixes'
    config.nextStepState = 'final-fixes'

    config.timeline = [ '', 'active', '' ]
    config.defaultStatus = 'scheduled'

  config.rankNames = [
    '1st Place'
    '2nd Place'
    '3rd Place'
    '4th Place'
    '5th Place'
    '6th Place'
    '7th Place'
    '8th Place'
    '9th Place'
    '10th Place'
  ]

  vm.loaded      = false
  vm.timeline    = config.timeline
  vm.stepName    = config.stepName
  vm.status      = config.defaultStatus
  vm.allFilled   = false
  vm.submissions = []
  vm.ranks       = []
  vm.projectId   = $scope.projectId
  vm.stepId      = $scope.stepId

  ##############
  # vm Methods #
  ##############

  vm.handleRankSelect = (submission) ->
    updateRank submission.id, submission.rank

  vm.confirmRanks = () ->
    confirmRanks()

  ##############
  # Activation #
  ##############

  activate = ->
    getSteps()
    getSubmissions()
    onChange(steps, submissions)

  ###################
  # Dragula helpers #
  ###################

  isDraggable = (el, source, handle) ->
    source.classList.contains 'has-avatar'

  dragulaOptions =
    moves: isDraggable
    copy: true

  dragulaService.options $scope, 'ranked-submissions', dragulaOptions

  handleRankDrop = (el, target, source) ->
    if !source
      return false

    movedSubmissionId = target[0].dataset.id
    rankToAssign = (parseInt(source[0].dataset.rank) + 1) + ''

    updateRank movedSubmissionId, rankToAssign

  $scope.$on 'ranked-submissions.drop', handleRankDrop

  ####################
  # Helper functions #
  ####################

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

  updateRank = (id, rank) ->
    currentStep        = findStepByType(steps, config.stepType)
    rankedSubmissions  = angular.copy currentStep.rankedSubmissions
    rank               = rank - 1 # We're in zero-index land

    orderedRanks = createOrderedRankList rankedSubmissions, currentStep.numberOfRanks
    currentRank  = orderedRanks.indexOf id

    if currentRank >= 0
      orderedRanks.splice currentRank, 1, null

    orderedRanks.splice rank, 0, id

    orderedRanks      = removeBlankAfterN orderedRanks, rank
    rankedSubmissions = []

    orderedRanks.forEach (id, index) ->
      if id != null && index < currentStep.numberOfRanks
        rankedSubmission =
          rank: (parseInt(index) + 1) + '' # Convert back to one-index land
          submissionId: id

        rankedSubmissions.push rankedSubmission
 
    currentStep.rankedSubmissions = rankedSubmissions
    onChange(steps, submissions)

  makeEmptyRankList = (rankNames) ->
    ranks = []

    for i in [1..rankNames.length] by 1
      ranks.push
        value    : i
        label    : rankNames[i - 1]
        id       : null
        avatarUrl: null

    ranks

  decorateRankListWithSubmissions = (ranks = [], submissions = []) ->
    submissions.forEach (submission) ->
      if submission.rank != ''
        submissionRank = submission.rank - 1
        if submissionRank < ranks.length
          ranks[submissionRank].avatarUrl = submission.submitter.avatar
          ranks[submissionRank].id = submission.id

    ranks

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
        file.threads[0].messages.forEach (message) ->
          submissionTotal = submissionTotal + 1
          if !message.read
            submissionUnread = submissionUnread + 1

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

  findStepByType = (steps, stepType) ->
    for index, step of steps
      if step.stepType == stepType
        return step

    null

  onChange = (steps, submissions) ->
    if steps.length <= 0 || submissions.length <= 0
      return null

    # Handle steps updates
    currentStep = findStepByType steps, config.stepType
    prevStep = findStepByType steps, config.prevStepType
    nextStep = findStepByType steps, config.nextStepType

    vm.startsAt = currentStep.startsAt
    vm.endsAt = currentStep.endsAt

    stepParams =
      projectId: $scope.projectId
      stepId: $scope.stepId

    vm.prevStepRef = $state.href config.prevStepState, stepParams
    vm.nextStepRef = $state.href config.nextStepState, stepParams

    # Handle submissions updates
    vm.submissions = angular.copy submissions
    vm.submissions = decorateSubmissionsWithRanks vm.submissions, currentStep.rankedSubmissions
    vm.submissions = sortSubmissions vm.submissions
    vm.submissions = decorateSubmissionsWithUnreadCounts vm.submissions

    # Handle ranks updates
    vm.rankNames = config.rankNames.slice 0, currentStep.numberOfRanks
    vm.ranks     = makeEmptyRankList(vm.rankNames)
    vm.ranks     = decorateRankListWithSubmissions vm.ranks, vm.submissions

    vm.allFilled = currentStep.rankedSubmissions.length == currentStep.numberOfRanks

    # Handle status updates
    vm.status = config.defaultStatus

    if Date.now() > new Date(currentStep.startsAt)
      vm.status = 'open'

    if currentStep.customerConfirmedRanks
      vm.status = 'closed'

  #################
  # Service calls #
  #################

  getSteps = () ->
    steps = [
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

    vm.steps = steps
    return steps

    params =
      workId: $scope.workId
      phase : $scope.phase

    resource = SubmissionAPIService.get params

    resource.$promise.then (res) ->
      applySubmissionsData res

    resource.$promise.catch (res) ->
      # TODO: do something intelligent

    resource.$promise.finally ->
      vm.loaded = true

  getSubmissions = () ->
    submissions = [
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

    vm.loaded = true
    submissions = submissions
    return submissions

    params =
      workId: $scope.workId
      phase : $scope.phase

    resource = SubmissionAPIService.get params

    resource.$promise.then (res) ->
      onChange()

    resource.$promise.finally ->
      vm.loaded = true

  updateRanks = (submission) ->
    params =
      workId       : $scope.workId
      submissionId : submission.id

    resource = SubmissionDetailAPIService.updateRank params, submission

  confirmRanks = () ->
    params =
      workId: $scope.workId
      phase : $scope.phase

    SubmissionAPIService.confirm params

  activate()

  vm

SubmissionsController.$inject = ['$scope', '$state', 'SubmissionAPIService', 'SubmissionDetailAPIService', 'dragulaService']

angular.module('appirio-tech-submissions').controller 'SubmissionsController', SubmissionsController
