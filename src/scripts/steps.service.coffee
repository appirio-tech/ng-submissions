'use strict'

srv = (helpers, $rootScope, StepsAPIService) ->

  # Used for caching
  currentProjectId = null

  stepsService =
    steps: []

  stepsService.fetch = (projectId) ->
    if projectId != currentProjectId
      stepsService.steps = []
      currentProjectId = projectId

    params =
      projectId: projectId

    resource = StepsAPIService.query(params).$promise.then (response) ->
      stepsService.steps = response
      $rootScope.$emit 'stepsService.steps:changed'

  stepsService.updateRank = (stepId, id, rank) ->
    currentStep       = helpers.findInCollection stepsService.steps, 'id', stepId
    numberOfRanks     = currentStep.numberOfRanks
    rankedSubmissions = currentStep.rankedSubmissions
    rankedSubmissions = helpers.updateRankedSubmissions rankedSubmissions, numberOfRanks, id, rank
 
    currentStep.rankedSubmissions = rankedSubmissions
    $rootScope.$emit 'stepsService.steps:changed'

  stepsService.updateRankRemote = (projectId, stepId) ->
    step = helpers.findInCollection stepsService.steps, 'id', stepId

    params =
      projectId: projectId
      stepId   : stepId

    StepsAPIService.updateRanks(params, step).$promise.then (response) ->
      step = response
      $rootScope.$emit 'stepsService.steps:changed'

  stepsService.confirmRanks = (stepId) ->
    step = helpers.findInCollection stepsService.steps, 'id', stepId
    step.customerConfirmedRanks = true
    $rootScope.$emit 'stepsService.steps:changed'

  stepsService.confirmRanksRemote = (projectId, stepId) ->
    step = helpers.findInCollection stepsService.steps, 'id', stepId

    params =
      projectId: projectId
      stepId   : stepId

    StepsAPIService.confirmRanks(params, step).$promise.then (response) ->
      step = response
      $rootScope.$emit 'stepsService.steps:changed'

  stepsService.acceptFixes = (stepId) ->
    step = helpers.findInCollection stepsService.steps, 'id', stepId
    step.customerAcceptedFixes = true
    $rootScope.$emit 'stepsService.steps:changed'

  stepsService.acceptFixesRemote = (projectId, stepId) ->
    step = helpers.findInCollection stepsService.steps, 'id', stepId

    params =
      projectId: projectId
      stepId   : stepId

    StepsAPIService.confirmRanks(params, step).$promise.then (response) ->
      step = response
      $rootScope.$emit 'stepsService.steps:changed'

  stepsService

srv.$inject = ['SubmissionsHelpers', '$rootScope', 'StepsAPIService']

angular.module('appirio-tech-submissions').factory 'StepsService', srv