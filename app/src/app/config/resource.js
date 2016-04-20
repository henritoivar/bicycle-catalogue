(function () {

  'use strict';

  angular.module('app.resource', [])
    .config(function ($resourceProvider) {
      // extend the default actions
      angular.extend($resourceProvider.defaults.actions,{

        // put your defaults here
        update : {
          method : 'PATCH'
        }

      });
    });

})();