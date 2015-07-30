configs =
  __dirname : __dirname

configs.templateCache = []
configs.templateCache.push
  files : [
    '.tmp/views/submissions.directive.html'
    '.tmp/views/final-fixes.directive.html'
    '.tmp/views/submission-detail.directive.html'
    '.tmp/views/submission-slides.directive.html'
  ]
  root  : 'views/'
  module: 'appirio-tech-submissions'

configs.templateCache.push
  fileName: 'example-templates.js'
  files : [
    '.tmp/views/submissions.html'
    '.tmp/views/final-fixes.html'
    '.tmp/views/submission-detail.html'
    '.tmp/views/submission-slides.html'
  ]
  root  : 'views/'
  module: 'example'

### END CONFIG ###
loadTasksModule = require __dirname + '/node_modules/appirio-gulp-tasks/load-tasks.coffee'

loadTasksModule.loadTasks configs
