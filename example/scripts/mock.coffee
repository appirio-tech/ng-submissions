AutoConfigFakeServer.init()

AutoConfigFakeServer.fakeServer.autoRespond = true

schemas = [
  FIXTURES['bower_components/appirio-tech-api-schemas/swagger/v3-submissions.json']
  FIXTURES['bower_components/appirio-tech-api-schemas/swagger/v3-authorizations.json']
  FIXTURES['bower_components/appirio-tech-api-schemas/swagger/v3-messages.json']
  FIXTURES['bower_components/appirio-tech-api-schemas/swagger/v3-threads.json']
  FIXTURES['bower_components/appirio-tech-api-schemas/swagger/v3-users.json']
  FIXTURES['bower_components/appirio-tech-api-schemas/swagger/v2.json']
  FIXTURES['bower_components/appirio-tech-api-schemas/apiary/submissiondraft.json']
];

AutoConfigFakeServer.consume(schemas)

localStorage.setItem('userJWTToken', '"yyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS50b3Bjb2Rlci1kZXYuY29tIiwiZXhwIjoxNDMzMjcxNzYwLCJ1c2VySWQiOiI0MDEzNTUxNiIsImlhdCI6MTQzMzI3MTE2MCwianRpIjoiMDZhNzVjM2EtMTQ0MC00MWE3LTk5N2YtZmFmMGVjZjFmOGM1In0.okSjl5KOmGQ6hJEoQxk4SVkFra65_Id6KUQGdAVmJNe"')