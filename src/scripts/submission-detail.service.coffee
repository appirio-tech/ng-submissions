'use strict'
service = ($resource) ->
  #variables
  submissionAccepted = false
  #functions
  initializeSubmissionDetail = ->
    #TODO: replace with API data
    id: '123'
    name: 'IBM Internal HR'
    type: 'mobile app'

  acceptSubmission = ->
    this.submissionAccepted = true
    console.log('accepting', this.submissionAccepted)

  submissionAccepted: submissionAccepted
  initializeSubmissionDetail: initializeSubmissionDetail
  acceptSubmission: acceptSubmission


service.$inject = ['$resource']

angular.module('appirio-tech-submissions').factory 'SubmissionDetailService', service
