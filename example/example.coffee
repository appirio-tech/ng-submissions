require '../src/src'
require 'appirio-tech-api-schemas'
require './styles/main.scss'
require './scripts/example.module'
require './scripts/routes'

require './scripts/file-detail'
require './scripts/file-grid.example'
require './scripts/file-row.example'
require './scripts/step'
require './scripts/submission-detail'
require './scripts/top-selections.example'

exampleNav = require './nav.jade'

document.getElementById('example-nav').innerHTML = exampleNav()

views = require.context './views/', true, /^(.*\.(jade$))[^.]*$/igm
viewPaths = views.keys()

templateCache = ($templateCache) ->
  for viewPath in viewPaths
    viewPathClean = viewPath.split('./').pop()

    # TODD: bug if .jade occurs more often than once
    viewPathCleanHtml = viewPathClean.replace '.jade', '.html'

    $templateCache.put "views/#{viewPathCleanHtml}", views(viewPath)()

templateCache.$nject = ['$templateCache']

angular.module('example').run templateCache
