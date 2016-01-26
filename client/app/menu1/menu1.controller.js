'use strict';

angular.module('smsApp')
  .controller('Menu1Ctrl', function ($scope, $modal, SamplesAPI) {

    $scope.samples = {};

    SamplesAPI.get({page:1}, function(data) {
      $scope.samples = data;
    }, function(err) {
      $scope.samples.err = err.statusText;
      console.log(err);
    });

    $scope.create = function() {
      var modal = $modal.open({
        templateUrl: 'app/menu1/popup/menu1.create.html',
        controller: 'Menu1CreateCtrl'
      });

      modal.result.then
      ( function() {
        console.log('success');
      },function() {
        console.log('fail');
      });
    };

    $scope.update = function(row) {
      var modal = $modal.open({
        templateUrl: 'app/menu1/popup/menu1.update.html',
        controller: 'Menu1UpdateCtrl',
        resolve: { row: function() { return row; }}
      });
      
      modal.result.then( function(res) {
        console.log('succ');
      }, function(err) {
        console.log('fail');
      });
    };

    $scope.destroy = function(row) {
      var modal = $modal.open({
        templateUrl: 'app/menu1/popup/menu1.destroy.html',
        controller: 'Menu1DestroyCtrl',
        resolve: { row: function() { return row; }}
      });

      modal.result.then( function(res) {
        console.log('succ');
      }, function(err) {
        console.log('fail');
      });
    };

  });
