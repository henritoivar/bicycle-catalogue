(function () {
  'use strict';

  angular.module('app.router', [])
    .config(function ($urlRouterProvider) {

      $urlRouterProvider.otherwise('/app/bicycles');

    });
})();