'use strict'

srv      = null

describe 'SubmissionSlidesService', ->
  beforeEach inject (SubmissionSlidesService) ->
    srv = SubmissionSlidesService

  it 'should be created successfully', ->
    expect(srv).to.exist

  it 'should have a initialize method', ->
    expect(srv.initialize).to.be.ok

  it 'should have a previewPrevious method', ->
    expect(srv.previewPrevious).to.be.ok

  it 'should have a previewNext method', ->
    expect(srv.previewNext).to.be.ok

  it 'should have a previewSelected method', ->
    expect(srv.previewSelected).to.be.ok

  describe 'SubmissionSlidesService methods', ->
    beforeEach ->
      index = 0
      files = [1, 2, 3]

      srv.initialize(index, files)

    it 'should initialize files correctly', ->
      expect(srv.files).to.eql([1, 2, 3])

    it 'should initialize selected preview index correctly', ->
      expect(srv.selectedPreviewIndex).to.equal(0)

    describe 'previewPrevious', ->
      beforeEach ->
        srv.previewPrevious()

      context 'When on first file', ->
        it 'should set selectedPreviewIndex to last file index', ->
          expect(srv.selectedPreviewIndex).to.equal(2)

      context 'When not on first file', ->
        it 'should decrement selectedPreviewIndex', ->
          srv.previewPrevious()
          expect(srv.selectedPreviewIndex).to.equal(1)

    describe 'previewNext', ->
      beforeEach ->
        srv.previewNext()

      context 'When not on last file', ->
        it 'should set selectedPreviewIndex to next index', ->
          expect(srv.selectedPreviewIndex).to.equal(1)

      context 'When on last file', ->
        it 'should set selectedPreviewIndex to first file index', ->
          srv.previewNext()
          srv.previewNext()
          expect(srv.selectedPreviewIndex).to.equal(0)

    describe 'previewSelected', ->
      it 'should set selectedPreviewIndex to selected index', ->
        srv.previewSelected(2)
        expect(srv.selectedPreviewIndex).to.equal(2)