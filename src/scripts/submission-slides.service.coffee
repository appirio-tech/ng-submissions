'use strict'

srv = ->

  srv.previewPrevious = (selectedPreviewIndex, files)->
   isFirst = selectedPreviewIndex == 0
   if isFirst
     selectedPreviewIndex = files.length - 1
   else
     selectedPreviewIndex -= 1
    selectedPreviewIndex

  srv.previewNext = (selectedPreviewIndex, files) ->
   isLast = selectedPreviewIndex == files.length - 1
   if isLast
     selectedPreviewIndex = 0
   else
     selectedPreviewIndex += 1
    selectedPreviewIndex

  srv

srv.$inject = []

angular.module('appirio-tech-submissions').factory 'SubmissionSlidesService', srv