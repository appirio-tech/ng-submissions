'use strict'

FileDetailSlideController = ($scope) ->
  vm                 = this

  vm.canUpdate   = vm.permissions?.indexOf('UPDATE') > -1
  vm.canCreate   = vm.permissions?.indexOf('CREATE') > -1

  vm.generateProfileUrl = (handle) ->
    "https://www.topcoder.com/members/#{handle}"

  vm.onFileChange = (file) ->
    vm.file = file
    $scope.onFileChange
      file: file

  vm

FileDetailSlideController.$inject = ['$scope']

angular.module('appirio-tech-submissions').controller 'FileDetailSlideController', FileDetailSlideController