'use strict'

srv = ->
  #initialize preview index and files
  srv.selectedPreviewIndex = null
  srv.files = []

  srv.initialize = (index, files) ->
   srv.selectedPreviewIndex = index
   srv.files = files

  srv.previewPrevious = ->
   isFirst = srv.selectedPreviewIndex == 0
   if isFirst
     srv.selectedPreviewIndex = srv.files.length - 1
   else
     srv.selectedPreviewIndex -= 1

  srv.previewNext = ->
   isLast = srv.selectedPreviewIndex == srv.files.length - 1
   if isLast
     srv.selectedPreviewIndex = 0
   else
     srv.selectedPreviewIndex += 1

  srv.previewSelected = (index) ->
   srv.selectedPreviewIndex = index

  srv

srv.$inject = []

angular.module('appirio-tech-submissions').factory 'SubmissionSlidesService', srv