'use strict'

spy = null
vm  = null

describe 'SubmissionsController', ->
  describe 'activate', ->
    beforeEach inject ($rootScope, $controller, $httpBackend) ->
      scope        = $rootScope.$new()
      scope.linkId = '123'
      vm           = $controller 'SubmissionsController', $scope: scope
      $httpBackend.flush()


    it 'should have a view model', ->
      expect(vm).to.be.ok
