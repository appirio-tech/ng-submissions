'use strict'

srv = ($rootScope, helpers, StepsAPIService, Optimist) ->
  currentProjectId = null

  createStepCollection = ->
    newSteps = new Optimist.Collection
      updateCallback: ->
        $rootScope.$emit 'StepsService:changed'
      propsToIgnore: ['$promise', '$resolved']

    newSteps

  steps = createStepCollection()

  get = ->
    steps.get()

  fetch = (projectId) ->
    if projectId != currentProjectId
      steps = createStepCollection()
      currentProjectId = projectId

    apiCall = () ->
      params =
        projectId: projectId

      StepsAPIService.query(params).$promise

    steps.fetch
      apiCall: apiCall

  updateStep = (projectId, stepId, step, updates) ->
    apiCall = (step) ->
      params =
        projectId: projectId
        stepId   : stepId

      StepsAPIService.updateRanks(params, step).$promise

    step.update
      updates: updates
      apiCall: apiCall

  updateRank = (projectId, stepId, submissionId, rank) ->
    stepsById         = steps.findWhere { id: stepId }
    step              = stepsById[0]
    stepData          = step.get()
    numberOfRanks     = stepData.details.numberOfRanks
    rankedSubmissions = stepData.details.rankedSubmissions
    rankedSubmissions = helpers.updateRankedSubmissions rankedSubmissions, numberOfRanks, submissionId, rank
    debugger
    rankedSubmissionList = rankedSubmissions.map (submission) ->
      submission.submissionId

    updates =
      rankedSubmissions: rankedSubmissionList

    updateStep projectId, stepId, step, updates

  confirmRanks = (projectId, stepId) ->
    stepsById = steps.findWhere { id: stepId }
    step = stepsById[0]
    updates =
      customerConfirmedRanks: true

    updateStep projectId, stepId, step, updates

  acceptFixes = (projectId, stepId) ->
    stepsById = steps.findWhere { id: stepId }
    step = stepsById[0]
    updates =
      customerAcceptedFixes: true

    updateStep projectId, stepId, step, updates

  get          : get
  fetch        : fetch
  updateRank   : updateRank
  confirmRanks : confirmRanks
  acceptFixes  : acceptFixes

srv.$inject = ['$rootScope', 'SubmissionsHelpers', 'StepsAPIService', 'Optimist']

angular.module('appirio-tech-submissions').factory 'StepsService', srv