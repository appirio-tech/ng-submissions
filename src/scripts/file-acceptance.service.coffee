'use strict'

srv = (FileAcceptanceAPIService, FinalFixesAPIService) ->

  srv.toggleAcceptFile = (file, workId) ->
    params =
      fileId: file.id
      workId: workId
    resource = null
    if file.accepted
      resource = FileAcceptanceAPIService.update params
      #TODO: PUT file.id, accepted = false
    else
      resource = FileAcceptanceAPIService.update params
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
    FinalFixesAPIService.update params
    #Todo: PUT confirmed w/ date

  srv

srv.$inject = ['FileAcceptanceAPIService', 'FinalFixesAPIService']

angular.module('appirio-tech-submissions').factory 'FileAcceptanceService', srv