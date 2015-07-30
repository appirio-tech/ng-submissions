'use strict'

FinalFixesController = ($scope) ->
  vm = this
  vm.files = JSON.parse '[{"id":"abc","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"abc","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"abc","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"abc","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"abc","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"abc","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"}]'

  vm.acceptSubmission = ->
    vm.submissionAccepted = true;

  activate = ->
    vm

  activate()

FinalFixesController.$inject = ['$scope']

angular.module('appirio-tech-submissions').controller 'FinalFixesController', FinalFixesController
