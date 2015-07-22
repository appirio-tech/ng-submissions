'use strict'

spy = null
vm  = null

describe 'SubmissionsController', ->
  describe 'activate', ->
    beforeEach inject ($rootScope, $controller) ->
      scope        = $rootScope.$new()
      scope.workId = '123'
      vm           = $controller 'SubmissionsController', $scope: scope

    it 'should have a view model', ->
      expect(vm).to.be.ok