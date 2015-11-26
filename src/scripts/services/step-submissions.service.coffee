'use strict'

srv = ($rootScope, helpers, StepsService, SubmissionsService, UserV3Service, DataService) ->
  watching         = false
  currentProjectId = null
  currentStepId    = null
  step             = null

  emitUpdates = ->
    $rootScope.$emit 'StepSubmissionsService:changed'

  update = (currentStep, submissions) ->
    userId = UserV3Service.getCurrentUser()?.id

    step = currentStep
    step.status = helpers.statusOf step
    step.statusValue = helpers.statusValueOf step.status

    submissions = helpers.submissionsWithRanks submissions, currentStep.details.rankedSubmissions
    submissions = helpers.sortSubmissions submissions
    submissions = helpers.submissionsWithMessageCounts submissions
    submissions = helpers.submissionsWithOwnership submissions, userId
    submissions = helpers.submissionsWithFileTypes submissions
    submissions = helpers.submissionsFilteredByType submissions

    step.submissions = submissions

    emitUpdates()

  get = (projectId, stepId) ->
    unless projectId && stepId
      throw 'StepSubmissionsService.get requires a projectId and a stepId'

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

srv.$inject = ['$rootScope', 'SubmissionsHelpers', 'StepsService', 'SubmissionsService', 'UserV3Service', 'DataService']

angular.module('appirio-tech-submissions').factory 'StepSubmissionsService', srv