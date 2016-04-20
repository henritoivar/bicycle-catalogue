(function () {
  'use strict';

  angular.module('app.form')
    .directive('textField', function(){
      return {
        restrict: 'E',
        require: '^form',
        templateUrl: 'app/components/common/form/text-field.html',
        link: Link,
        scope: {
          'ngModel' : '='
        }
      };
    });

  function Link(scope, el, attrs, form) {
    scope.form = form;
    scope.field = attrs.ngModel;
    scope.required = attrs.required ? true : false;
    scope.label = attrs.label ? attrs.label : labelize(attrs.ngModel);
    scope.placeholder = attrs.placeholder ? attrs.placeholder : scope.label;
  }

  function labelize(string) {
    return capitalize(string.split('.').pop().split('_').join(' '));
  }

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

})();