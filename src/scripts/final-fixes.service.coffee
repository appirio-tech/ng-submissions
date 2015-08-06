'use strict'

srv = ->

  srv.acceptedFiles = []

  srv.acceptFile = ->

  srv.isAccepted = (file) ->
    srv.acceptedFiles.indexOf(file.id) != -1

  srv.toggleAcceptFile = (file, index) ->
    if srv.isAccepted(file)
      srv.acceptedFiles.splice(1, index)
    else
      srv.acceptedFiles.push file.id
    console.log('files', srv.acceptedFiles)

  srv

srv.$inject = []

angular.module('appirio-tech-submissions').factory 'FinalFixesService', srv