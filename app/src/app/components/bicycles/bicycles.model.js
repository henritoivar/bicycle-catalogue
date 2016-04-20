(function () {
  'use strict';

  function Bicycles(BicyclesResource, Promise){
    var model = {};

    model.collection = [];
    model.item = {};

    model.initCollection = function () {
      return BicyclesResource.query().$promise.then(function (response) {
        model.collection = response;
        return response;
      }).catch(function (error) {
        throw error;
      });
    };

    model.getItemTotalWeight = function () {
      if(typeof model.item.bicycle_parts === 'undefined') {
        return;
      }
      var total = 0;
      for (var i in model.item.bicycle_parts) {
        var weight = parseFloat(model.item.bicycle_parts[i].weight);
        total += isNaN(weight) ? 0 : weight;
      }
      return total;
    };

    model.getItemTotalPrice = function () {
      if(typeof model.item.bicycle_parts === 'undefined') {
        return;
      }
      var total = 0;
      for (var i in model.item.bicycle_parts) {
        var price = parseFloat(model.item.bicycle_parts[i].price);
        total += isNaN(price) ? 0 : price;
      }
      return total;
    };

    model.initItem = function (id) {
      if(id === 'new'){
        model.item = {
          id: null,
          name: '',
          brand: '',
          bicycle_parts: []
        };

        return Promise.resolve();
      }

      return BicyclesResource.get({bicycleId: id}).$promise.then(function (response) {
        model.item = response;



        return response;
      }).catch(function (error) {
        throw error;
      });
    };

    model.save = function (bicycle) {
      var promise;
      if(!bicycle.id) {
        promise = BicyclesResource.save(bicycle).$promise;
      }else{
        promise = BicyclesResource.update({bicycleId: bicycle.id}, bicycle).$promise;
      }

      return promise.then(function (response) {
        // Update bicycle list
        model.initCollection();

        return response;
      }).catch(function (error) {
        throw error;
      });
    };

    model.delete = function (bicycle) {
      return BicyclesResource.delete({bicycleId: bicycle.id}).$promise.then(function (response) {
        return response;
      }).catch(function (error) {
        throw error;
      });
    };

    return model;
  }

  angular.module('app.bicycles').service('Bicycles', Bicycles);
})();