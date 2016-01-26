'use strict'

angular.module('smsApp').controller('Menu1UpdateCtrl', function($scope, SamplesAPI, row) {

  $scope.sample = row;

  $scope.update = function() {

    SamplesAPI.update({ key: $scope.sample.key },
                      { value:$scope.sample.value },
                      function(result) {
                        $scope.$close();
                      }, function(err) {
                        console.log(err);
                        $scope.error = '수정에 실패하였습니다. 다시 시도해 주십시오.';
                      });
  };
});
