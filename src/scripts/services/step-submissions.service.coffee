'use strict'

srv = ($rootScope, $state, StepsService, SubmissionsService, DataService) ->
  projectIdsByStepId = {}
  data               = {}

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

  update = (step, submissions) ->
    step.projectId   = projectIdsByStepId[step.id]
    data[step.id]    = step
    submissions      = submissionsWithRanks submissions, step.details.rankedSubmissions
    submissions      = sortSubmissions submissions

    submissions = submissions.map (submission) ->
      submission.detailUrl = $state.href 'submission-detail',
        projectId    : step.projectId
        stepId       : step.id
        submissionId : submission.id

      submission.files = submission.files.map (file) ->
        file.detailUrl = $state.href 'file-detail',
          projectId    : step.projectId
          stepId       : step.id
          submissionId : submission.id
          fileId       : file.id

        file

      submission

    step.submissions = submissions

    fileCount = (acc, submission) ->
      acc + submission.files.length

    step.fileCount = submissions.reduce fileCount, 0

    $rootScope.$emit "StepSubmissionsService:changed:#{step.projectId}:#{step.id}"

  get = (projectId, stepId) ->
    unless data[stepId]
      data[stepId] =
        projectId: projectId

      DataService.subscribe null, update, [
        [StepsService, 'getStepById', projectId, stepId]
        [SubmissionsService, 'get', projectId, stepId]
      ]

    data[stepId]

  get = (projectId, stepId) ->
    unless data[stepId]
      projectIdsByStepId[stepId] = projectId
      data[stepId]               = {}

      DataService.subscribe null, update, [
        [StepsService, 'getStepById', projectId, stepId]
        [SubmissionsService, 'get', projectId, stepId]
      ]

    data[stepId]

  name : 'StepSubmissionsService'
  get  : get

srv.$inject = ['$rootScope', '$state', 'StepsService', 'SubmissionsService', 'DataService']

angular.module('appirio-tech-submissions').factory 'StepSubmissionsService', srv