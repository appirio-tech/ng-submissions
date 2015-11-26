'use strict'

RankDropdownController = ($scope, StepsService, RankListService, DataService) ->
  vm           = this
  projectId    = $scope.projectId
  stepId       = $scope.stepId
  submissionId = $scope.submissionId

  activate = ->
    DataService.subscribe $scope, render, [RankListService, 'get', projectId, stepId]

  render = (rankList) ->
    vm.ranks = rankList

    belongsToSubmission = (thisRank, rank) ->
      if rank.id == submissionId
        rank.value
      else
        thisRank

    vm.rank = rankList.reduce belongsToSubmission, null

  vm.handleRankSelect = ->
    if submissionId && vm.rank
      StepsService.updateRank projectId, stepId, submissionId, vm.rank

  activate()

  vm

RankDropdownController.$inject = ['$scope', 'StepsService', 'RankListService', 'DataService']

angular.module('appirio-tech-submissions').controller 'RankDropdownController', RankDropdownController