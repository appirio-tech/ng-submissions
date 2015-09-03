'use strict'

scope = null
spy = null
vm  = null

describe 'FileDetailController', ->
  beforeEach inject ($rootScope, $controller) ->
    scope              = $rootScope.$new()
    scope.projectId    = 'abc'
    scope.stepId       = 'abc'
    scope.submissionId = 'abc'
    scope.fileId       = 'abc'
    vm                 = $controller 'FileDetailController', $scope: scope

  it 'should have a view model', ->
    expect(vm).to.exist

  describe 'before loading', ->
    it 'should set loaded to false', ->
      expect(vm.loaded).to.be.false

  describe 'after loading', ->
    beforeEach inject ($httpBackend) ->
      $httpBackend.flush()

    it 'should set loaded to true', ->
      expect(vm.loaded).to.be.true