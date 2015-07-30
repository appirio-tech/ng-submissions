htmlText = null

describe 'Final Fixes', ->
  beforeEach (done) ->
    browser.get 'http://localhost:9999/#/final-fixes'

    $('h1').getText().then (value) ->
      htmlText = value

      done()

  it 'should have "Final Fixes" in the header', ->
    expect(htmlText).to.equal('Final Fixes')