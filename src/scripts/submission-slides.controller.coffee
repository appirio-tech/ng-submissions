'use strict'

SubmissionSlidesController = ($scope, SubmissionDetailAPIService, SubmissionSlidesService) ->
  vm = this
  vm.selectedPreview = null

  activate = ->
    params =
      workId: $scope.workId
      submissionId: $scope.submissionId

    resource = SubmissionDetailAPIService.get params

    resource.$promise.then (response) ->
      vm.work = response
      #TODO: Default to index of file id passed in stateParams
      SubmissionSlidesService.initialize(0, vm.work?.files)

    resource.$promise.catch (error)->
      # TODO: add error handling
    return

  vm.previewPrevious = ->
    SubmissionSlidesService.previewPrevious()

  vm.previewNext = ->
    SubmissionSlidesService.previewNext()

  vm.previewSelected = (index)->
    SubmissionSlidesService.previewSelected index

  watchSelectedPreviewIndex = ->
    SubmissionSlidesService.selectedPreviewIndex

  setSelectedPreview = (index) ->
    vm.selectedPreview = vm.work.files[index] if vm.work?.files

  $scope.$watch watchSelectedPreviewIndex, setSelectedPreview

  activate()

SubmissionSlidesController.$inject = ['$scope', 'SubmissionDetailAPIService', 'SubmissionSlidesService']

angular.module('appirio-tech-submissions').controller 'SubmissionSlidesController', SubmissionSlidesController
