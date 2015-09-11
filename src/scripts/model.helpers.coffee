'use strict'

srv = ($rootScope) ->

  srv = {}

  nonEnumPropConfig = 
    configurable: true
    writable: true
    enumerable: false

  srv.fetch = (options) ->
    collection = options.collection
    apiCall = options.apiCall
    eventName = options.eventName
    replaceCollection = options.replaceCollection != false

    request = apiCall()

    Object.defineProperty collection, 'updating', nonEnumPropConfig
    Object.defineProperty collection, 'errors', nonEnumPropConfig

    collection.updating = true
    $rootScope.$emit eventName

    request.then (response) ->
      if replaceCollection
        collection.splice 0, collection.length

        for i in [0...response.length] by 1
          collection.push response[i]

    request.catch (err) ->
      collection.errors = err

    request.finally () ->
      collection.updating = false
      $rootScope.$emit eventName
  
  srv.update = (options) ->
    model = options.model
    updates = options.updates
    apiCall = options.apiCall
    eventName = options.eventName
    handleResponse = options.handleResponse != false

    cache = {}

    for name, prop of updates
      cache[name] = model[name]
      model[name] = prop

    if model.updating
      updating = model.updating
      delete model.updating

    if model.errors
      errors = model.errors
      delete model.errors

    request = apiCall(model)

    Object.defineProperty model, 'updating', nonEnumPropConfig
    Object.defineProperty model, 'errors', nonEnumPropConfig

    model.updating = updating || {}
    model.errors = errors || {}

    for name, prop of updates
      model.updating[name] = true

    $rootScope.$emit eventName

    request.then (response) ->
      if handleResponse
        for name, prop of updates
          model[name] = response[name]

    request.catch (err) ->
      for name, prop of cache
        model[name] = prop
        model.errors[name] = err

    request.finally () ->
      model.updating.rankedSubmissions = false
      $rootScope.$emit eventName

  srv.addToCollection = (options) ->
    collection = options.collection
    item = options.item
    apiCall = options.apiCall
    eventName = options.eventName
    handleResponse = options.handleResponse != false

    request = apiCall(item)

    Object.defineProperty item, 'creating', nonEnumPropConfig
    Object.defineProperty item, 'errors', nonEnumPropConfig

    item.creating = true

    collection.push item

    $rootScope.$emit eventName

    request.then (response) ->
      if handleResponse
        for name, prop of response
          item[name] = response[name]

    request.catch (err) ->
      item.errors = err

    request.finally () ->
      item.creating = false
      $rootScope.$emit eventName

  srv

srv.$inject = ['$rootScope']

angular.module('appirio-tech-submissions').factory 'ModelHelpers', srv