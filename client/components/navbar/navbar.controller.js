'use strict';

angular.module('smsApp')
  .controller('NavbarCtrl', ['$scope', '$state', '$window', function ($scope, $state, $window) {
    $scope.isCollapsed = true;

    $scope.isSmall = $window.innerWidth < 760;

    var w = angular.element($window);
    w.bind('resize', function () {
      var isSmall = $scope.isSmall;
      $scope.isSmall = $window.innerWidth < 760;

      if( $scope.isSmall !== isSmall) {
        $scope.$apply();
        console.log('change');
      }
  });
    $scope.isActive = function(menu) {
      //console.log(menu + ' ' + $state.$current.name);
      return $state.$current.name.indexOf(menu) > -1;
//      return $state.includes(menu);
    };

    $scope.menuClick = function() {
      $scope.isCollapsed = true;
    };
  }]);
