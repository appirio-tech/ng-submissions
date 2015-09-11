'use strict'

srv = (helpers, $rootScope, StepsAPIService) ->
  optimisticUpdate = (options) ->
    model = options.model
    updates = options.updates
    apiCall = options.apiCall
    eventName = options.eventName
    handleResponse = options.handleResponse != false

    cache = {}

    for name, prop of updates
      cache[name] = model[name]
      model[name] = prop

    # Clean metadata from our model
    if model.updating
      updating = model.updating
      delete model.updating

    if model.errors
      errors = model.errors
      delete model.errors

    # Send our cleaned-up model
    request = apiCall(model)

    # Reapply our metadata
    model.updating = updating || {}
    model.errors = errors || {}

    # Set the model to updating
    for name, prop of updates
      model.updating[name] = true

    # Emit our change event
    $rootScope.$emit eventName

    # If our request is successful, update our model
    request.then (response) ->
      if handleResponse
        for name, prop of updates
          model[name] = response[name]

    # If our request fails, restore our cached model and apply an error state
    request.catch (err) ->
      for name, prop of cache
        model[name] = prop
        model.errors[name] = err

    # Finally, remove our updating state and emit another change event
    request.finally () ->
      model.updating.rankedSubmissions = false
      $rootScope.$emit eventName

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
      console.log response
      $rootScope.$emit 'stepsService.steps:changed'

  stepsService.updateRank = (projectId, stepId, submissionId, rank) ->
    step              = helpers.findInCollection stepsService.steps, 'id', stepId
    numberOfRanks     = step.numberOfRanks
    rankedSubmissions = step.rankedSubmissions
    rankedSubmissions = helpers.updateRankedSubmissions rankedSubmissions, numberOfRanks, submissionId, rank

    apiCall = (model) ->
      params =
        projectId: projectId
        stepId   : stepId

      StepsAPIService.updateRanks(params, model).$promise

    updateOptions =
      model: step
      updates:
        rankedSubmissions: rankedSubmissions
      apiCall: apiCall
      eventName: 'stepsService.steps:changed'

    optimisticUpdate updateOptions

  stepsService.confirmRanks = (projectId, stepId) ->
    step = helpers.findInCollection stepsService.steps, 'id', stepId

    apiCall = (model) ->
      params =
        projectId: projectId
        stepId   : stepId

      StepsAPIService.confirmRanks(params, model).$promise

    updateOptions =
      model: step
      updates:
        customerConfirmedRanks: true
      apiCall: apiCall
      eventName: 'stepsService.steps:changed'

    optimisticUpdate updateOptions

  stepsService.acceptFixes = (projectId, stepId) ->
    step = helpers.findInCollection stepsService.steps, 'id', stepId

    apiCall = (model) ->
      params =
        projectId: projectId
        stepId   : stepId

      StepsAPIService.confirmRanks(params, model).$promise

    updateOptions =
      model: step
      updates:
        customerAcceptedFixes: true
      apiCall: apiCall
      eventName: 'stepsService.steps:changed'

    optimisticUpdate updateOptions

  stepsService

srv.$inject = ['SubmissionsHelpers', '$rootScope', 'StepsAPIService']

angular.module('appirio-tech-submissions').factory 'StepsService', srv