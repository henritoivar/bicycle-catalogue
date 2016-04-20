(function () {
  'use strict';

  angular.module('app.toast', [])
    .service('Toast', function (toastr) {
      var service = {};

      service.show = function (message) {
        return toastr.info(message);
      };

      service.error = function (message) {
        return toastr.error(message);
      };

      return service;
    });
})();