'use strict';

angular.module('smsApp').controller('UserDestroyCtrl', function($scope, UserAPI, usSpinnerService, row) {

  $scope.row = angular.copy(row);

  $scope.close = function() {
    $scope.$dismiss();
  };

  $scope.destroy = function() {
    usSpinnerService.spin('spinner-modal');
    UserAPI.remove({ userId: $scope.row.userId }, function(res) {
      console.log('succ:' + res);
      $scope.$close();
    }, function(err) {
      console.log('fail: ' + err);
      $scope.error = '삭제에 실패하였습니다. 다시 시도해 주십시오.';
      //      $scope.$dismiss();
    }).$promise.finally(function() {
      usSpinnerService.stop('spinner-modal');
    });
  };
});
