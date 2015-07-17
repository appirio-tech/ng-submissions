'use strict'

SubmissionSlidesController = ($scope, SubmissionDetailService) ->
  vm = this
  #TODO: Default to index of file id passed in stateParams
  vm.selectedPreviewIndex = 0;
  vm.selectedPreview = null;

  activate = ->
    #TODO: dynamic ids based on stateParams
    params =
      id: '123',
      submission_id: '321'
    SubmissionDetailService.getSubmissionDetail(params).then (response) ->
      vm.work = response
      vm.selectedPreview = vm.work.files[vm.selectedPreviewIndex]
    return

#restart slide show based on position in array
  vm.previewPrevious = ->
    if vm.selectedPreviewIndex == 0
      vm.selectedPreviewIndex = vm.work.files.length-1
    else
      vm.selectedPreviewIndex--
    return

  vm.previewNext = ->
    if vm.selectedPreviewIndex == vm.work.files.length-1
      vm.selectedPreviewIndex = 0
    else
      vm.selectedPreviewIndex++
    return

  vm.previewSelected = (index)->
    vm.selectedPreviewIndex = index
    return

  watchSelectedPreviewIndex = ->
    vm.selectedPreviewIndex

  setSelectedPreview = (index) ->
    if vm.work?.files
      vm.selectedPreview = vm.work.files[index]
    return

  $scope.$watch watchSelectedPreviewIndex, setSelectedPreview

  activate()

SubmissionSlidesController.$inject = ['$scope', 'SubmissionDetailService']

angular.module('appirio-tech-submissions').controller 'SubmissionSlidesController', SubmissionSlidesController
