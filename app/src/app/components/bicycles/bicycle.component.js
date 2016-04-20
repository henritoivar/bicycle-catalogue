(function () {
  'use strict';

  angular.module('app.bicycles')
    .component('bicycle', {
      templateUrl: 'app/components/bicycles/bicycle.html',
      controller: Ctrl,
      bindings: {}
    });

  function Ctrl($stateParams, $state, Bicycles, Toast, Modal) {
    var ctrl = this;
    ctrl.Bicycles = Bicycles;

    ctrl.$onInit = function () {
      Bicycles.initItem($stateParams.bicycleId);
    };

    ctrl.save = function () {
      if(Bicycles.getItemTotalWeight() > 50000) {
        Toast.error('Too heavy! 50kg is max!');
        return;
      }

      Bicycles.save(Bicycles.item).then(function savedSuccess(response) {
        Toast.show('Saved!');

        if (!Bicycles.item.id) {
          $state.go('app.bicycle', {
            bicycleId: response.id
          });
        }
      });
    };

    ctrl.newPart = function () {
      Bicycles.item.bicycle_parts.push(
        {name: '', weight: null, price: null}
      );
    };

    ctrl.delete = function (ev) {
      Modal.confirm(ev,
        'Delete bicycle?',
        'All related data will be gone. This action is not reversible!',
        'Delete',
        'Cancel')
        .then(function deleteConfirm() {

          // Delete
          Bicycles.delete(Bicycles.item)
            .then(function deletedSuccess() {
              Toast.show('Deleted!');
              $state.go('app.bicycles');
            });
        });
    };
  }


})();