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

    it 'should initialize submission accepted as null', ->
     expect(controller.submissionAccepted).to.not.be.ok

    it 'should set submission accepted', ->
      controller.acceptSubmission()
      expect(controller.submissionAccepted).to.be.ok

    it 'should call API service for work details', ->
      expect(SubmissionDetailAPIService.get).to.have.been.called

    it 'should initialize work', ->
      expect(controller.work).to.be.defined