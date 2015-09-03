'use strict'

scope = null
spy = null
vm  = null

describe 'SubmissionsController', ->
  beforeEach inject ($rootScope, $controller) ->
    scope           = $rootScope.$new()
    scope.projectId = 'abc'
    scope.stepId    = 'abc'
    scope.stepType  = 'designConcepts'
    vm              = $controller 'SubmissionsController', $scope: scope

  it 'should have a view model', ->
    expect(vm).to.exist

  it 'should have a step name', ->
    expect(vm.stepName).to.equal 'Design Concepts'

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

    it 'should have a collection of submissions', ->
      expect(vm.submissions.length).to.be.above 0

    describe 'submissions', ->
      it 'should have lists of files', ->
        vm.submissions.forEach (submission) ->
          expect(submission.files.length).to.be.above 0

    describe 'timeline', ->
      it 'should have nodes', ->
        expect(vm.timeline.length).to.be.above 0

      it 'should have an active node', ->
        expect(vm.timeline).to.contain 'active'

    describe 'ranks', ->
      it 'there should be at least one rank', ->
        expect(vm.ranks.length).to.be.above 0

      it 'should have ids', ->
        vm.ranks.forEach (rank) ->
          expect(rank).to.include.keys 'id'

      it 'should have values', ->
        vm.ranks.forEach (rank) ->
          expect(rank).to.include.keys 'value'

      it 'should have labels', ->
        vm.ranks.forEach (rank) ->
          expect(rank).to.include.keys 'label'

      it 'should have avatar urls', ->
        vm.ranks.forEach (rank) ->
          expect(rank).to.include.keys 'avatarUrl'

    describe 'changing rank property of a submission', ->
      it 'should update ranks', ->
        vm.submissions[0].rank = '1'
        vm.handleRankSelect vm.submissions[0]

        expect(vm.ranks[0].id).to.equal vm.submissions[0].id










