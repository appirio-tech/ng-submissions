'use strict'

element = null
html    = '<final-fixes project-id="abc" step-id="abc"></final-fixes>'

describe 'FinalFixesDirective', ->
  beforeEach inject ($compile, $rootScope, $httpBackend) ->
    compiled = $compile html
    element  = compiled $rootScope

    $rootScope.$digest()
    $httpBackend.flush()

  it 'element should have some html', ->
    expect(element.html().length).to.be.ok