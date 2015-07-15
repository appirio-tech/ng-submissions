configs =
  __dirname : __dirname

configs.templateCache =
  files : [
    '.tmp/views/submissions.directive.html'
  ]
  root  : 'views/'
  module: 'appirio-tech-submissions'


### END CONFIG ###
loadTasksModule = require __dirname + '/node_modules/appirio-gulp-tasks/load-tasks.coffee'

loadTasksModule.loadTasks configs
