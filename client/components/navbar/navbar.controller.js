'use strict';

angular.module('smsApp')
  .controller('NavbarCtrl', ['$scope', '$state', function ($scope, $state) {
    $scope.isCollapsed = true;

    $scope.isActive = function(menu) {
      //console.log(menu + ' ' + $state.$current.name);
      return $state.$current.name.indexOf(menu) > -1;
//      return $state.includes(menu);
    };

    $scope.menuClick = function() {
      $scope.isCollapsed = true;
    };
  }]);
