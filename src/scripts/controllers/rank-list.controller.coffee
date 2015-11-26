'use strict'

RankListController = ($scope, StepsService, RankListService, DataService) ->
  vm        = this
  projectId = $scope.projectId
  stepId    = $scope.stepId

  activate = ->
    DataService.subscribe $scope, render, [RankListService, 'get', projectId, stepId]

  render = (rankList) ->
    vm.ranks   = rankList
    vm.confirm = rankList.allFull && !rankList.confirmed

  vm.confirmRanks = ->
    StepsService.confirmRanks projectId, stepId

  # IMPORTANT: This must be an object for the onDrop directive to work
  # See: https://github.com/angular/angular.js/wiki/Understanding-Scopes
  vm.drop =
    handle: (event, rankToAssign) ->
      submissionId = event.dataTransfer.getData 'submissionId'

      # The dataTransfer method returns String("undefined") if item is not found
      # Thus the seeminly bizarre check below
      if submissionId != 'undefined' && submissionId && rankToAssign
        StepsService.updateRank projectId, stepId, submissionId, rankToAssign

  activate()

  vm

RankListController.$inject = ['$scope', 'StepsService', 'RankListService', 'DataService']

angular.module('appirio-tech-submissions').controller 'RankListController', RankListController