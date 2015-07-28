'use strict'

SubmissionSlidesController = ($scope, SubmissionDetailAPIService, SubmissionSlidesService) ->
  vm = this
  vm.selectedPreview = null
  vm.selectedPreviewIndex = 0

  activate = ->
    params =
      workId: $scope.workId
      submissionId: $scope.submissionId

    resource = SubmissionDetailAPIService.get params

    resource.$promise.then (response) ->
      vm.work = response
      #TODO: Default to index of file id passed in stateParams
      vm.selectedPreview = vm.work?.files[vm.selectedPreviewIndex]

    resource.$promise.catch (error)->
      # TODO: add error handling
    return

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

  $scope.$watch watchSelectedPreviewIndex, setSelectedPreview

  activate()

SubmissionSlidesController.$inject = ['$scope', 'SubmissionDetailAPIService', 'SubmissionSlidesService']

angular.module('appirio-tech-submissions').controller 'SubmissionSlidesController', SubmissionSlidesController
