'use strict'

srv = ($injector, $rootScope) ->
  subscribe = (scope, subscriberOnChange, configs) ->
    unless angular.isArray configs[0]
      configs = [ configs ]

    services = configs.map (config) ->
      [instance, method, args...] = config

      instance : instance
      method   : method
      args     : args

    dataOnChange = ->
      data = services.map (service) ->
        service.instance[service.method].apply null, service.args

      itemReady = (acc, item) ->
        empty = if angular.isObject(item) then Object.keys(item).length <= 0 else false
        acc && item && !empty && !item._pending

      if data.reduce itemReady, true
        subscriberOnChange.apply null, data

    services.forEach (service) ->
      destroyServiceListener = $rootScope.$on "#{service.instance.name}:changed:#{service.args.join(':')}", ->
        dataOnChange()

      if scope
        scope.$on '$destroy', ->
          destroyServiceListener()

    dataOnChange()

  subscribe: subscribe

srv.$inject = ['$injector', '$rootScope']

angular.module('appirio-tech-submissions').factory 'DataService', srv