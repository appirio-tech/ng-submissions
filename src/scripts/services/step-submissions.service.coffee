'use strict'

srv = ($rootScope, $state, helpers, StepsService, SubmissionsService, DataService) ->
  currentProjectId = null
  currentStepId    = null
  step             = null

  update = (currentStep, submissions) ->
    step             = currentStep
    submissions      = helpers.submissionsWithRanks submissions, currentStep.details.rankedSubmissions
    submissions      = helpers.sortSubmissions submissions

    submissions = submissions.map (submission) ->
      submission.detailUrl = $state.href 'submission-detail',
        projectId    : currentProjectId
        stepId       : currentStepId
        submissionId : submission.id

      submission.files = submission.files.map (file) ->
        file.detailUrl = $state.href 'file-detail',
          projectId    : currentProjectId
          stepId       : currentStepId
          submissionId : submission.id
          fileId       : file.id

        file

      submission

    step.submissions = submissions

    $rootScope.$emit 'StepSubmissionsService:changed'

  get = (projectId, stepId) ->
    if projectId != currentProjectId || stepId != currentStepId
      currentProjectId = projectId
      currentStepId    = stepId
      step             = {}

      DataService.subscribe null, update, [
        [StepsService, 'getStepById', currentProjectId, currentStepId]
        [SubmissionsService, 'get', currentProjectId, currentStepId]
      ]

    step

  name : 'StepSubmissionsService'
  get  : get

srv.$inject = ['$rootScope', '$state', 'SubmissionsHelpers', 'StepsService', 'SubmissionsService', 'DataService']

angular.module('appirio-tech-submissions').factory 'StepSubmissionsService', srv