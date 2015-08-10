'use strict'

srv      = null
work = {}
updated = {}

describe 'FinalFixesAPIService', ->
  beforeEach inject (FinalFixesAPIService) ->
    srv = FinalFixesAPIService

  it 'should be created successfully', ->
    expect(srv).to.exist

  it 'should have a get method', ->
    expect(srv.get).to.be.ok

  it 'should have a put method', ->
    expect(srv.put).to.be.ok

  describe 'FinalFixesAPIService.get', ->
    beforeEach inject ($httpBackend) ->
      params =
        workId   : '123'

      srv.get params, (response) ->
        work = response

      $httpBackend.flush()

    it 'should return work data', ->
      expect(work).to.be.ok
