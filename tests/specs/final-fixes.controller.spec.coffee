'use strict'

scope = null
spy = null
vm  = null

describe 'FinalFixesController', ->
  beforeEach ->
    bard.inject this, '$rootScope', '$controller', '$state'

    scope           = $rootScope.$new()
    scope.projectId = 'abc'
    scope.stepId    = 'abc'

    dependencies =
      $scope: scope
      $state: $state

    vm = $controller 'FinalFixesController', dependencies

  it 'should have a view model', ->
    expect(vm).to.exist

  describe 'before loading', ->
    it 'should be initialized with values on the view-model', ->
      expect(vm.loaded).to.be.false
      expect(vm.timeline.length).to.be.above 0
      expect(vm.stepName).to.be.a 'string'
      expect(vm.status).to.equal 'scheduled'
      expect(vm.allFilled).to.be.false
      expect(vm.submission).to.be.an 'object'
      expect(vm.projectId).to.equal 'abc'
      expect(vm.stepId).to.equal 'abc'

  describe 'after loading', ->
    beforeEach inject ($httpBackend) ->
      $httpBackend.flush()

    it 'should update the view-model with data from services', ->
      expect(vm.loaded).to.be.true
      expect(vm.startsAt).to.be.a 'string'
      expect(vm.endsAt).to.be.a 'string'
      expect(vm.submission).to.be.an 'object'
      expect(vm.status).to.equal 'open'










