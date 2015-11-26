'use strict'

srv = ($injector) ->
  subscribe = (scope, subscriberOnChange, configs) ->
    unless angular.isArray configs
      configs = [ configs ]

    services = configs.map (config) ->
      [name, method, args...] = config

      instance : $injector.get(name + 'Service')
      method   : method
      args     : args

    dataOnChange = ->
      data = services.map (service) ->
        service.instance[service.method].apply null, service.args

      itemReady = (acc, item) ->
        acc && item && !item._pending

      if data.reduce itemReady, true
        subscriberOnChange.apply null, data

    services.forEach (service) ->
      service.instance.subscribe scope, dataOnChange

  subscribe: subscribe

srv.$inject = ['$injector']

angular.module('appirio-tech-submissions').factory 'DataService', srv