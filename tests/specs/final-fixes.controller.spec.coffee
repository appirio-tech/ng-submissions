'use strict'

scope = null
spy = null
vm  = null

describe 'FinalFixesController', ->
  beforeEach inject ($rootScope, $controller) ->
    scope           = $rootScope.$new()
    scope.projectId = 'abc'
    scope.stepId    = 'abc'
    vm              = $controller 'FinalFixesController', $scope: scope

  it 'should have a view model', ->
    expect(vm).to.exist

  it 'should have a step name', ->
    expect(vm.stepName).to.equal 'Final Fixes'

  describe 'before loading', ->
    it 'should set loaded to false', ->
      expect(vm.loaded).to.be.false

    it 'should have a status', ->
      expect(vm.status).to.equal 'scheduled'

  describe 'after loading', ->
    beforeEach inject ($httpBackend) ->
      $httpBackend.flush()

    it 'should set loaded to true', ->
      expect(vm.loaded).to.be.true

    describe 'submission', ->
      it 'should exist', ->
        expect(vm.submission).to.exist

      it 'should have lists of files', ->
          expect(vm.submission.files.length).to.be.above 0

    describe 'timeline', ->
      it 'should have nodes', ->
        expect(vm.timeline.length).to.be.above 0

      it 'should have an active node', ->
        expect(vm.timeline).to.contain 'active'










