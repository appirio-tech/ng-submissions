'use strict'
service = ($resource) ->
  #variables
  submissionAccepted = false

  #functions
  initializeSubmissionDetail = ->
    #TODO: replace with API data
    {
       id: '123',
       submitter: {
         id: '123',
         handle: 'Alpha User',
         avatarUrl: 'http://www.topcoder.com/i/m/cardiboy_big.jpg'
       },
       accepted: false,
       createdAt: '2008-10-15T05:08:00.000-0400',
       files: [{
         id: '1234567',
         name: 'BatBaby',
         accepted: true,
         thumbnailUrl: 'http://www.topcoder.com/i/m/cardiboy_big.jpg',
         url:  'http://www.topcoder.com/i/m/cardiboy_big.jpg'
       }]
     }

  acceptSubmission = ->
    # TODO: PUT request to submissions service
    this.submissionAccepted = true
    return

  submissionAccepted: submissionAccepted
  initializeSubmissionDetail: initializeSubmissionDetail
  acceptSubmission: acceptSubmission


service.$inject = ['$resource']

angular.module('appirio-tech-submissions').factory 'SubmissionDetailService', service
