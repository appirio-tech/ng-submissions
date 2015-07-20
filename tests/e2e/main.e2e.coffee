submissionsText = null

describe 'login', ->
  beforeEach (done) ->
    browser.get 'http://localhost:9000/#/'

    $('submissions').getText().then (value) ->
      submissionsText = value

      done()

  it 'should have batman in header', ->
    expect(submissionsText.length).to.be.ok
