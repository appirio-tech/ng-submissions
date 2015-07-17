'use strict'

transformResponse = (response) ->
  parsed = JSON.parse response

  parsed?.result?.content || []

srv = ($resource, API_URL) ->
  url = API_URL

  params =
    workId: '@workId'

  methods =
    query:
      method           : 'GET'
      isArray          : true
      transformResponse: transformResponse

  $resource url, {}, methods

srv.$inject = ['$resource', 'API_URL']