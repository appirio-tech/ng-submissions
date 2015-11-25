'use strict'

RankListController = (helpers, $scope, $rootScope, $state, RankListService, StepsService) ->
  vm = this
  projectId = null
  stepId = null

  vm.confirmRanks = ->
    StepsService.confirmRanks vm.projectId, vm.stepId

  # IMPORTANT: This must be an object for the onDrop directive to work
  # See: https://github.com/angular/angular.js/wiki/Understanding-Scopes
  vm.drop =
    handle: (event, rankToAssign) ->
      submissionId = event.dataTransfer.getData 'submissionId'

      # The dataTransfer method returns String("undefined") if item is not found
      # Thus the seeminly bizarre check below
      if submissionId != 'undefined' && submissionId && rankToAssign
        StepsService.updateRank projectId, stepId, submissionId, rankToAssign

  activate = ->
    RankListService.subscribe $scope, render

  render = ->
    projectId = $scope.projectId
    stepId    = $scope.stepId
    rankList  = RankListService.get(projectId, stepId)

    if rankList._pending
      return null

    vm.ranks   = rankList
    vm.confirm = true

    rankList.forEach (rank) ->
      vm.confirm = false unless rank.id

  activate()

  vm

RankListController.$inject = ['SubmissionsHelpers', '$scope', '$rootScope', '$state', 'RankListService', 'StepsService']

angular.module('appirio-tech-submissions').controller 'RankListController', RankListController