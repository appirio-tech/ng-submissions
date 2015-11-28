'use strict'

srv = ($rootScope, StepsAPIService, OptimistCollection) ->
  currentProjectId = null
  stepsByProject   = {}

  statuses = [
    'PLACEHOLDER'
    'SCHEDULED'
    'OPEN'
    'OPEN_LATE'
    'REVIEWING'
    'REVIEWING_LATE'
    'CLOSED'
  ]

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

  statusOf = (step) ->
    if step.stepType == 'designConcepts' || step.stepType == 'completeDesigns'
      now              = Date.now()
      startsAt         = new Date(step.startsAt)
      submissionsDueBy = new Date(step.details.submissionsDueBy)
      endsAt           = new Date(step.endsAt)

      hasSubmissions   = step.details.submissionIds?.length > 0
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
    else
      'SCHEDULED'

  statusValueOf = (status) ->
    statuses.indexOf status

  createStepCollection = ->
    newSteps = new OptimistCollection
      updateCallback: ->
        $rootScope.$emit 'StepsService:changed'
      propsToIgnore: ['$promise', '$resolved']

    newSteps

  subscribe = (scope, onChange) ->
    destroyStepsListener = $rootScope.$on 'StepsService:changed', ->
      onChange()

    scope.$on '$destroy', ->
      destroyStepsListener()

    onChange()

  dyanamicProps = (steps) ->
    if angular.isArray steps
      steps.forEach (step) ->
        step.status = statusOf step
        step.statusValue = statusValueOf step.status

    steps

  get = (projectId) ->
    unless stepsByProject[projectId]
      fetch(projectId)

    dyanamicProps stepsByProject[projectId].get()

  getCurrentStep = (projectId) ->
    filter = (step) ->
      step.stepType == 'designConcepts'

    get(projectId).filter(filter)[0]

  getStepById = (projectId, stepId) ->
    filter = (step) ->
      step.id == stepId

    get(projectId).filter(filter)[0]

  fetch = (projectId) ->
    stepsByProject[projectId] = createStepCollection()
    currentProjectId = projectId

    apiCall = () ->
      params =
        projectId: projectId

      StepsAPIService.query(params).$promise

    stepsByProject[projectId].fetch
      apiCall: apiCall

  updateStep = (projectId, stepId, step, updates) ->
    apiCall = (step) ->
      params =
        projectId: projectId
        stepId   : stepId

      StepsAPIService.patch(params, updates).$promise

    step.update
      updates: updates
      apiCall: apiCall

  updateRank = (projectId, stepId, submissionId, rank) ->
    step              = stepsByProject[projectId].findOneWhere { id: stepId }
    stepData          = step.get()
    numberOfRanks     = stepData.details.numberOfRanks
    rankedSubmissions = stepData.details.rankedSubmissions
    rankedSubmissions = updateRankedSubmissions rankedSubmissions, numberOfRanks, submissionId, rank

    updates =
      details:
        rankedSubmissions: rankedSubmissions

    updateStep projectId, stepId, step, updates

  confirmRanks = (projectId, stepId) ->
    step = stepsByProject[projectId].findOneWhere { id: stepId }
    updates =
      details:
        customerConfirmedRanks: true

    updateStep projectId, stepId, step, updates

  acceptFixes = (projectId, stepId) ->
    step = stepsByProject[projectId].findOneWhere { id: stepId }
    updates =
      details:
        customerAcceptedFixes: true

    updateStep projectId, stepId, step, updates

  name         : 'StepsService'
  get          : get
  subscribe    : subscribe
  getCurrentStep : getCurrentStep
  getStepById : getStepById
  updateRank   : updateRank
  confirmRanks : confirmRanks
  acceptFixes  : acceptFixes

srv.$inject = ['$rootScope', 'StepsAPIService', 'OptimistCollection']

angular.module('appirio-tech-submissions').factory 'StepsService', srv