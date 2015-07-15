'use strict'

SubmissionDetailController = ($scope) ->
  vm = this

  activate = ->
    vm.workName = 'IBM Internal HR'
    vm.workType = 'mobile app'

  activate()

SubmissionDetailController.$inject = ['$scope']

angular.module('appirio-tech-submissions').controller 'SubmissionDetailController', SubmissionDetailController
