'use strict'

srv = (SubmissionsAPIService, UserAPIService, AVATAR_URL) ->
  getSubmissions = (params, onChange) ->
    submissions =
      submissions: []
      avatars    : {}

    SubmissionsAPIService.query params

    resource.$promise.then (response) ->
      submissions = response?.submissions

      for submission in submissions
        buildAvatar submission.publisherId, submissions, onChange

      onChange? submissions

    resource.$promise.catch ->
      # do something intelligent

    resource.$promise.finally ->
      # do something intelligent

  buildAvatar = (handle, submissions, onChange) ->
    unless submissions.avatars[handle]
      userParams =
        handle: handle

      user = UserAPIService.get userParams

      user.$promise.then (response) ->
        submissions.avatars[handle] = AVATAR_URL + response?.photoLink

        onChange? submissions

      user.$promise.catch ->
        # need handle error

      user.$promise.finally ->
        # need handle finally

  getSubmissions: getSubmissions

srv.$inject = ['SubmissionsAPIService', 'UserAPIService', 'AVATAR_URL']

angular.module('appirio-tech-submissions').factory 'SubmissionsService', srv