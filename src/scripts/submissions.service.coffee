'use strict'

srv = (helpers, $rootScope, StepsAPIService, SubmissionsAPIService, MessagesAPIService) ->
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

  optimisticCreate = (options) ->
    collection = options.collection
    item = options.item
    apiCall = options.apiCall
    eventName = options.eventName
    handleResponse = options.handleResponse != false

    # Send our clean model
    request = apiCall(item)

    # Apply our metadata
    item.creating = true

    collection.push item

    # Emit our change event
    $rootScope.$emit eventName

    # If our request is successful, update our model
    request.then (response) ->
      if handleResponse
        for name, prop of response
          item[name] = response[name]

    # If our request fails, restore our cached model and apply an error state
    request.catch (err) ->
      item.err = err

    # Finally, remove our updating state and emit another change event
    request.finally () ->
      item.creating = false
      $rootScope.$emit eventName

  # Used for caching
  currentProjectId = null
  currentStepId = null

  submissionsService =
    submissions: []

  submissionsService.fetch = (projectId, stepId) ->
    if projectId != currentProjectId || stepId != currentStepId
      submissionsService.submissions = []
      currentProjectId = projectId
      currentStepId = stepId

    params =
      projectId: projectId
      stepId   : stepId

    SubmissionsAPIService.query(params).$promise.then (response) ->
      submissionsService.submissions = response
      $rootScope.$emit 'submissionsService.submissions:changed'

  submissionsService.markMessagesAsRead = (submissionId, fileId, userId) ->
    currentSubmissions = helpers.findInCollection submissionsService.submissions, 'id', submissionId
    currentFile        = helpers.findInCollection currentSubmissions.files, 'id', fileId
    messages           = currentFile.threads[0]?.messages

    messages.forEach (message) ->
      if !message.read
        apiCall = () ->
          params =
            id: message.id

          body =
            read: true
            subscriberId: userId

          MessagesAPIService.put(params, body).$promise

        updateOptions =
          model: message
          updates:
            read: true
          apiCall: apiCall
          eventName: 'submissionsService.submissions:changed'
          handleResponse: false

        optimisticUpdate updateOptions

  submissionsService.sendMessage = (submissionId, fileId, message, userId) ->
    currentSubmissions = helpers.findInCollection submissionsService.submissions, 'id', submissionId
    currentFile        = helpers.findInCollection currentSubmissions.files, 'id', fileId
    messages           = currentFile.threads[0]?.messages
    now                = new Date()

    newMessage =
      publisherId: userId
      body: message
      createdAt: now.toISOString()
      read: true

    apiCall = (message) ->
      MessagesAPIService.save(message).$promise

    createOptions =
      collection: messages
      item: newMessage
      apiCall: apiCall
      eventName: 'submissionsService.submissions:changed'

    optimisticCreate createOptions

  submissionsService

srv.$inject = ['SubmissionsHelpers', '$rootScope', 'StepsAPIService', 'SubmissionsAPIService', 'MessagesAPIService']

angular.module('appirio-tech-submissions').factory 'SubmissionsService', srv