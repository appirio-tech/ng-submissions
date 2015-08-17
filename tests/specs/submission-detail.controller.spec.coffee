'use strict'
describe 'SubmissionDetailController', ->

  controller = null

  beforeEach ->
    bard.inject this, '$rootScope', '$q', '$controller', 'SubmissionDetailAPIService'
    scope = $rootScope.$new()

    bard.mockService SubmissionDetailAPIService,
      _default: $promise: $q.when(accepted: true)

    controller = $controller('SubmissionDetailController', $scope: scope)

  describe 'Submission Detail Controller', ->
    it 'should be created successfully', ->
      expect(controller).to.be.defined

    it 'should call API service for work details', ->
      expect(SubmissionDetailAPIService.get.called).to.be.ok

    it 'should initialize showConfirmButton', ->
     expect(controller.showConfirmButton).not.to.be.ok

    it 'should have selectPosition method', ->
      expect(controller.selectPosition).to.exist

    it 'should call API service to update selected position', ->
      controller.selectPosition()
      expect(SubmissionDetailAPIService.updateRank.called).to.be.ok

    it 'should have a showConfirm method', ->
      expect(controller.showConfirm).to.exist

    it 'should initialize work', ->
      expect(controller.work).to.be.defined