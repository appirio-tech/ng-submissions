'use strict'

FinalDevelopmentController = ($scope) ->
  vm                 = this
  vm.loaded          = false
  vm.thumbnails = []

  images = [
    '/images/batman.jpg'
    '/images/phoenix.jpg'
    '/images/spider.png'
    '/images/phoenix.jpg'
  ]

  activate = ->
    for image, i in images
      vm.thumbnails.push
        id: (i + 1)
        url: image
        link: 'http://www.google.com'

    vm.loaded = true

    vm

  activate()

FinalDevelopmentController.$inject = ['$scope']

angular.module('appirio-tech-submissions').controller 'FinalDevelopmentController', FinalDevelopmentController