'use strict'

FinalFixesController = ($scope, FileAcceptanceService) ->
  vm = this
  vm.workId = $scope.workId
  vm.submissionId = null
  vm.showConfirmApproval = false
  vm.approveAll = null

  vm.acceptAllFiles = ->
    vm.submissionAccepted = true

  vm.toggleAcceptFile = FileAcceptanceService.toggleAcceptFile

  vm.isAccepted = FileAcceptanceService.isAccepted

  vm.confirmApproval = FileAcceptanceService.confirmApproval

  watchAcceptedFilesLength = ->
    Object.keys(FileAcceptanceService.acceptedFiles).length

  watchApprovalConfirmed = ->
    FileAcceptanceService.approvalConfirmed

  $scope.$watch 'vm.approveAll', (approved) ->
    if approved
      FileAcceptanceService.approveAll vm.files
    else if approved == false
      FileAcceptanceService.unapproveAll vm.files

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

FinalFixesController.$inject = ['$scope', 'FileAcceptanceService']

angular.module('appirio-tech-submissions').controller 'FinalFixesController', FinalFixesController
