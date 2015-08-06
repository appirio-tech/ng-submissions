'use strict'

FinalFixesController = ($scope, FinalFixesService) ->
  vm = this
  vm.workId = $scope.workId
  vm.submissionId = null
  vm.showConfirmApproval = false
  vm.approveAll = null

  vm.acceptAllFiles = ->
    vm.submissionAccepted = true

  vm.toggleAcceptFile = FinalFixesService.toggleAcceptFile

  vm.isAccepted = FinalFixesService.isAccepted

  vm.confirmApproval = FinalFixesService.confirmApproval

  watchAcceptedFilesLength = ->
    Object.keys(FinalFixesService.acceptedFiles).length

  watchApprovalConfirmed = ->
    FinalFixesService.approvalConfirmed

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

  $scope.$watch watchApprovalConfirmed, (confirmed) ->
    if (confirmed)
      vm.approvalConfirmed = true

  activate = ->
    #TODO: GET request
    vm.files = JSON.parse '[{"id":"abc","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"def","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"ghi","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"jkl","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"pqr","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"},{"id":"mno","name":"luke-i-m-your-father.jpg","accepted":true,"thumbnailUrl":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg","url":"https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"}]'
    #TODO: set based on response
    vm.approvalConfirmed = false
    vm.remainingTime = 39
    vm.submissionId = 'abc'
    vm

  activate()

FinalFixesController.$inject = ['$scope', 'FinalFixesService']

angular.module('appirio-tech-submissions').controller 'FinalFixesController', FinalFixesController
