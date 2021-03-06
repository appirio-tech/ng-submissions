'use strict'

element = null
html    = '<submissions project-id="abc" step-id="abc" step-type="designConcepts"></submissions>'

describe 'SubmissionsDirective', ->
  beforeEach inject ($compile, $rootScope, $httpBackend) ->
    compiled = $compile html
    element  = compiled $rootScope

    $rootScope.$digest()
    $httpBackend.flush()

  it 'element should have some html', ->
    expect(element.html().length).to.be.ok