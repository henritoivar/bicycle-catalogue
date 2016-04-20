(function () {
  'use strict';

  angular.module('app.bicycles')
    .component('bicycles', {
      templateUrl: 'app/components/bicycles/bicycles.html',
      controller: Ctrl,
      bindings: {}
    });

  function Ctrl(Bicycles) {
    var ctrl = this;

    ctrl.Bicycles = Bicycles;

    ctrl.$onInit = function () {
      Bicycles.initCollection();
    };
  }

})();