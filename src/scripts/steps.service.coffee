'use strict'

srv = (helpers, StepsAPIService, ModelHelpers) ->
  # Used for caching
  currentProjectId = null

  stepsService =
    steps: []

  stepsService.fetch = (projectId) ->
    if projectId != currentProjectId
      stepsService.steps = []
      currentProjectId = projectId

    apiCall = () ->
      params =
        projectId: projectId

      StepsAPIService.query(params).$promise

    ModelHelpers.fetch {
      collection: stepsService.steps
      apiCall: apiCall
      eventName: 'stepsService.steps:changed'
    }

  stepsService.updateRank = (projectId, stepId, submissionId, rank) ->
    step              = helpers.findInCollection stepsService.steps, 'id', stepId
    numberOfRanks     = step.numberOfRanks
    rankedSubmissions = step.rankedSubmissions
    rankedSubmissions = helpers.updateRankedSubmissions rankedSubmissions, numberOfRanks, submissionId, rank

    apiCall = (step) ->
      params =
        projectId: projectId
        stepId   : stepId

      StepsAPIService.updateRanks(params, step).$promise

    ModelHelpers.update {
      model: step
      updates:
        rankedSubmissions: rankedSubmissions
      apiCall: apiCall
      eventName: 'stepsService.steps:changed'
    }

  stepsService.confirmRanks = (projectId, stepId) ->
    step = helpers.findInCollection stepsService.steps, 'id', stepId

    apiCall = (step) ->
      params =
        projectId: projectId
        stepId   : stepId

      StepsAPIService.confirmRanks(params, step).$promise

    ModelHelpers.update {
      model: step
      updates:
        customerConfirmedRanks: true
      apiCall: apiCall
      eventName: 'stepsService.steps:changed'
    }

  stepsService.acceptFixes = (projectId, stepId) ->
    step = helpers.findInCollection stepsService.steps, 'id', stepId

    apiCall = (step) ->
      params =
        projectId: projectId
        stepId   : stepId

      StepsAPIService.confirmRanks(params, step).$promise

    ModelHelpers.update {
      model: step
      updates:
        customerAcceptedFixes: true
      apiCall: apiCall
      eventName: 'stepsService.steps:changed'
    }

  stepsService

srv.$inject = ['SubmissionsHelpers', 'StepsAPIService', 'ModelHelpers']

angular.module('appirio-tech-submissions').factory 'StepsService', srv