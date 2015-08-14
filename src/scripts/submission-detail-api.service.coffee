'use strict'

transformResponse = (response) ->
  parsed = JSON.parse response

  parsed?.result?.content || {}

updateRank = (submission) ->
  dataToUpdate =
    rank: submission.rank

  dataToUpdate

srv = ($resource, API_URL) ->
  url = API_URL + '/v3/projects/:workId/submissions/:submissionId'

  params  =
    workId      : '@workId'
    submissionId: '@submissionId'

  actions =
    query:
      method           : 'GET'
      isArray          : false
      transformResponse: transformResponse
    get:
      method           : 'GET'
      isArray          : false
      transformResponse: transformResponse
    updateRank:
      method           : 'PUT'
      transformRequest : updateRank

  $resource url, params, actions

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-submissions').factory 'SubmissionDetailAPIService', srv