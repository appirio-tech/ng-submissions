'use strict'

SubmissionSlidesController = ($scope, $state, UserV3Service, SubmissionDetailAPIService, SubmissionSlidesService) ->
  vm                      = this
  vm.selectedPreview      = null
  vm.selectedPreviewIndex = null
  vm.showComments = false
  vm.subscriberId = null
  vm.fileId               = $state.params.fileId
  vm.workId               = $scope.workId
  vm.submissionId         = $scope.submissionId

  activate = ->
    params =
      workId      : vm.workId
      submissionId: vm.submissionId

    resource = SubmissionDetailAPIService.get params

    resource.$promise.then (response) ->
      vm.work = response
      # set selected preview to fileId in stateParams

      vm.work?.files.forEach (file, index) ->
        if file.id == vm.fileId
          vm.selectedPreviewIndex = index
        else
          # default to first if file not found
          vm.selectedPreviewIndex = 0

      vm.selectedPreview = vm.work?.files[vm.selectedPreviewIndex]

    resource.$promise.catch (error)->
      # TODO: add error handling
    return

  vm.acceptFile = ->
    body =
      fileId: vm.selectedPreview.id
      submissionId: $scope.submissionId
      accepted: true
    # TODO: PUT request to API Service
    # SubmissionDetailAPIService.put body

  vm.previewPrevious =  ->
    srv = SubmissionSlidesService
    vm.selectedPreviewIndex = srv.previewPrevious vm.selectedPreviewIndex, vm.work.files

  vm.previewNext =  ->
    srv = SubmissionSlidesService
    vm.selectedPreviewIndex = srv.previewNext vm.selectedPreviewIndex, vm.work.files

  vm.previewSelected = (index) ->
    vm.selectedPreviewIndex = index

  watchSelectedPreviewIndex = ->
    vm.selectedPreviewIndex

  setSelectedPreview = (index) ->
    vm.selectedPreview = vm.work.files[index] if vm.work?.files
    # change url without full page reload
    if ($state.current.name)
      params =
        submissionId = vm.submissionId
        fileId = vm.selectedPreview?.id
      $state.go 'submission-slides', params

  $scope.$watch watchSelectedPreviewIndex, setSelectedPreview

  $scope.$watch UserV3Service.getCurrentUser, ->
    user            = UserV3Service.getCurrentUser()
    vm.subscriberId = user.id if user

  activate()

SubmissionSlidesController.$inject = ['$scope', '$state', 'UserV3Service', 'SubmissionDetailAPIService', 'SubmissionSlidesService']

angular.module('appirio-tech-submissions').controller 'SubmissionSlidesController', SubmissionSlidesController