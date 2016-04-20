(function () {
  'use strict';

  angular.module('app.form')
    .directive('inputField', function(){
      return {
        restrict: 'E',
        require: '^form',
        templateUrl: 'app/components/common/form/input-field.html',
        link: Link,
        scope: {
          'ngModel' : '=',
          'typeahead': '='
        }
      };
    });

  function Link(scope, el, attrs, form) {
    scope.form = form;
    scope.field = attrs.ngModel;
    scope.required = attrs.required ? true : false;
    scope.type = attrs.type ? attrs.type : 'text';
    scope.label = attrs.label ? attrs.label : labelize(attrs.ngModel);
    scope.placeholder = attrs.placeholder ? attrs.placeholder : scope.label;

    // Typeahead
    scope.typeaheadEditable = scope.typeahead ? false : true ;
    // scope.typeahead = scope.typeahead ? scope.typeahead : [];

    /*scope.formatLabel = function (model, list) {
      for (var i = 0; i < list.length; i++) {
        if (model === list[i].id) {
          return list[i].name;
        }
      }
    };*/
  }

  function labelize(string) {
    return capitalize(string.split('.').pop().split('_').join(' '));
  }

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

})();