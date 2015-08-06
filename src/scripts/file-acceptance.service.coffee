'use strict'

srv = ->

  srv.acceptedFiles = {}
  srv.approvalConfirmed = null

  # srv.isAccepted = (file) ->
  #   file.accepted

  srv.toggleAcceptFile = (file) ->
    if file.accepted
      #TODO: PUT file.id, accepted = false
    else
       #TODO: PUT file.id, accepted = true

  srv.approveAll = (files) ->
    files.forEach (file) ->
      #TODO: PUT file.id, accepted = true

  srv.unapproveAll = (files) ->
    files.forEach (file) ->
      #TODO: PUT file.id, accepted = false

  srv.confirmApproval = ->
    #Todo: PUT confirmed w/ date
    srv.approvalConfirmed = true

  srv

srv.$inject = []

angular.module('appirio-tech-submissions').factory 'FileAcceptanceService', srv