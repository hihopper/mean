'use strict';

angular.module('smsApp')
  .controller('Menu1Ctrl', function ($scope, $modal, menu1Svc) {

    $scope.samples = {};

    menu1Svc.get({page:0}, function(data) {
      $scope.samples = data;
    }, function(err) {
      $scope.samples.err = err.statusText;
      console.log(err);
    });

    $scope.create = function() {
      var modal = $modal.open({
        templateUrl: 'app/menu1/create/menu1.create.html',
        controller: 'Menu1CreateCtrl'
      });

      modal.result.then
      ( function() {
        console.log('success');
      },function() {
        console.log('fail');
      });
    };
  });
