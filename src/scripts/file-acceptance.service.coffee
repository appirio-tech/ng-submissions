'use strict'

srv = (FileAcceptanceAPIService, FinalFixesAPIService) ->

  srv.toggleAcceptFile = (file, workId) ->
    params =
      fileId: file.id
      workId: workId
    resource = null

    if file.accepted
      body =
        "accepted": false
      # console.log('file accepted', file)
      resource = FileAcceptanceAPIService.put params, body
      #TODO: PUT file.id, accepted = false
    else
      body =
        "accepted": true
      resource = FileAcceptanceAPIService.put params, body
       #TODO: PUT file.id, accepted = true
    resource

  srv.approveAll = (files) ->
    files.forEach (file) ->
      #TODO: PUT file.id, accepted = true

  srv.unapproveAll = (files) ->
    files.forEach (file) ->
      #TODO: PUT file.id, accepted = false

  srv.confirmApproval = (workId)->
    params =
      workId: workId
    body =
      confirmed: true
    #Todo: PUT confirmed w/ date
    FinalFixesAPIService.put params, body

  srv

srv.$inject = ['FileAcceptanceAPIService', 'FinalFixesAPIService']

angular.module('appirio-tech-submissions').factory 'FileAcceptanceService', srv