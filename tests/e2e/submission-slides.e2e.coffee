htmlText = null

describe 'submission details', ->
  beforeEach (done) ->
    browser.get 'http://localhost:9000/#/slides'

    $('h1').getText().then (value) ->
      htmlText = value

      done()

  it 'should have "Submission Slides" in the header', ->
    expect(htmlText).to.equal('Submission Slides')