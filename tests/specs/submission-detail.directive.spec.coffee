'use strict'

element = null
html    = '<submission-detail project-id="abc" step-id="abc" submission-id="abc"></submission-detail>'

describe 'SubmissionDetailDirective', ->
  beforeEach inject ($compile, $rootScope, $httpBackend) ->
    compiled = $compile html
    element  = compiled $rootScope

    $rootScope.$digest()
    $httpBackend.flush()

  it 'element should have some html', ->
    expect(element.html().length).to.be.ok