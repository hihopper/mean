'use strict';

angular.module('smsApp').controller('UserUpdateCtrl', function($scope, UserAPI, usSpinnerService, row) {

  $scope.user = angular.copy(row);

  $scope.update = function() {
    var key   = { userId: $scope.user.userId };
    var value = { name: $scope.user.name,
                  role: $scope.user.role
                };

    usSpinnerService.spin('spinner-modal');
    UserAPI.update( key, value, function(res) {
      console.log('succ:' + res);
      $scope.$close();
    }, function(err) {
      console.log(err);
      $scope.error = '수정에 실패하였습니다. 다시 시도해 주십시오.';
    }).$promise.finally(function() {
      usSpinnerService.stop('spinner-modal');
    });
  };
});
