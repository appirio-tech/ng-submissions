'use strict'

SubmissionSlidesController = ($scope, $state, SubmissionDetailAPIService, SubmissionSlidesService) ->
  vm                      = this
  vm.selectedPreview      = null
  vm.selectedPreviewIndex = null
  vm.showComments = false
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
      vm.showComments = true

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
    # change url without full page reload
    if ($state.current.name)
      $state.go 'submission-slides', {submissionId: $scope.submissionId, fileId: vm.selectedPreview.id}, {notify: false}

  watchSelectedPreviewIndex = ->
    vm.selectedPreviewIndex

  setSelectedPreview = (index) ->
    vm.selectedPreview = vm.work.files[index] if vm.work?.files

  $scope.$watch watchSelectedPreviewIndex, setSelectedPreview

  activate()

SubmissionSlidesController.$inject = ['$scope', '$state', 'SubmissionDetailAPIService', 'SubmissionSlidesService']

angular.module('appirio-tech-submissions').controller 'SubmissionSlidesController', SubmissionSlidesController