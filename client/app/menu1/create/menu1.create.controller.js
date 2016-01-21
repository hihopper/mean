'use strict'

angular.module('smsApp').controller('Menu1CreateCtrl', function($scope, menu1Svc) {

  $scope.sample = {};

  $scope.create = function() {

    var row = new menu1Svc();

    row.key = $scope.sample.key;
    row.value = $scope.sample.value;

    row.$save().then( function(result){
      $scope.$close();
    }, function(err){
      console.log(err);
      $scope.$dismiss();
    });
  };
});
