'use strict'

srv = ($rootScope, helpers, StepsAPIService, OptimistCollection) ->
  currentProjectId = null

  createStepCollection = ->
    newSteps = new OptimistCollection
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

      StepsAPIService.patch(params, updates).$promise

    step.update
      updates: updates
      apiCall: apiCall

  updateRank = (projectId, stepId, submissionId, rank) ->
    step              = steps.findOneWhere { id: stepId }
    stepData          = step.get()
    numberOfRanks     = stepData.details.numberOfRanks
    rankedSubmissions = stepData.details.rankedSubmissions
    rankedSubmissions = helpers.updateRankedSubmissions rankedSubmissions, numberOfRanks, submissionId, rank

    updates =
      details:
        rankedSubmissions: rankedSubmissions

    updateStep projectId, stepId, step, updates

  confirmRanks = (projectId, stepId) ->
    step = steps.findOneWhere { id: stepId }
    updates =
      details:
        customerConfirmedRanks: true

    updateStep projectId, stepId, step, updates

  acceptFixes = (projectId, stepId) ->
    step = steps.findOneWhere { id: stepId }
    updates =
      details:
        customerAcceptedFixes: true

    updateStep projectId, stepId, step, updates

  get          : get
  fetch        : fetch
  updateRank   : updateRank
  confirmRanks : confirmRanks
  acceptFixes  : acceptFixes

srv.$inject = ['$rootScope', 'SubmissionsHelpers', 'StepsAPIService', 'OptimistCollection']

angular.module('appirio-tech-submissions').factory 'StepsService', srv