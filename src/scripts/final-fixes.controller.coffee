'use strict'

FinalFixesController = ($scope, FinalFixesService) ->
  vm = this
  vm.acceptedFiles = []
  vm.showConfirmApproval = false
  vm.approveAll = null
  #TODO: set based on 'confirmed' response body
  vm.approvalConfirmed = false
  #TODO: GET request in activate function
  vm.files = JSON.parse '[{"id":"abc","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"def","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"ghi","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"jkl","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"pqr","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"mno","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"}]'

  vm.acceptAllFiles = ->
    vm.submissionAccepted = true

  vm.toggleAcceptFile = FinalFixesService.toggleAcceptFile

  vm.isAccepted = FinalFixesService.isAccepted

  vm.confirmApproval = FinalFixesService.confirmApproval

  watchAcceptedFilesLength = ->
    Object.keys(FinalFixesService.acceptedFiles).length

  $scope.$watch 'vm.approveAll', (approved) ->
    if approved
      FinalFixesService.approveAll vm.files
    else if approved == false
      FinalFixesService.unapproveAll vm.files


  $scope.$watch watchAcceptedFilesLength, (acceptedFilesLength) ->
    if acceptedFilesLength == vm.files.length
      vm.showConfirmApproval = true
    else
      vm.showConfirmApproval = false


  activate = ->
    vm

  activate()

FinalFixesController.$inject = ['$scope', 'FinalFixesService']

angular.module('appirio-tech-submissions').controller 'FinalFixesController', FinalFixesController
