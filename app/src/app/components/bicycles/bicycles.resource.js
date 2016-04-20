(function () {
  'use strict';

  function Resource($resource, API) {
    return $resource(API.url + '/bicycles/:bicycleId');
  }

  angular.module('app.bicycles')
    .factory('BicyclesResource', Resource);

})();