'use strict'

FileDetailController = ($scope, $rootScope, SubmissionsService) ->
  vm = this

  vm.loaded       = false
  vm.submission   = {}
  vm.file         = {}
  vm.prevFile     = null
  vm.nextFile     = null
  vm.showMessages = false
  vm.projectId    = $scope.projectId
  vm.stepId       = $scope.stepId
  vm.submissionId = $scope.submissionId
  vm.fileId       = $scope.fileId

  activate = ->
    destroySubmissionsListener = $rootScope.$on 'submissionsService.submissions:changed', ->
      onChange()

    $scope.$on '$destroy', ->
      destroySubmissionsListener()

    SubmissionsService.fetch vm.projectId, vm.stepId

  findInCollection = (collection, prop, value) ->
    for index, el of collection
      if el[prop] == value
        return el

    null

  onChange = ->
    submissions = SubmissionsService.submissions

    if submissions <= 0
      return null

    vm.loaded         = true
    currentSubmission = findInCollection submissions, 'id', vm.submissionId
    vm.submission     = angular.copy currentSubmission
    vm.submission     = SubmissionsService.decorateSubmissionWithUnreadCounts vm.submission
    vm.file           = findInCollection vm.submission.files, 'id', vm.fileId

    currentIndex = vm.submission.files.indexOf vm.file

    prevIndex = currentIndex - 1
    if prevIndex < 0
      prevIndex = vm.submission.files.length - 1

    nextIndex = parseInt(currentIndex) + 1
    if nextIndex >= vm.submission.files.length
      nextIndex = 0

    vm.prevFile  = vm.submission.files[prevIndex]
    vm.nextFile  = vm.submission.files[nextIndex]

  activate()

  vm

FileDetailController.$inject = ['$scope', '$rootScope', 'SubmissionsService']

angular.module('appirio-tech-submissions').controller 'FileDetailController', FileDetailController