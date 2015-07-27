'use strict'
describe 'SubmissionSlidesController', ->

  controller = null
  previewPreviousSpy = null
  initializeSpy = null
  previewSelectedSpy = null
  previewNextSpy = null

  beforeEach ->
    bard.inject this, '$rootScope', '$q', '$controller', 'SubmissionDetailAPIService', 'SubmissionSlidesService'
    scope = $rootScope.$new()

    bard.mockService SubmissionDetailAPIService,
      _default: $promise: $q.when(files: [1, 2, 3], accepted: true)

    previewPreviousSpy = sinon.spy SubmissionSlidesService, 'previewPrevious'
    initializeSpy = sinon.spy SubmissionSlidesService, 'initialize'
    previewSelectedSpy = sinon.spy SubmissionSlidesService, 'previewSelected'
    previewNextSpy = sinon.spy SubmissionSlidesService, 'previewNext'

    controller = $controller('SubmissionSlidesController', $scope: scope)
    $rootScope.$apply()

  afterEach ->
    initializeSpy.restore()
    previewPreviousSpy.restore()
    previewSelectedSpy.restore()
    previewNextSpy.restore()

  describe 'Submission Slides Controller', ->
    it 'should be created successfully', ->
      expect(controller).to.be.defined

    it 'should initialize selected preview', ->
      expect(controller.selectedPreview).to.equal(1)

    it 'should initialize work', ->
      expect(controller.work).to.be.defined

    it 'should initalize slides service files', ->
      expect(initializeSpy.called).to.be.ok

    it 'should call preview previous on service', ->
      controller.previewPrevious()
      expect(previewPreviousSpy.called).to.be.ok

    it 'should call preview selected on service', ->
      controller.previewSelected(2)
      expect(previewSelectedSpy.calledWith(2)).to.be.ok

    it 'should call preview next on service', ->
      controller.previewNext()
      expect(previewNextSpy.called).to.be.ok

    it 'should call API service for work details', ->
      expect(SubmissionDetailAPIService.get.called).to.be.ok

