'use strict'

transformResponse = (response) ->
  parsed = JSON.parse response

  parsed?.result?.content || []

srv = ($resource, API_URL) ->
  url = API_URL + '/projects/:workId/submissions'

  params =
    workId: '@workId'

  methods =
    query:
      method           : 'GET'
      isArray          : false
      transformResponse: transformResponse

    get:
      method           : 'GET'
      isArray          : false
      transformResponse: transformResponse

  $resource url, params, methods

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-submissions').factory 'SubmissionAPIService', srv