'use strict'

SubmissionsController = ($scope, $stateParams) ->
  vm             = this
  vm.submissions = []

  activate = ->
    params =
      submissionId: $stateParams.submissionId

    vm.submissions = 
      workName: 'IBM Internal HR'
      workType: 'mobile app'
      screeningSubmissions: [
        {
          name: 'Batman'
          createdAt: '4 days ago'
          attachments: 
            url: 'http://www.topcoder.com/i/m/cardiboy_big.jpg'
        },
        {
          name: 'Robin'
          createdAt: '4 Days ago'
          attachments: 
            url: 'http://www.topcoder.com/i/m/cardiboy_big.jpg'
        },
        {
          name: 'Dude with freaking long name'
          createdAt: '4 Days ago'
          attachments: 
            url: 'http://www.topcoder.com/i/m/cardiboy_big.jpg'
        },
        {
          name: 'Jesus'
          createdAt: '4 Days ago'
          attachments: 
            url: 'http://www.topcoder.com/i/m/cardiboy_big.jpg'
        }
      ]

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
