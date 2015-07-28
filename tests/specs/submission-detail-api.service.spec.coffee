'use strict'

srv      = null
work = {}

describe 'SubmissionDetailAPIService', ->
  beforeEach inject (SubmissionDetailAPIService) ->
    srv = SubmissionDetailAPIService

  it 'should be created successfully', ->
    expect(srv).to.exist

  it 'should have a get method', ->
    expect(srv.get).to.be.ok

  describe 'SubmissionDetailAPIService.get', ->
    beforeEach inject ($httpBackend) ->
      params =
        workId   : '123'
        submissionId: '123'

      srv.get params, (response) ->
        work = response

      $httpBackend.flush()

    it 'should return work data', ->
      expect(work).to.be.ok