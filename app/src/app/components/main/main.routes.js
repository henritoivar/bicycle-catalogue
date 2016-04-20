(function () {
  'use strict';

  angular.module('app.main')
    .config(function ($stateProvider) {

      $stateProvider
        .state('app', {
          url: '/app',
          abstract: true,
          template: '<main></main>'
        });

    });

})();