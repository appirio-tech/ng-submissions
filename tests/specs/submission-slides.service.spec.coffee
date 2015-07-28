'use strict'

srv      = null

describe 'SubmissionSlidesService', ->
  beforeEach inject (SubmissionSlidesService) ->
    srv = SubmissionSlidesService

  it 'should be created successfully', ->
    expect(srv).to.exist

  it 'should have a previewPrevious method', ->
    expect(srv.previewPrevious).to.be.ok

  it 'should have a previewNext method', ->
    expect(srv.previewNext).to.be.ok

  describe 'preview previous', ->

    context 'when on first file', ->
      it 'should set selectedPreviewIndex to last file index', ->
        expect(srv.previewPrevious 0, [1, 2, 3]).to.equal(2)

    context 'when not on first file', ->
      it 'should decrement selectedPreviewIndex', ->
        expect(srv.previewPrevious 2, [1, 2, 3]).to.equal(1)

  describe 'previewNext', ->

    context 'when not on last file', ->
      it 'should set selectedPreviewIndex to next index', ->
        expect(srv.previewNext 0, [1, 2, 3]).to.equal(1)

    context 'when on last file', ->
      it 'should set selectedPreviewIndex to first file index', ->
        expect(srv.previewNext 2, [1, 2, 3]).to.equal(0)
