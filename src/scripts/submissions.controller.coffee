'use strict'

SubmissionsController = ($scope) ->
  vm = this

  activate = ->
    vm.workName = 'IBM Internal HR'
    vm.workType = 'mobile app'
    vm.screeningSubmissions = []

    vm.screeningSubmissions.push
      name: 'Batman'
      createdAt: '4 Days ago'

    vm.screeningSubmissions.push
      name: 'Robin'
      createdAt: '4 Days ago'

    vm.screeningSubmissions.push
      name: 'Dude with freaking long name'
      createdAt: '4 Days ago'

    vm.screeningSubmissions.push
      name: 'Jesus'
      createdAt: '4 Days ago'

  activate()

SubmissionsController.$inject = ['$scope']

angular.module('appirio-tech-submissions').controller 'SubmissionsController', SubmissionsController
