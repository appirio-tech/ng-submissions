'use strict'

element = null
html    = '<file-detail project-id="abc" step-id="abc" submission-id="abc" file-id="abc"></file-detail>'

describe 'SubmissionSlidesDirective', ->
  beforeEach inject ($compile, $rootScope, $httpBackend) ->
    compiled = $compile html
    element  = compiled $rootScope

    $rootScope.$digest()
    $httpBackend.flush()

  it 'element should have some html', ->
    expect(element.html().length).to.be.ok