'use strict';

angular.module('smsApp').controller('UserCreateCtrl', function($scope, UserAPI) {

  $scope.user = {};

  $scope.create = function() {

    //  usSpinnerService.spin('spinner-modal');
    UserAPI.save( $scope.user, function(result){
      console.log(result);
      $scope.$close();
    }, function(err){
      console.log(err);
      $scope.$dismiss();
    }).$promise.finally(function() {
      //    usSpinnerService.stop('spinner-modal');
    });
  };
});
