'use strict'

spy = null
vm  = null

describe 'SubmissionsController', ->
  describe 'before activation', ->
    beforeEach inject ($rootScope, $controller, $httpBackend) ->
      scope        = $rootScope.$new()
      scope.workId = '123'
      scope.phase = 'design-concepts'
      vm           = $controller 'SubmissionsController', $scope: scope

    it 'should have a view model', ->
      expect(vm).to.be.ok

    it 'should have a current phase name', ->
      expect(vm.phase.current.name).to.be.a 'string'

    it 'should have a status', ->
      expect(vm.open).to.be.a 'boolean'

  describe 'after activation', ->
    beforeEach inject ($rootScope, $controller, $httpBackend) ->
      scope        = $rootScope.$new()
      scope.workId = '123'
      scope.phase = 'design-concepts'
      vm           = $controller 'SubmissionsController', $scope: scope

      $httpBackend.flush()

    it 'should set loaded to true', ->
      expect(vm.loaded).to.be.true

    it 'should should trim rank list down', ->
      expect(vm.ranks.length).to.equal 5

    it 'should have a collection of submissions', ->
      expect(vm.submissions.length).to.be.above 0

    describe 'submissions', ->

      it 'should have objects', ->
        expect(vm.submissions[0]).to.be.a 'object'

    describe 'timeline', ->

      it 'should have the proper length', ->
        expect(vm.timeline.length).to.equal 3

      it 'should have an active node', ->
        expect(vm.timeline).to.contain 'active'

    describe 'ranks', ->

      it 'should have the proper length', ->
        expect(vm.ranks.length).to.equal 5

      it 'should have values', ->
        expect(vm.ranks[0].value).to.be.a 'number'

      it 'should have labels', ->
        expect(vm.ranks[0].label).to.be.a 'string'

      it 'should have avatar urls', ->
        expect(vm.ranks[0].avatarUrl).to.be.a 'string'
