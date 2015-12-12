'use strict'

FileDetailSlideController = ($scope, $state, DataService, StepSubmissionsService, SubmissionsService) ->
  vm                 = this
  #slide viewer
  vm.files           = $scope.files
  vm.startingFile    = $scope.startingFile
  vm.submitterAvatar = $scope.submitterAvatar
  vm.submitterHandle = $scope.submitterHandle
  vm.file            = null

  vm.onFileChange    = $scope.onFileChange
  vm.toggleComments  = $scope.toggleComments
  vm.sendMessage     = $scope.sendMessage

  # messages
  vm.userType       = $scope.userType
  vm.status         = $scope.status
  vm.messages       = $scope.messages
  vm.canComment     = $scope.canComment


  # vm.messages     = []
  vm.newMessage   = ''
  vm.showMessages = false

  vm.onFileChange = (file) ->
    $scope.onFileChange
      file: file

  vm

FileDetailSlideController.$inject = ['$scope', '$state', 'DataService', 'StepSubmissionsService', 'SubmissionsService']

angular.module('appirio-tech-submissions').controller 'FileDetailSlideController', FileDetailSlideController