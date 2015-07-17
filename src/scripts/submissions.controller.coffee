'use strict'

SubmissionsController = ($scope, $stateParams) ->
  vm             = this
  vm.submissions = []

  activate = ->
    params =
      submissionId: $stateParams.submissionId

    vm.submissions = 
      workName: 'IBM Internal HR',
      workType: 'mobile app',
      finalSubmissionStartDate: '2008-10-15T05:08:00.000-0400',
      screeningSubmissions: [{
        id: '1234',
        submitter: {
          id: '123456',
          handle: 'Batman',
          avatarUrl: 'http://www.topcoder.com/i/m/cardiboy_big.jpg'
        },
        accepted: true,
        createdAt: '2008-10-15T05:08:00.000-0400',
        files: {
          id: '1234567',
          accepted: true,
          thumbnailUrl: 'http://www.topcoder.com/i/m/cardiboy_big.jpg',
          url: 'http://www.topcoder.com/i/m/cardiboy_big.jpg'
        }
      }],
      finalSubmissions: [{
        id: '1234',
        submitter: {
          id: '123456',
          handle: 'Batman',
          avatarUrl: 'http://www.topcoder.com/i/m/cardiboy_big.jpg'
        },
        accepted: true,
        createdAt: '2008-10-15T05:08:00.000-0400',
        files: {
          id: '1234567',
          accepted: true,
          thumbnailUrl: 'http://www.topcoder.com/i/m/cardiboy_big.jpg',
          url: 'http://www.topcoder.com/i/m/cardiboy_big.jpg'
        }
      }]


    vm.workName = 'IBM Internal HR'
    vm.workType = 'mobile app'
    vm.screeningSubmissions = []

    vm.screeningSubmissions.push
      name: 'Batman'
      createdAt: '4 Days ago'

    vm.screeningSubmissions.push
      name: 'Robin'
      createdAt: '4 Days ago'

    vm.screeningSubmissions.push
      name: 'Dude with freaking long name'
      createdAt: '4 Days ago'

    vm.screeningSubmissions.push
      name: 'Jesus'
      createdAt: '4 Days ago'

    # SubmissionsService.getSubmissions params, onChange

    vm

  onChange = (submissions) ->
    vm.submissions = submissions


  activate()

SubmissionsController.$inject = ['$scope', '$stateParams']

angular.module('appirio-tech-submissions').controller 'SubmissionsController', SubmissionsController
