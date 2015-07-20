'use strict'

SubmissionSlidesController = ($scope, SubmissionDetailAPIService) ->
  vm = this
  #TODO: Default to index of file id passed in stateParams
  vm.selectedPreviewIndex = 0
  vm.selectedPreview = null

  activate = ->
    #TODO: dynamic ids based on stateParams
    params =
      id: '123'
      submission_id: '321'

    resource = SubmissionDetailAPIService.get params

    resource.$promise.then (response) ->
      response
      vm.work = response
      vm.selectedPreview = vm.work.files[vm.selectedPreviewIndex]

    resource.$promise.catch (error)->
      console.log 'error on submission detail', error
    return

#restart slide show based on position in array
  vm.previewPrevious = ->
    isFirst = vm.selectedPreviewIndex == 0
    if isFirst
      vm.selectedPreviewIndex = vm.work.files.length - 1
    else
      vm.selectedPreviewIndex -= 1

  vm.previewNext = ->
    isLast = vm.selectedPreviewIndex == vm.work.files.length - 1
    if isLast
      vm.selectedPreviewIndex = 0
    else
      vm.selectedPreviewIndex += 1

  vm.previewSelected = (index)->
    vm.selectedPreviewIndex = index


  watchSelectedPreviewIndex = ->
    vm.selectedPreviewIndex

  setSelectedPreview = (index) ->
    vm.selectedPreview = vm.work.files[index] if vm.work?.files

  $scope.$watch watchSelectedPreviewIndex, setSelectedPreview

  activate()

SubmissionSlidesController.$inject = ['$scope', 'SubmissionDetailAPIService']

angular.module('appirio-tech-submissions').controller 'SubmissionSlidesController', SubmissionSlidesController
