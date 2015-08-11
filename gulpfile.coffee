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

configs.ngConstants =
  constants:
    apiUrl                  : 'http://api.topcoder.com/v3/' # slash is grandfathered in, need to remove
    API_URL                 : 'http://api.topcoder.com/v3'
    API_URL_V2              : 'https://api.topcoder.com/v2'
    AVATAR_URL              : 'http://www.topcoder.com'
    SUBMISSION_URL          : 'https://studio.topcoder.com'
    AUTH0_CLIENT_ID         : 'abc123'
    AUTH0_DOMAIN            : 'topcoder.auth0.com'
    AUTH0_TOKEN_NAME        : 'userJWTToken'
    AUTH0_REFRESH_TOKEN_NAME: 'userRefreshJWTToken'

### END CONFIG ###
loadTasksModule = require __dirname + '/node_modules/appirio-gulp-tasks/load-tasks.coffee'

loadTasksModule.loadTasks configs
