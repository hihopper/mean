'use strict';

angular.module('smsApp').controller('Menu1CreateCtrl', function($scope, SamplesAPI) {

  $scope.sample = {};

  $scope.create = function() {

    SamplesAPI.save({ key: $scope.sample.key,
                      value:$scope.sample.value
                    }, function(result){
                      console.log(result);
                      $scope.$close();
                    }, function(err){
                      console.log(err);
                      $scope.$dismiss();
                    });
  };
});
