'use strict'

FinalFixesController = ($scope, FileAcceptanceService, FinalFixesAPIService, FileAcceptanceAPIService) ->
  vm = this
  vm.workId = $scope.workId
  vm.submissionId = null
  vm.showConfirmApproval = false
  vm.approveAll = null

  vm.confirmApproval = ->
    params =
      workId: vm.workId
    body =
      confirmed: true

    resource = FinalFixesAPIService.put params, body

    resource.$promise.then (response) ->
      # vm.files = data
      vm.approvalConfirmed = true

    resource.$promise.catch (error) ->
      #TODO: add error handling
      console.log('confirm error', error)

  $scope.$watch 'vm.approveAll', (approved) ->
    if approved
      vm.showConfirmApproval = true
    else if approved == false
      vm.showConfirmApproval = false

  activate = ->
    params =
      workId      : vm.workId

    resource = FinalFixesAPIService.get params

    resource.$promise.then (response) ->
      vm.work             = response
      vm.submissionId = vm.work.id
      vm.files = vm.work.files
      console.log('vm.work', vm.work)
      if vm.work.confirmed
        vm.approvalConfirmed = true
    #TODO: set based on response
      vm.approvalConfirmed = false
      vm.remainingTime = 39
    vm

  activate()

FinalFixesController.$inject = ['$scope', 'FileAcceptanceService', 'FinalFixesAPIService', 'FileAcceptanceAPIService']

angular.module('appirio-tech-submissions').controller 'FinalFixesController', FinalFixesController
