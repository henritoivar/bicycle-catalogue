(function () {

  'use strict';

  function Promise($q) {
    var service = {};

    service.resolve = function (items) {
      var deferred = $q.defer();

      deferred.resolve(items);

      return $q.defer();
    };

    return service;
  }

  angular.module('app.promise', [])
  .factory('Promise', Promise);
})();
