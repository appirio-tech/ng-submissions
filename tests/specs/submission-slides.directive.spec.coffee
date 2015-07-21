'use strict'

element = null
html    = '<submission-slides work-id="123" submission-id="123"></submission-slides>'

describe 'SubmissionSlidesDirective', ->
  beforeEach inject ($compile, $rootScope) ->
    compiled = $compile html
    element  = compiled $rootScope

    $rootScope.$digest()

  it 'element should have some html', ->
    expect(element.html().length).to.be.ok