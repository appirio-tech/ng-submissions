'use strict'

srv = (SubmissionsAPIService, AVATAR_URL) ->
  getSubmissions = (params, onChange) ->
    submissions =
      submissions: []
      avatars    : {}

    SubmissionsAPIService.query params

    resource.$promise.then (response) ->
      submissions = response?.submissions

      onChange? submissions

    resource.$promise.catch ->
      # do something intelligent

    resource.$promise.finally ->
      # do something intelligent

  getSubmissions: getSubmissions

srv.$inject = ['SubmissionsAPIService', 'AVATAR_URL']

angular.module('appirio-tech-submissions').factory 'SubmissionsService', srv