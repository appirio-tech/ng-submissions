'use strict'

srv = ($rootScope, helpers, StepsService, SubmissionsService, UserV3Service) ->
  currentProjectId = null
  currentStepId    = null
  rankList  = null

  rankNames = [
    '1st Place'
    '2nd Place'
    '3rd Place'
    '4th Place'
    '5th Place'
    '6th Place'
    '7th Place'
    '8th Place'
    '9th Place'
    '10th Place'
  ]

  emitUpdates = ->
    $rootScope.$emit 'RankListService:changed'

  submissionByRank = (step, submissions, rank) ->
    rankedSubmission = helpers.findInCollection step.details.rankedSubmissions, 'rank', rank

    if rankedSubmission
      helpers.findInCollection submissions, 'id', rankedSubmission.submissionId
    else
      null

  update = ->
    unless currentProjectId && currentStepId
      return null

    currentStep = StepsService.getStepById(currentProjectId, currentStepId)
    submissions = SubmissionsService.get(currentProjectId, currentStepId)
    userId      = UserV3Service.getCurrentUser()?.id

    if currentStep._pending || submissions._pending
      rankList._pending = true
    else
      numberOfRanks = Math.min currentStep.details.numberOfRanks, submissions.length

      rankList = [1..numberOfRanks].map (i) ->
        rank =
          value : i
          label : rankNames[i - 1]

        submission = submissionByRank currentStep, submissions, i

        if submission
          angular.extend rank,
            id            : submission.id
            avatarUrl     : submission.submitter.avatar
            handle        : submission.submitter.handle
            belongsToUser : submission.submitter.id == userId

        rank

      rankFull = (allFull, rank) ->
        allFull && rank.id

      rankList.allFull   = rankList.reduce rankFull, true
      rankList.confirmed = currentStep.details.customerConfirmedRanks

    emitUpdates()

  get = (projectId, stepId) ->
    unless projectId && stepId
      throw 'RankListService.get requires a projectId and a stepId'

    if projectId != currentProjectId || stepId != currentStepId
      currentProjectId = projectId
      currentStepId    = stepId
      rankList         = []

      update(projectId, stepId)

    rankList

  $rootScope.$on 'StepsService:changed', update
  $rootScope.$on 'SubmissionsService:changed', update

  name         : 'RankListService'
  get          : get

srv.$inject = ['$rootScope', 'SubmissionsHelpers', 'StepsService', 'SubmissionsService', 'UserV3Service']

angular.module('appirio-tech-submissions').factory 'RankListService', srv