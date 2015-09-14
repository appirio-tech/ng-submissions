'use strict'

srv = ($rootScope, helpers, StepsAPIService, O) ->
  # Used for caching
  currentProjectId = null

  stepsService =
    steps: []

  emitUpdates = ->
    $rootScope.$emit 'stepsService.steps:changed'

  stepsService.fetch = (projectId) ->
    if projectId != currentProjectId
      stepsService.steps = []
      currentProjectId = projectId

    apiCall = () ->
      params =
        projectId: projectId

      StepsAPIService.query(params).$promise

    O.fetch {
      collection: stepsService.steps
      apiCall: apiCall
      updateCallback: emitUpdates
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

    O.update {
      model: step
      updates:
        rankedSubmissions: rankedSubmissions
      apiCall: apiCall
      updateCallback: emitUpdates
    }

  stepsService.confirmRanks = (projectId, stepId) ->
    step = helpers.findInCollection stepsService.steps, 'id', stepId

    apiCall = (step) ->
      params =
        projectId: projectId
        stepId   : stepId

      StepsAPIService.confirmRanks(params, step).$promise

    O.update {
      model: step
      updates:
        customerConfirmedRanks: true
      apiCall: apiCall
      updateCallback: emitUpdates
    }

  stepsService.acceptFixes = (projectId, stepId) ->
    step = helpers.findInCollection stepsService.steps, 'id', stepId

    apiCall = (step) ->
      params =
        projectId: projectId
        stepId   : stepId

      StepsAPIService.confirmRanks(params, step).$promise

    O.update {
      model: step
      updates:
        customerAcceptedFixes: true
      apiCall: apiCall
      updateCallback: emitUpdates
    }

  stepsService

srv.$inject = ['$rootScope', 'SubmissionsHelpers', 'StepsAPIService', 'Optimist']

angular.module('appirio-tech-submissions').factory 'StepsService', srv