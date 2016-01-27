'use strict';

angular.module('smsApp')
  .controller('Menu1Ctrl', function ($scope, $modal, SamplesAPI) {

    $scope.data = {
      limit: 5,
      maxSize: 10,
      page: 1,
      total: 0,
      rows: [],
      error: ''
    };

    $scope.search = function() {

      SamplesAPI.get({ page: $scope.data.page, limit: $scope.data.limit }, function(result) {
        $scope.data.rows = result.rows;
        $scope.data.total = result.total;
      }, function(err) {
        $scope.data.error = err.statusText;
        console.log(err);
      });
    };
    $scope.search();

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
        console.log('succ:' + res);
      }, function(err) {
        console.log('fail: ' + err);
      });
    };

    $scope.destroy = function(row) {
      var modal = $modal.open({
        templateUrl: 'app/menu1/popup/menu1.destroy.html',
        controller: 'Menu1DestroyCtrl',
        resolve: { row: function() { return row; }}
      });

      modal.result.then( function(res) {
        console.log('succ:' + res);
      }, function(err) {
        console.log('fail: ' + err);
      });
    };

  });
