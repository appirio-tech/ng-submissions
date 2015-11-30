'use strict'

GridOfThumbnailsExampleController = ($scope) ->
  vm                 = this
  vm.thumbnailGroups = []

  images = [
    '/images/batman.jpg'
    '/images/phoenix.jpg'
    '/images/spider.png'
    '/images/phoenix.jpg'
  ]

  activate = ->
    for j in [0..2]
      thumbnails = []

      for image, i in images
        thumbnails.push
          id: (i + 1)
          url: image
          link: 'http://www.google.com'

      vm.thumbnailGroups.push thumbnails

    lastItem = vm.thumbnailGroups[vm.thumbnailGroups.length - 1]

    lastItem = lastItem.slice 1

    vm.thumbnailGroups[vm.thumbnailGroups.length - 1] = lastItem

    vm

  activate()

GridOfThumbnailsExampleController.$inject = ['$scope']

angular.module('appirio-tech-submissions').controller 'GridOfThumbnailsExampleController', GridOfThumbnailsExampleController