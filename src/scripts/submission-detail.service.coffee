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
    submitter:
      name: 'Alpha User'
    dateCreated: '12:30 June 24 2015'
    files: [1, 2, 3, 4, 5, 6]

  acceptSubmission = ->
    this.submissionAccepted = true
    return

  submissionAccepted: submissionAccepted
  initializeSubmissionDetail: initializeSubmissionDetail
  acceptSubmission: acceptSubmission


service.$inject = ['$resource']

angular.module('appirio-tech-submissions').factory 'SubmissionDetailService', service
