'use strict'

srv = ->

  srv.acceptedFiles = {}
  srv.approvalConfirmed = null

  srv.isAccepted = (file) ->
    srv.acceptedFiles[file.id]

  srv.toggleAcceptFile = (file) ->
    if srv.isAccepted(file)
      delete srv.acceptedFiles[file.id]
    else
      srv.acceptedFiles[file.id] = true

  srv.approveAll = (files) ->
    files.forEach (file) ->
      srv.acceptedFiles[file.id] = true

  srv.unapproveAll = (files) ->
    files.forEach (file) ->
      delete srv.acceptedFiles[file.id]

  srv.confirmApproval = ->
    #Todo: PUT confirmed w/ date
    srv.approvalConfirmed = true

  srv

srv.$inject = []

angular.module('appirio-tech-submissions').factory 'FinalFixesService', srv