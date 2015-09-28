'use strict'

controller = ->
  vm = this
  vm.show = true

  activate = ->
    vm

  activate()

angular.module('example').controller 'FileDetailExampleController', controller
