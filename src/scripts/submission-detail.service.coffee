'use strict'
service = ($resource, SubmissionDetailAPIService) ->
  getSubmissionDetail = (params)->
    #TODO: replace with API data
    resource = SubmissionDetailAPIService.get params

    resource.$promise.then (response) ->
      response

    resource.$promise.catch (error)->
      console.log('error on submission detail', error)

    resource.$promise.finally ->

  acceptSubmission = ->
    # TODO: PUT request to submissions service

  getSubmissionDetail: getSubmissionDetail
  acceptSubmission: acceptSubmission


service.$inject = ['$resource', 'SubmissionDetailAPIService']

angular.module('appirio-tech-submissions').factory 'SubmissionDetailService', service
