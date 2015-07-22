'use strict'

filter = ->
  (createdAt) ->
    moment(createdAt).fromNow()

angular.module('appirio-tech-submissions').filter 'timeLapse', filter
