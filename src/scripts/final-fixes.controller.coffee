'use strict'

FinalFixesController = ($scope, FileAcceptanceService, FinalFixesAPIService, FileAcceptanceAPIService) ->
  vm = this
  vm.workId = $scope.workId
  vm.submissionId = null
  vm.showConfirmApproval = false
  vm.approveAll = null

  vm.toggleAcceptFile = (file) ->
    fileResource = FileAcceptanceService.toggleAcceptFile(file, vm.work.id).$promise
    fileResource.then (data) ->
      console.log('data', data)
    fileResource.catch (error)->
      console.log('err', error)

  vm.confirmApproval = ->
    acceptResource = FileAcceptanceService.confirmApproval(vm.work.id).$promise
    acceptResource.then (data) ->
      vm.files = data
      if vm.files.confirmed
        vm.approvalConfirmed = true
    acceptResource.catch (error) ->
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
      vm.files = vm.work.files
    #TODO: set based on response
      vm.approvalConfirmed = vm.work.confirmed || false
      vm.remainingTime = 39
      vm.submissionId = 'abc'
    vm

  activate()

FinalFixesController.$inject = ['$scope', 'FileAcceptanceService', 'FinalFixesAPIService', 'FileAcceptanceAPIService']

angular.module('appirio-tech-submissions').controller 'FinalFixesController', FinalFixesController
