'use strict'

SubmissionWinnersController = ($scope) ->
  vm = this
  vm.ranks = $scope.ranks || [
    nameText: 'Martha Quintero'
    avatarUrl: '/images/flower.png'
    rank: '1st'
  ,
    nameText: 'Martha Quintero'
    avatarUrl: '/images/flower.png'
    rank: '2nd'
  ,
    nameText: 'Martha Quintero'
    avatarUrl: '/images/flower.png'
    rank: '3rd'
  ,
    nameText: 'Martha Quintero'
    avatarUrl: '/images/flower.png'
  ]

  activate = ->
    vm

  activate()

SubmissionWinnersController.$inject = ['$scope']

angular.module('appirio-tech-submissions').controller 'SubmissionWinnersController', SubmissionWinnersController