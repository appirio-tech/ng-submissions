'use strict'

ConfirmButtonController = ($scope, StepsService, RankListService, DataService) ->
  vm             = this
  vm.projectId   = $scope.projectId
  vm.stepId      = $scope.stepId
  userType       = $scope.userType

  activate = ->
    DataService.subscribe $scope, render, [RankListService, 'get', vm.projectId, vm.stepId]

  render = (rankList) ->
    vm.ranks   = rankList
    vm.locked  = userType == 'member' || rankList.confirmed
    vm.confirm = rankList.allFull && !rankList.confirmed && userType != 'member'

  vm.confirmRanks = ->
    StepsService.confirmRanks vm.projectId, vm.stepId

  activate()

  vm

ConfirmButtonController.$inject = ['$scope', 'StepsService', 'RankListService', 'DataService']

angular.module('appirio-tech-submissions').controller 'ConfirmButtonController', ConfirmButtonController