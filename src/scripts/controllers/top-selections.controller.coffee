'use strict'

TopSelectionsController = ($scope) ->
  vm = this
  vm.ranks = $scope.ranks || [
    value: 1
  ,
    value: 2
  ,
    value: 3
  ]

  activate = ->
    vm

  activate()

TopSelectionsController.$inject = ['$scope']

angular.module('appirio-tech-submissions').controller 'TopSelectionsController', TopSelectionsController