'use strict'

element = null
html    = '<final-fixes work-id="123"></final-fixes>'

describe 'FinalFixesDirective', ->
  beforeEach inject ($compile, $rootScope) ->
    compiled = $compile html
    element  = compiled $rootScope

    $rootScope.$digest()

  it 'element should have some html', ->
    expect(element.html().length).to.be.ok