require 'appirio-tech-ng-ui-components'
require 'appirio-tech-ng-auth'
require 'appirio-tech-ng-optimist'
require './scripts/submissions.module'

requireContextFiles = (files) ->
  paths = files.keys()

  for path in paths
    files path

styles      = require.context './styles/', true, /^(.*\.(scss$))[^.]*$/igm
directives  = require.context './scripts/directives/', true, /^(.*\.(coffee$))[^.]*$/igm
controllers = require.context './scripts/controllers/', true, /^(.*\.(coffee$))[^.]*$/igm
services    = require.context './scripts/services/', true, /^(.*\.(coffee$))[^.]*$/igm

requireContextFiles directives
requireContextFiles controllers
requireContextFiles services
requireContextFiles styles

views = require.context './views/', true, /^(.*\.(jade$))[^.]*$/igm
viewPaths = views.keys()

templateCache = ($templateCache) ->
  for viewPath in viewPaths
    viewPathClean = viewPath.split('./').pop()

    # TODD: bug if .jade occurs more often than once
    viewPathCleanHtml = viewPathClean.replace '.jade', '.html'

    $templateCache.put "views/#{viewPathCleanHtml}", views(viewPath)()

templateCache.$nject = ['$templateCache']

angular.module('appirio-tech-submissions').run templateCache
