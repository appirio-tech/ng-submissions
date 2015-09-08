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
    it 'should be initialized with values on the view-model', ->
      expect(vm.loaded).to.be.false
      expect(vm.submission).to.be.an 'object'
      expect(vm.file).to.be.an 'object'
      expect(vm.prevFile).to.be.a 'null'
      expect(vm.nextFile).to.be.a 'null'
      expect(vm.showMessages).to.be.false
      expect(vm.projectId).to.equal 'abc'
      expect(vm.stepId).to.equal 'abc'
      expect(vm.submissionId).to.equal 'abc'
      expect(vm.fileId).to.equal 'abc'

  describe 'after loading', ->
    beforeEach inject ($httpBackend) ->
      $httpBackend.flush()

    it 'should update the view-model with data from services', ->
      expect(vm.loaded).to.be.true
      expect(vm.submission).to.be.an 'object'
      expect(vm.file).to.be.an 'object'
      expect(vm.prevFile).to.be.an 'object'
      expect(vm.nextFile).to.be.an 'object'