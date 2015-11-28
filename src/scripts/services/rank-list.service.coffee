'use strict'

srv = ($rootScope, DataService, StepsService, SubmissionsService) ->
  currentProjectId = null
  currentStepId    = null
  rankList         = null

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

  submissionByRank = (step, submissions, rankValue) ->
    rankedSubmission = step.details.rankedSubmissions.filter((submission) -> submission.rank == rankValue)[0]

    if rankedSubmission
      submissions.filter((submission) -> submissions.id == rankedSubmission.submissionId)[0]
    else
      null

  update = (currentStep, submissions) ->
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
          belongsToUser : submission.submitter.belongsToUser

      rank

    rankFull = (allFull, rank) ->
      allFull && rank.id

    rankList.allFull   = rankList.reduce rankFull, true
    rankList.confirmed = currentStep.details.customerConfirmedRanks

    $rootScope.$emit 'RankListService:changed'

  get = (projectId, stepId) ->
    unless projectId && stepId
      throw 'RankListService.get requires a projectId and a stepId'

    if projectId != currentProjectId || stepId != currentStepId
      currentProjectId = projectId
      currentStepId    = stepId
      rankList         = []

      DataService.subscribe null, update, [
        [StepsService, 'getStepById', currentProjectId, currentStepId]
        [SubmissionsService, 'get', currentProjectId, currentStepId]
      ]

    rankList

  name         : 'RankListService'
  get          : get

srv.$inject = ['$rootScope', 'DataService', 'StepsService', 'SubmissionsService']

angular.module('appirio-tech-submissions').factory 'RankListService', srv