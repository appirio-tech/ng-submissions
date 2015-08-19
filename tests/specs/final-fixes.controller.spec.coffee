'use strict'

controller = null

describe 'FinalFixesController', ->
  beforeEach inject (FinalFixesAPIService) ->
    bard.inject this, '$rootScope', '$q', '$controller', 'FinalFixesAPIService'

    scope = $rootScope.$new()

    _default =
      _default:
        $promise: $q.when({})

    bard.mockService FinalFixesAPIService, _default

    controller = $controller 'FinalFixesController', $scope: scope
    scope.vm   = controller

  describe 'Final Fixes Controller', ->
    it 'should be created successfully', ->
      expect(controller).to.be.defined

    it 'should have confirmApproval method', ->
      expect(controller.confirmApproval).to.exist

    it 'should call FinalFixesAPIService when confirming approval', ->
      controller.confirmApproval()

      expect(FinalFixesAPIService.put.called).to.be.ok

    it 'should set showConfirmed to true when approveAll is selected', ->
      controller.approveAll = true

      $rootScope.$apply()

      expect(controller.showConfirmApproval).to.be.true
