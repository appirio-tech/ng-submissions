'use strict'

transformResponse = (response) ->
  parsed = JSON.parse response

  parsed?.result?.content || {}

srv = ($resource, API_URL) ->
  url = API_URL + '/projects/:workId/submissions/file/:fileId'

  params  =
    fileId      : '@fileId'
    workId   : '@workId'

  actions =
    update:
      method           :'PUT'
      isArray          : false
      transformResponse: transformResponse

  $resource url, params, actions

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-submissions').factory 'FileAcceptanceAPIService', srv