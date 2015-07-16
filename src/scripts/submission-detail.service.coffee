'use strict'
service = ($resource) ->
  #variables
  submissionAccepted = false;
  #functions
  initializeSubmissionDetail = ->
    #TODO: replace with API data
    id: '123'
    name: 'IBM Internal HR'
    type: 'mobile app'

  acceptSubmission = ->
    service.submissionAccepted = true
    console.log('accepting', service.submissionAccepted)

  submissionAccepted: submissionAccepted
  initializeSubmissionDetail: initializeSubmissionDetail
  acceptSubmission: acceptSubmission


service.$inject = ['$resource']

angular.module('appirio-tech-submissions').factory 'SubmissionDetailService', service
