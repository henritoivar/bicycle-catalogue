(function () {
  'use strict';

  angular.module('app.modal', [])
    .service('Modal', function ($uibModal) {
      var service = {};

      /**
       * Returns a promise with an accept and decline callback
       * @param event
       * @param title
       * @param content
       * @param okText
       * @param cancelText
       */
      service.confirm = function (event, title, content, okText, cancelText) {
        var modalInstance = $uibModal.open({
          templateUrl: 'app/components/common/modal/confirm-modal.html',
          controller: function (data, $uibModalInstance) {
            var ctrl = this;
            ctrl.data = data;

            ctrl.ok = function () {
              $uibModalInstance.close();
            };

            ctrl.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
          },
          controllerAs: '$ctrl',
          size: 'sm',
          resolve: {
            data: function () {
              return {
                title: title,
                content: content,
                okText: okText,
                cancelText: cancelText
              };
            }
          }
        });

        return modalInstance.result;
      };

      return service;
    });
})();