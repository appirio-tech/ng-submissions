'use strict'

FileGridController = ($scope) ->
  vm = this

  vm.isImage = (file) ->
    pattern = new RegExp('image.*')
    pattern.test(file.fileType)

angular.module('appirio-tech-submissions').controller 'FileGridController', FileGridController