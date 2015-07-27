'use strict'

spy = null
vm  = null

describe 'SubmissionsController', ->
  describe 'activate', ->
    beforeEach inject ($rootScope, $controller, $httpBackend) ->
      scope        = $rootScope.$new()
      spy          = sinon.spy vm, 'getSubmissions'
      scope.workId = '123'
      vm           = $controller 'SubmissionsController', $scope: scope
      $httpBackend.flush()


    it 'should have a view model', ->
      expect(vm).to.be.ok

    it.only 'should have called getSubmissions', ->
      wasCalled = spy.calledOnce
      expect(wasCalled).to.be.ok