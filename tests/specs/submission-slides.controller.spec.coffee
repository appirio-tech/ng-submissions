'use strict'
describe 'SubmissionSlidesController', ->

  controller = null
  previewPreviousSpy = null
  previewNextSpy = null

  beforeEach ->
    bard.inject this, '$rootScope', '$q', '$controller', 'SubmissionDetailAPIService', 'SubmissionSlidesService'
    scope = $rootScope.$new()

    bard.mockService SubmissionDetailAPIService,
      _default: $promise: $q.when(files: [1, 2, 3], accepted: true)

    previewPreviousSpy = sinon.spy SubmissionSlidesService, 'previewPrevious'
    previewNextSpy = sinon.spy SubmissionSlidesService, 'previewNext'

    controller = $controller('SubmissionSlidesController', $scope: scope)
    $rootScope.$apply()

  afterEach ->
    previewPreviousSpy.restore()
    previewNextSpy.restore()

  describe 'Submission Slides Controller', ->
    it 'should be created successfully', ->
      expect(controller).to.be.defined

    it 'should initialize selected preview', ->
      expect(controller.selectedPreview).to.be.ok

    it 'should initialize work', ->
      expect(controller.work).to.be.defined

    # it 'should initalize selected preview index', ->
    #   expect(controller.selectedPreviewIndex).to.equal(0)

    it 'should call preview previous on service', ->
      controller.previewPrevious()
      expect(previewPreviousSpy.called).to.be.ok

    it 'should call preview selected on service', ->
      controller.previewSelected(2)
      expect(controller.selectedPreviewIndex).to.equal(2)

    it 'should call preview next on service', ->
      controller.previewNext()
      expect(previewNextSpy.called).to.be.ok

    it 'should call API service for work details', ->
      expect(SubmissionDetailAPIService.get.called).to.be.ok

    it 'should have an accept files method', ->
      expect(controller.acceptFile).to.exist

   it 'should have a showComments variable', ->
     expect(controller.showComments).to.exist