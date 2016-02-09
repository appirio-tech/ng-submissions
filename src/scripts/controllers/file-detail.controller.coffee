'use strict'

FileDetailController = ($scope, $state, DataService, StepSubmissionsService, SubmissionsService) ->
  vm              = this
  vm.projectId    = $scope.projectId
  vm.stepId       = $scope.stepId
  vm.submissionId = $scope.submissionId
  vm.fileId       = $scope.fileId
  vm.userType     = $scope.userType
  vm.permissions  = $scope.permissions

  vm.canUpdate   = vm.permissions?.indexOf('UPDATE') > -1
  vm.canCreate   = vm.permissions?.indexOf('CREATE') > -1

  vm

FileDetailController.$inject = ['$scope', '$state', 'DataService', 'StepSubmissionsService', 'SubmissionsService']

angular.module('appirio-tech-submissions').controller 'FileDetailController', FileDetailController