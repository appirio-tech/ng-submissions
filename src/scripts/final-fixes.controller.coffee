'use strict'

FinalFixesController = ($scope) ->
  vm = this
  vm.acceptedFiles = []
  vm.showConfirmApproval = false;
  vm.files = JSON.parse '[{"id":"abc","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"abc","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"abc","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"abc","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"abc","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"abc","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"}]'

  vm.acceptSubmission = ->
    vm.submissionAccepted = true;

  vm.toggleAcceptFile = (file, index) ->
    if vm.acceptedFiles.indexOf file.id > -1
      vm.acceptedFiles.splice(1, index)
    else
      vm.acceptedFiles.push file

  vm.confirmApproval = ->
    if vm.acceptedFiles.length == vm.files.length
      #Todo: PUT confirmed w/ date

  activate = ->
    vm

  activate()

FinalFixesController.$inject = ['$scope']

angular.module('appirio-tech-submissions').controller 'FinalFixesController', FinalFixesController
