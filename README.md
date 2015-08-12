# Submissions
[![Build Status](https://travis-ci.org/appirio-tech/ng-submissions.svg)](https://travis-ci.org/appirio-tech/ng-submissions)
[![Coverage Status](https://coveralls.io/repos/appirio-tech/ng-submissions/badge.svg?branch=master&service=github&t=UHjCEN)](https://coveralls.io/github/appirio-tech/ng-submissions?branch=master)[![Dependency Status](https://david-dm.org/bower/bower.svg)](https://david-dm.org/bower/bower)

## Docs
### Examples
```jade
final-fixes(work-id="leonardo")

submission-detail(work-id="123" submission-id="123")

submission-slides(work-id="123" submission-id="123")
submissions(work-id="leonardo" phase="Final")
```


### Designs
https://drive.google.com/drive/folders/0B6NlMQSXkImbfm5DcEZqN1JPN1R6MGVvbDdzTEEtVlZPQTBjNU1QYVRaWVFfcXZQN2FjZkk

### User requirements
https://appirio.atlassian.net/wiki/display/ProdDevOverview/Collaboration+for+Mobile+Design+Submissions

## Development
```
alias gserve='nvm use; gulp clean; gulp serve'
alias gtest='nvm use; gulp test'
alias gtestserve='nvm use; gulp test-serve'
alias gbuild='nvm use; gulp clean; gulp preprocessors; gulp useref; gulp copy-files; gulp remove-code'
alias ge2e='gbuild; gulp test; gulp e2e;'
```
