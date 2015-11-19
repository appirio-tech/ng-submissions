'use strict'

TopSelectionExampleController = ($scope) ->
  vm            = this
  vm.ranks      = []

  avatars = [
    '/images/batman.jpg'
    '/images/phoenix.jpg'
    '/images/spider.png'
  ]

  activate = ->
    for avatar, i in avatars
      vm.ranks.push
        id: (i + 1)
        value: (i + 1)
        avatarUrl: avatar

    vm

  activate()

TopSelectionExampleController.$inject = ['$scope']

angular.module('appirio-tech-submissions').controller 'TopSelectionExampleController', TopSelectionExampleController