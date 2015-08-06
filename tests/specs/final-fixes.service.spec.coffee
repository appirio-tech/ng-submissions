'use strict'

srv  = null

describe 'FinalFixesService', ->
  beforeEach inject (FinalFixesService) ->
    srv = FinalFixesService

  it 'should be created successfully', ->
    expect(srv).to.exist

  it 'should have a isAccepted method', ->
    expect(srv.isAccepted).to.be.ok

  it 'should have a toggeAcceptFile method', ->
    expect(srv.toggleAcceptFile).to.be.ok

  it 'should have a approveAll method', ->
    expect(srv.approveAll).to.be.ok

  it 'should have an unapproveAll method', ->
    expect(srv.unapproveAll).to.be.ok

  it 'should have a confirmApproval method', ->
    expect(srv.confirmApproval).to.be.ok

  describe 'toggleAcceptFile', ->

    context 'when file is not yet accepted', ->
      it 'should add file to acceptedFiles hash', ->
        srv.toggleAcceptFile({id: '123'})
        expect(srv.acceptedFiles['123']).to.be.true

    context 'when file is accepted', ->
      it 'should set selectedPreviewIndex to first file index', ->
        srv.acceptedFiles = {'123': true, '456': true}
        srv.toggleAcceptFile({id: '123'})
        expect(srv.acceptedFiles).to.eql({'456': true})

  describe 'approveAll', ->
     it 'should approve all files', ->
      srv.acceptedFiles = {}
      srv.approveAll([{id: '123'}, {id: '456'}])
      expect(srv.acceptedFiles).to.eql({'123': true, '456': true})

  describe 'unapproveAll', ->
     it 'should approve all files', ->
      srv.acceptedFiles = {'123': true, '456': true}
      srv.unapproveAll([{id: '123'}, {id: '456'}])
      expect(srv.acceptedFiles).to.eql({})

  describe 'confirmApproval', ->
     it 'should set approvalConfirmed to true', ->
      srv.confirmApproval()
      expect(srv.approvalConfirmed).to.be.true