'use strict'

srv = ($rootScope, helpers, StepsService, SubmissionsService, DataService) ->
  currentProjectId = null
  currentStepId    = null
  step             = null

  update = (currentStep, submissions) ->
    step             = currentStep
    submissions      = helpers.submissionsWithRanks submissions, currentStep.details.rankedSubmissions
    submissions      = helpers.sortSubmissions submissions
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

srv.$inject = ['$rootScope', 'SubmissionsHelpers', 'StepsService', 'SubmissionsService', 'DataService']

angular.module('appirio-tech-submissions').factory 'StepSubmissionsService', srv