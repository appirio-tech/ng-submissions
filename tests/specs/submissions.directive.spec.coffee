'use strict'

element = null
html    = '<submissions link-id="123" phase="Final"></submissions>'

describe 'SubmissionsDirective', ->
  beforeEach inject ($compile, $rootScope) ->
    compiled = $compile html
    element  = compiled $rootScope

    $rootScope.$digest()

  it 'element should have some html', ->
    expect(element.html().length).to.be.ok