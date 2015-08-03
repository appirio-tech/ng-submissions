'use strict'

MessagingController = ($stateParams, $window, $scope) ->
  vm = this
  vm.threadId = $stateParams.id
  vm.subscriberId = 'abc'

  vm.back = ->
    $window.history.back()

  # $scope.$watch UserV3Service.getCurrentUser, ->
  #   user            = UserV3Service.getCurrentUser()
  #   vm.subscriberId = user.id if user

  vm

MessagingController.$inject = ['$stateParams', '$window', '$scope']

angular.module('example').controller 'MessagingController', MessagingController
