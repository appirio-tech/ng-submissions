'use strict'

scope = null
spy = null
vm  = null

describe 'SubmissionDetailController', ->
  beforeEach ->
    bard.inject this, '$rootScope', '$controller'

    scope              = $rootScope.$new()
    scope.projectId    = 'abc'
    scope.stepId       = 'abc'
    scope.submissionId = 'abc'
    vm                 = $controller 'SubmissionDetailController', $scope: scope

  it 'should have a view model', ->
    expect(vm).to.exist

  describe 'before loading', ->
    it 'should set loaded to false', ->
      expect(vm.loaded).to.be.false
      expect(vm.submission).to.be.an 'object'
      expect(vm.projectId).to.equal 'abc'
      expect(vm.stepId).to.equal 'abc'
      expect(vm.submissionId).to.equal 'abc'

  describe 'after loading', ->
    beforeEach inject ($httpBackend) ->
      $httpBackend.flush()

    it 'should update the view-model with data from services', ->
      expect(vm.loaded).to.be.true
      expect(vm.submission).to.be.an 'object'

