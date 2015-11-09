'use strict'

controller = ($stateParams) ->
  vm = this
  vm.userType = $stateParams.userType

  activate = ->
    vm

  activate()

controller.$inject = ['$stateParams']

angular.module('example').controller 'SubmissionDetailExampleController', controller
