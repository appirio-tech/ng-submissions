'use strict'

FileDetailSlideController = ($scope, $state, DataService, StepSubmissionsService, SubmissionsService) ->
  vm                 = this
  #slide viewer
  vm.files            = $scope.files
  vm.startingFile     = $scope.startingFile
  vm.submissionNumber = $scope.submissionNumber
  vm.title            = $scope.title
  vm.file             = null

  vm.onFileChange    = $scope.onFileChange
  vm.toggleComments  = $scope.toggleComments
  vm.sendMessage     = $scope.sendMessage

  # messages
  vm.userType   = $scope.userType
  vm.status     = $scope.status
  vm.messages   = $scope.messages
  vm.canComment = $scope.canComment

  vm.newMessage   = $scope.newMessage
  vm.showMessages = $scope.showMessages

  vm.onFileChange = (file) ->
    vm.file = file
    $scope.onFileChange
      file: file

  activate = ->
    # TODO: get rid of watchers
    $scope.$watch 'showMessages', (newVal) ->
      vm.showMessages = newVal

    $scope.$watch 'vm.newMessage', (newVal) ->
      $scope.newMessage = newVal

    $scope.$watch 'newMessage', (newVal) ->
      vm.newMessage = newVal

    $scope.$watch 'messages', (newVal) ->
      vm.messages = newVal

  activate()

  vm

FileDetailSlideController.$inject = ['$scope', '$state', 'DataService', 'StepSubmissionsService', 'SubmissionsService']

angular.module('appirio-tech-submissions').controller 'FileDetailSlideController', FileDetailSlideController