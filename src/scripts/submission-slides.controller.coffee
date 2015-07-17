'use strict'

SubmissionSlidesController = ($scope, SubmissionDetailService) ->
  vm = this
  vm.work = null
  vm.files = null;
  #TODO: Default to index of file id passed in stateParams
  vm.selectedPreviewIndex = 0;
  vm.selectedPreview = null;

  activate = ->
    vm.work = SubmissionDetailService.initializeSubmissionDetail()
    vm.files = vm.work.files
    vm.selectedPreview = vm.files[vm.selectedPreviewIndex]
    return

  previewPrevious = ->
    if vm.selectedPreviewIndex == 0
      vm.selectedPreviewIndex = vm.files.length - 1
    else
      vm.selectedPreviewIndex++
    return

  watchSelectedPreviewIndex = ->
    vm.selectedPreviewIndex

  setSelectedPreviewIndex = (index) ->
    vm.selectedPreview = vm.files[index]
    return

  $scope.$watch watchSelectedPreviewIndex, setSelectedPreviewIndex

  activate()

SubmissionSlidesController.$inject = ['$scope', 'SubmissionDetailService']

angular.module('appirio-tech-submissions').controller 'SubmissionSlidesController', SubmissionSlidesController
