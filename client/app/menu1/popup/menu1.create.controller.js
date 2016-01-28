'use strict';

angular.module('smsApp').controller('Menu1CreateCtrl', function($scope, SamplesAPI, usSpinnerService) {

  $scope.sample = {};
  $scope.startSpin = function(){
 };
 $scope.stopSpin = function(){
 };

  $scope.create = function() {

    usSpinnerService.spin('spinner-modal');

    SamplesAPI.save({ key: $scope.sample.key,
                      value:$scope.sample.value
                    }, function(result){
                      console.log(result);
                      usSpinnerService.stop('spinner-modal');
                      $scope.$close();
                    }, function(err){
                      console.log(err);
                      usSpinnerService.stop('spinner-modal');
                      $scope.$dismiss();
                    });
  };
});
