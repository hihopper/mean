'use strict';

angular.module('smsApp')
  .controller('SideBarCtrl', ['$scope', '$state', function ($scope, $state) {

    $scope.isActive = function(menu) {
      return $state.$current.name.indexOf(menu) > -1;
    };
  }]);
