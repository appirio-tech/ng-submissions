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
    files: [
      {name: 'a-long-freaken-name-oh-baby-jesus'},
      {name: 'a-long-freaken-name-oh-baby-jesus'},
      {name: 'a-long-freaken-name-oh-baby-jesus'},
      {name: 'a-long-freaken-name-oh-baby-jesus'},
      {name: 'a-long-freaken-name-oh-baby-jesus'},
      {name: 'a-long-freaken-name-oh-baby-jesus'}
    ]

  acceptSubmission = ->
    this.submissionAccepted = true
    return

  submissionAccepted: submissionAccepted
  initializeSubmissionDetail: initializeSubmissionDetail
  acceptSubmission: acceptSubmission


service.$inject = ['$resource']

angular.module('appirio-tech-submissions').factory 'SubmissionDetailService', service
