'use strict'

transformResponse = (response) ->
  parsed = JSON.parse response

  parsed?.result?.content || []

confirm = () ->
  date = new Date()
  date = date.toISOString()

  payload = 
    confirmed: date

  payload

srv = ($resource, API_URL) ->
  url = API_URL + '/v3/projects/:workId/submissions'

  params =
    workId: '@workId'
    phase : '@phase'

  methods =
    query:
      method           : 'GET'
      isArray          : false
      transformResponse: transformResponse
    get:
      method           : 'GET'
      isArray          : false
      transformResponse: transformResponse
    confirm:
      method           : 'PUT'
      transformRequest : confirm

  $resource url, params, methods

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-submissions').factory 'SubmissionAPIService', srv