'use strict';

angular.module('smsApp').controller('Menu1DestroyCtrl', function($scope, SamplesAPI, row) {

  $scope.row = row;

  $scope.close = function() {
    $scope.$dismiss();
  };

  $scope.destroy = function() {
    console.log('delete ' + $scope.row.key);

    SamplesAPI.remove({ key: $scope.row.key }, function(res) {
      console.log('succ:' + res);
      $scope.$close();
    }, function(err) {
      console.log('fail: ' + err);
      $scope.error = '삭제에 실패하였습니다. 다시 시도해 주십시오.';
//      $scope.$dismiss();
    });
  };
});
