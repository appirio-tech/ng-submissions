'use strict'

controller = ($stateParams) ->
  vm = this
  vm.show = true
  vm.userType = $stateParams.userType

  activate = ->
    vm

  activate()

controller.$inject = ['$stateParams']

angular.module('example').controller 'FileDetailExampleController', controller
