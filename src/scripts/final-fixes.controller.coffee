'use strict'

FinalFixesController = ($scope, FinalFixesAPIService) ->
  vm = this
  vm.loading = true
  vm.workId = $scope.workId
  vm.submissionId = null
  vm.showConfirmApproval = false
  vm.approveAll = null
  vm.timeline = []

  vm.confirmApproval = ->
    vm.loading = true

    params =
      workId: vm.workId

    body =
      confirmed: true

    resource = FinalFixesAPIService.put params, body

    resource.$promise.then (response) ->
      vm.approvalConfirmed = true

    resource.$promise.catch (error) ->
      #TODO: add error handling

    resource.$promise.finally ->
      vm.loading = false

  $scope.$watch 'vm.approveAll', (approved) ->
    if approved
      vm.showConfirmApproval = true
    else if approved == false
      vm.showConfirmApproval = false

  activate = ->

    if $scope.phase == 'final-fixes'
      vm.timeline = [ '', '', 'active' ]
      vm.phase =
        previous:
          name: 'Complete Concepts'
          sref: 'complete-designs'
        current:
          name: 'Final Fixes'
        next:
          name: null
          sref: null


    params =
      workId      : vm.workId

    resource = FinalFixesAPIService.get params

    resource.$promise.then (response) ->
      vm.work             = response
      console.log('the response', response)
      vm.submissionId = vm.work.id
      vm.files = vm.work.files
    #TODO: set based on response
      # vm.remainingTime = vm.work.phase.endDate
      # if vm.work.confirmed
      #   vm.approvalConfirmed = true
      vm.approvalConfirmed = false
      if Date.now() > new Date(vm.work.phase.startDate)
        vm.open = true

     resource.$promise.catch (response) ->
       # TODO: add error handling

     resource.$promise.finally ->
       vm.loading = false

    vm

  activate()

FinalFixesController.$inject = ['$scope', 'FinalFixesAPIService']

angular.module('appirio-tech-submissions').controller 'FinalFixesController', FinalFixesController
