'use strict'

FileDetailSlideController = ($scope) ->
  vm                 = this

  vm.canUpdate   = vm.permissions?.indexOf('UPDATE') > -1
  vm.canCreate   = vm.permissions?.indexOf('CREATE') > -1

  vm.onFileChange = (file) ->
    vm.file = file
    $scope.onFileChange
      file: file

  vm

FileDetailSlideController.$inject = ['$scope']

angular.module('appirio-tech-submissions').controller 'FileDetailSlideController', FileDetailSlideController