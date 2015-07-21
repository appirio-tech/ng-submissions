'use strict'
describe 'SubmissionSlidesController', ->
  controller = null
  beforeEach ->
    bard.inject this, '$rootScope', '$q', '$controller', 'SubmissionDetailAPIService'
    scope = $rootScope.$new()

    bard.mockService SubmissionDetailAPIService,
      _default: {$promise: $q.when({files: [1, 2, 3], accepted: true})}

    controller = $controller('SubmissionSlidesController', {$scope: scope})

  bard.verifyNoOutstandingHttpRequests()

  describe 'Submission Slides Controller', ->
    it 'should be created successfully', ->
      expect(controller).to.be.defined

    it 'should initialize selected preview as null', ->
      expect(controller.selectedPreview).to.equal(null)

    it 'should preview previous image', ->
      controller.selectedPreviewIndex = 1;
      controller.previewPrevious()
      expect(controller.selectedPreviewIndex).to.equal(0)

    it 'should preview next image', ->
      controller.work = {files: [1, 2, 3]}
      controller.selectedPreviewIndex = 2
      controller.previewNext()
      expect(controller.selectedPreviewIndex).to.equal(0)

    it 'should preview selected image', ->
      controller.previewSelected(1);
      expect(controller.selectedPreviewIndex).to.equal(1)

    it 'should call API service for work details', ->
      expect(SubmissionDetailAPIService.get).to.have.been.called

    it 'should initialize selected preview', ->
      expect(controller.selectedPreview).to.be.defined

    it 'should initialize work', ->
      expect(controller.work).to.be.defined
