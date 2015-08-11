'use strict'

NotificationsController = ($scope, ThreadsService) ->
  vm = this

  onChange = (threadsVm) ->
    vm.unreadCount = threadsVm.unreadCount

  activate = ->
    console.log('activating')
    $scope.$watch 'subscriberId', ->
      params =
        subscriberId: $scope.subscriberId
        threadId: $scope.threadId
      ThreadsService.get params, onChange if $scope.subscriberId.length

    vm

  activate()

NotificationsController.$inject = ['$scope', 'ThreadsService']

angular.module('appirio-tech-submissions').controller 'NotificationsController', NotificationsController