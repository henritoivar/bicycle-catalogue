(function () {
  'use strict';

  angular.module('app.navbar')
    .component('navbar', {
      templateUrl: 'app/components/main/navbar/navbar.html',
      controller: Ctrl,
      bindings: {}
    });

  function Ctrl() {
  }

})();