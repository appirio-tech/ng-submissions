'use strict'

srv = ($rootScope, $state, StepsService, SubmissionsService, DataService) ->
  currentProjectId = null
  currentStepId    = null
  step             = null

  submissionWithRank = (submission, rankedSubmissions = []) ->
    submission.rank = ''
    rankedSubmissions.forEach (rankedSubmission) ->
      if submission.id == rankedSubmission.submissionId
        submission.rank = rankedSubmission.rank

    submission

  submissionsWithRanks = (submissions, rankedSubmissions = []) ->
    submissions.map (submission) ->
      submissionWithRank submission, rankedSubmissions

  sortSubmissions = (submissions) ->
    ranked = submissions.filter (submission) ->
      submission.rank != ''

    unRanked = submissions.filter (submission) ->
      submission.rank == ''

    orderedByRank = ranked.sort (previousSubmission, nextSubmission) ->
      return previousSubmission.rank - nextSubmission.rank

    orderedBySubmitter = unRanked.sort (previousSubmission, nextSubmission) ->
      previousSubmission.submitter.id - nextSubmission.submitter.id

    orderedSubmissions = orderedByRank.concat orderedBySubmitter
    orderedSubmissions

  update = (currentStep, submissions) ->
    step             = currentStep
    submissions      = submissionsWithRanks submissions, currentStep.details.rankedSubmissions
    submissions      = sortSubmissions submissions

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

    fileCount = (acc, submission) ->
      acc + submission.files.length

    step.fileCount = submissions.reduce fileCount, 0

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

srv.$inject = ['$rootScope', '$state', 'StepsService', 'SubmissionsService', 'DataService']

angular.module('appirio-tech-submissions').factory 'StepSubmissionsService', srv