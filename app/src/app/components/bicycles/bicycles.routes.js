(function () {
  'use strict';

  angular.module('app.bicycles')
    .config(function ($stateProvider) {

      $stateProvider
        .state('app.bicycles', {
          url: '/bicycles',
          views: {
            content: {
              template: '<bicycles></bicycles>'
            }
          }
        })
        .state('app.bicycle', {
          url: '/bicycles/:bicycleId',
          views: {
            content: {
              template: '<bicycle></bicycle>'
            }
          }
        });

    });

})();