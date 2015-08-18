'use strict'

scope = null
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
      expect(vm).to.exist

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
      expect(vm.rankNames.length).to.equal parseInt(vm.numberOfRanks)

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

      it 'should have the proper length', ->
        expect(vm.ranks.length).to.equal parseInt(vm.numberOfRanks)

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
        vm.submissions[0].rank = 0
        vm.reorder vm.submissions[0], true

        expect(vm.ranks[0].id).to.equal vm.submissions[0].id

    describe 'changing rank property of a submission to an existing rank', ->

      it 'should update ranks in a cascade', ->
        vm.submissions[0].rank = 0
        vm.reorder vm.submissions[0], true

        expect(vm.ranks[0].id).to.equal vm.submissions[0].id

        vm.submissions[1].rank = 0
        vm.reorder vm.submissions[1], true

        expect(vm.ranks[1].id).to.equal vm.submissions[0].id










