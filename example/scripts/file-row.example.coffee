'use strict'

controller = ($scope) ->
  vm             = this
  vm.thumbnails  = []
  vm.thumbnails2 = []
  vm.thumbnails3 = []

  images = [
    '/images/batman.jpg'
    '/images/phoenix.jpg'
    '/images/spider.png'
    '/images/phoenix.jpg'
    '/images/spider.png'
  ]

  activate = ->
    for image, i in images
      vm.thumbnails.push
        id: (i + 1)
        url: image
        link: 'http://www.google.com'

    vm.thumbnails2 = vm.thumbnails.slice 0, 3

    vm.thumbnails3 = vm.thumbnails.concat vm.thumbnails

    vm

  activate()

controller.$inject = ['$scope']

angular.module('appirio-tech-submissions').controller 'FileRowExampleController', controller