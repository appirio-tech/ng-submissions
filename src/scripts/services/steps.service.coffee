'use strict'

srv = ($rootScope, helpers, StepsAPIService, OptimistCollection) ->
  currentProjectId = null
  stepsByProject   = {}

  createStepCollection = ->
    newSteps = new OptimistCollection
      updateCallback: ->
        $rootScope.$emit 'StepsService:changed'
      propsToIgnore: ['$promise', '$resolved']

    newSteps

  subscribe = (scope, onChange) ->
    destroyStepsListener = $rootScope.$on 'StepsService:changed', ->
      onChange()

    scope.$on '$destroy', ->
      destroyStepsListener()

    onChange()

  dyanamicProps = (steps) ->
    if angular.isArray steps
      steps.forEach (step) ->
        step.status = helpers.statusOf step
        step.statusValue = helpers.statusValueOf step.status

    steps

  get = (projectId) ->
    unless stepsByProject[projectId]
      fetch(projectId)

    dyanamicProps stepsByProject[projectId].get()

  getCurrentStep = (projectId) ->
    filter = (step) ->
      step.stepType == 'designConcepts'

    get(projectId).filter(filter)[0]

  getStepById = (projectId, stepId) ->
    filter = (step) ->
      step.id == stepId

    get(projectId).filter(filter)[0]

  fetch = (projectId) ->
    stepsByProject[projectId] = createStepCollection()
    currentProjectId = projectId

    apiCall = () ->
      params =
        projectId: projectId

      StepsAPIService.query(params).$promise

    stepsByProject[projectId].fetch
      apiCall: apiCall

  updateStep = (projectId, stepId, step, updates) ->
    apiCall = (step) ->
      params =
        projectId: projectId
        stepId   : stepId

      StepsAPIService.patch(params, updates).$promise

    step.update
      updates: updates
      apiCall: apiCall

  updateRank = (projectId, stepId, submissionId, rank) ->
    step              = stepsByProject[projectId].findOneWhere { id: stepId }
    stepData          = step.get()
    numberOfRanks     = stepData.details.numberOfRanks
    rankedSubmissions = stepData.details.rankedSubmissions
    rankedSubmissions = helpers.updateRankedSubmissions rankedSubmissions, numberOfRanks, submissionId, rank

    updates =
      details:
        rankedSubmissions: rankedSubmissions

    updateStep projectId, stepId, step, updates

  confirmRanks = (projectId, stepId) ->
    step = stepsByProject[projectId].findOneWhere { id: stepId }
    updates =
      details:
        customerConfirmedRanks: true

    updateStep projectId, stepId, step, updates

  acceptFixes = (projectId, stepId) ->
    step = stepsByProject[projectId].findOneWhere { id: stepId }
    updates =
      details:
        customerAcceptedFixes: true

    updateStep projectId, stepId, step, updates

  name         : 'StepsService'
  get          : get
  subscribe    : subscribe
  getCurrentStep : getCurrentStep
  getStepById : getStepById
  updateRank   : updateRank
  confirmRanks : confirmRanks
  acceptFixes  : acceptFixes

srv.$inject = ['$rootScope', 'SubmissionsHelpers', 'StepsAPIService', 'OptimistCollection']

angular.module('appirio-tech-submissions').factory 'StepsService', srv