htmlText = null

describe 'submission details', ->
  beforeEach (done) ->
    browser.get 'http://localhost:9000/#/detail'

    $('h1').getText().then (value) ->
      htmlText = value

      done()

  it 'should have "Submission Detai" in the header', ->
    expect(htmlText).to.equal('Submission Detail')