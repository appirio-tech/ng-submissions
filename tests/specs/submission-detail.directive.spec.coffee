'use strict'

element = null
html    = '<submission-detail></submission-detail>'

describe 'SubmissionDetailDirective', ->
  beforeEach inject ($compile, $rootScope) ->
    compiled = $compile html
    element  = compiled $rootScope

    $rootScope.$digest()

  it 'element should have some html', ->
    expect(element.html().length).to.be.ok