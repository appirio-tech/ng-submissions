'use strict'

RankListController = ($scope, StepsService, RankListService, DataService) ->
  vm             = this
  vm.projectId   = $scope.projectId
  vm.stepId      = $scope.stepId
  userType       = $scope.userType
  vm.showWinners = false

  activate = ->
    DataService.subscribe $scope, render, [RankListService, 'get', vm.projectId, vm.stepId]

  render = (rankList) ->
    vm.ranks   = rankList
    vm.locked  = userType == 'member' || rankList.confirmed
    vm.confirm = rankList.allFull && !rankList.confirmed && userType != 'member'

  vm.confirmRanks = ->
    vm.showWinners = true
    StepsService.confirmRanks vm.projectId, vm.stepId

  # IMPORTANT: This must be an object for the onDrop directive to work
  # See: https://github.com/angular/angular.js/wiki/Understanding-Scopes
  vm.drop =
    handle: (event, rankToAssign) ->
      submissionId = event.dataTransfer.getData 'submissionId'

      # The dataTransfer method returns String("undefined") if item is not found
      # Thus the seeminly bizarre check below
      if submissionId != 'undefined' && submissionId && rankToAssign
        StepsService.updateRank vm.projectId, vm.stepId, submissionId, rankToAssign

  activate()

  vm

RankListController.$inject = ['$scope', 'StepsService', 'RankListService', 'DataService']

angular.module('appirio-tech-submissions').controller 'RankListController', RankListController