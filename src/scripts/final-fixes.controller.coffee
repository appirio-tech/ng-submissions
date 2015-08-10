'use strict'

FinalFixesController = ($scope, FileAcceptanceService, FinalFixesAPIService, FileAcceptanceAPIService) ->
  vm = this
  vm.workId = $scope.workId
  vm.submissionId = null
  vm.showConfirmApproval = false
  vm.approveAll = null

  vm.toggleAcceptFile = (file) ->
    fileResource = FileAcceptanceService.toggleAcceptFile file, vm.workId
    fileResource.$promise.then (data) ->
      console.log('data', data)
    fileResource.$promise.catch (error)->
      console.log('err', error)

  vm.confirmApproval = ->
    acceptResource = FileAcceptanceService.confirmApproval vm.workId
    acceptResource.$promise.then (data) ->
      # vm.files = data
      console.log('accepted data', data)
      if vm.files.confirmed
        vm.approvalConfirmed = true
    acceptResource.$promise.catch (error) ->
      #TODO: add error handling
      console.log('confirm error', error)

  watchAcceptedFilesLength = ->
    if vm.files
      acceptedFiles = vm.files.filter (file) ->
        file.accepted
      acceptedFiles.length

  $scope.$watch 'vm.approveAll', (approved) ->
    if approved
      FileAcceptanceService.approveAll vm.files?
    else if approved == false
      FileAcceptanceService.unapproveAll vm.files?

  $scope.$watch watchAcceptedFilesLength, (acceptedFilesLength) ->
    if acceptedFilesLength == vm.files?.length
      vm.showConfirmApproval = true
    else
      vm.showConfirmApproval = false

  activate = ->
    params =
      workId      : vm.workId

    resource = FinalFixesAPIService.get params

    resource.$promise.then (response) ->
      vm.work             = response
      vm.submissionId = vm.work.id
      vm.files = vm.work.files
      if vm.work.confirmed
        vm.approvalConfirmed = true
    #TODO: set based on response
      vm.approvalConfirmed = false
      vm.remainingTime = 39
    vm

  activate()

FinalFixesController.$inject = ['$scope', 'FileAcceptanceService', 'FinalFixesAPIService', 'FileAcceptanceAPIService']

angular.module('appirio-tech-submissions').controller 'FinalFixesController', FinalFixesController
