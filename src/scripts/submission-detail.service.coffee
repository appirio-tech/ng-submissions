'use strict'
service = ($resource, SubmissionDetailAPIService) ->
  #variables
  submissionAccepted = false

  #functions
  getSubmissionDetail = (params)->
    #TODO: replace with API data
    resource = SubmissionDetailAPIService.get params

    resource.$promise.then (response) ->
     return response

    resource.$promise.catch (error)->
      console.log('error on submission detail', error)

    resource.$promise.finally ->

  acceptSubmission = ->
    # TODO: PUT request to submissions service
    this.submissionAccepted = true
    return

  submissionAccepted: submissionAccepted
  getSubmissionDetail: getSubmissionDetail
  acceptSubmission: acceptSubmission


service.$inject = ['$resource', 'SubmissionDetailAPIService']

angular.module('appirio-tech-submissions').factory 'SubmissionDetailService', service
