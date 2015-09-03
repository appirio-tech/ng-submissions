'use strict'

findInCollection = (collection, prop, value) ->
  for index, el of collection
    if el[prop] == value
      return el

  null

createOrderedRankList = (rankedSubmissions, numberOfRanks) ->
  orderedRanks = []

  for i in [0...numberOfRanks] by 1
    orderedRanks[i] = null

  rankedSubmissions.forEach (submission) ->
    orderedRanks[submission.rank - 1] = submission.submissionId

  orderedRanks

removeBlankAfterN = (array, n) ->
  for i in [n...array.length] by 1
    if array[i] == null
      array.splice i, 1
      return array

  array

updateRankedSubmissions = (rankedSubmissions, numberOfRanks, id, rank) ->
  rankedSubmissions = angular.copy rankedSubmissions
  rank               = rank - 1 # We're in zero-index land

  orderedRanks = createOrderedRankList rankedSubmissions, numberOfRanks
  currentRank  = orderedRanks.indexOf id

  if currentRank >= 0
    orderedRanks.splice currentRank, 1, null

  orderedRanks.splice rank, 0, id

  orderedRanks      = removeBlankAfterN orderedRanks, rank
  rankedSubmissions = []

  orderedRanks.forEach (id, index) ->
    if id != null && index < numberOfRanks
      rankedSubmission =
        rank: (parseInt(index) + 1) + '' # Convert back to one-index land
        submissionId: id

      rankedSubmissions.push rankedSubmission

  rankedSubmissions

srv = ($q, StepsAPIService) ->

  # Used for caching
  currentProjectId = null

  stepsService =
    steps: []
    findInCollection: findInCollection

  stepsService.fetch = (projectId) ->
    if projectId != currentProjectId
      stepsService.steps = []
      currentProjectId = projectId

    params =
      projectId: projectId

    resource = StepsAPIService.query(params).$promise.then (response) ->
      stepsService.steps = response

  stepsService.updateRank = (stepId, id, rank) ->
    currentStep       = findInCollection stepsService.steps, 'id', stepId
    numberOfRanks     = currentStep.numberOfRanks
    rankedSubmissions = currentStep.rankedSubmissions
    rankedSubmissions = updateRankedSubmissions rankedSubmissions, numberOfRanks, id, rank
 
    currentStep.rankedSubmissions = rankedSubmissions

  stepsService.updateRankRemote = (projectId, stepId) ->
    step = findInCollection stepsService.steps, 'id', stepId

    params =
      projectId: projectId
      stepId   : stepId

    StepsAPIService.updateRanks(params, step).$promise.then (response) ->
      step = response

  stepsService.confirmRanks = (stepId) ->
    step = findInCollection stepsService.steps, 'id', stepId
    step.customerConfirmedRanks = true

  stepsService.confirmRanksRemote = (projectId, stepId) ->
    step = findInCollection stepsService.steps, 'id', stepId

    params =
      projectId: projectId
      stepId   : stepId

    StepsAPIService.confirmRanks(params, step).$promise.then (response) ->
      step = response

  stepsService.acceptFixes = (stepId) ->
    step = findInCollection stepsService.steps, 'id', stepId
    step.customerAcceptedFixes = true

  stepsService.acceptFixesRemote = (projectId, stepId) ->
    step = findInCollection stepsService.steps, 'id', stepId

    params =
      projectId: projectId
      stepId   : stepId

    StepsAPIService.confirmRanks(params, step).$promise.then (response) ->
      step = response

  stepsService

srv.$inject = ['$q', 'StepsAPIService']

angular.module('appirio-tech-submissions').factory 'StepsService', srv