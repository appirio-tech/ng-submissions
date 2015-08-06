'use strict'
describe 'FinalFixesController', ->

  controller = null
  FinalFixesServ = null
  approveAllSpy = null
  unapproveAllSpy = null

  beforeEach ->
    bard.inject this, '$rootScope', '$q', '$controller', 'FinalFixesService'
    scope = $rootScope.$new()
    FinalFixesServ = FinalFixesService
    approveAllSpy = sinon.spy FinalFixesServ, 'approveAll'

    controller = $controller('FinalFixesController', $scope: scope)
    scope.vm = controller

  describe 'Submission Detail Controller', ->
    it 'should be created successfully', ->
      expect(controller).to.be.defined

    it 'should initialize files', ->
     expect(controller.files).to.be.ok

    it 'should have acceptAllFiles method', ->
      expect(controller.acceptAllFiles).to.exist

    it 'should have toggleAcceptFile method', ->
      expect(controller.toggleAcceptFile).to.exist

    it 'should have isAccepted method', ->
      expect(controller.isAccepted).to.exist

    it 'should have confirmApproval method', ->
      expect(controller.confirmApproval).to.exist

    it 'should call approveAll on FinalFixesService when approveAll is selected', ->
      controller.approveAll = true
      $rootScope.$apply()
      expect(approveAllSpy.called).to.be.ok

    it 'should set approvalConfirmed to true if confirmed', ->
      FinalFixesServ.approvalConfirmed = true
      $rootScope.$apply()
      expect(controller.approvalConfirmed).to.be.true

    it 'should show confirm approval button if all files are accepted', ->
      FinalFixesServ.acceptedFiles = {'1': true, '2': true}
      controller.files = ['1', '2']
      $rootScope.$apply()
      expect(controller.showConfirmApproval).to.be.true

