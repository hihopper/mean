'use strict';

angular.module('smsApp').controller('AdminCtrl', function ($scope, $modal, UserAPI, usSpinnerService, $window) {

  $scope.searches = [
    { key: 'userId' , text: '사용자ID' },
    { key: 'name'   , text: '이름' },
    { key: 'role'   , text: '등급' }
  ];

  $scope.sorts = [
    { key: 'userId' , text: '사용자ID', col: 'col-xs-3'},
    { key: 'name'   , text: '이름'    , col: 'col-xs-3' },
    { key: 'role'   , text: '등급'    , col: 'col-xs-2' },
    { key: 'regDate', text: '가입일'  , col: 'col-xs-2' }
  ];

  $scope.data = {
    search: $scope.searches[0],
    searchValue: '',
    limit: 10,
    maxSize: 10,
    page: 1,
    total: 0,
    rows: [],
    sort: {
      field: $scope.sorts[0].key,
      fieldName: '',
      order: 1,
      ngclass: {}
    },
    error: ''
  };

  $scope.lineLimit = function(value) {
    $scope.data.limit = parseInt(value);
    $scope.search();
  };

  $scope.$watch(function(){
    return $window.innerWidth;
  }, function(value) {
    $scope.data.maxSize = value < 500 ? 5 : 10;
  });

  $scope.search = function() {
    //usSpinnerService.spin('spinner-main');
    var query = {
      search: $scope.data.search.key,
      value: $scope.data.searchValue,
      page: $scope.data.page,
      limit: $scope.data.limit,
      sort: $scope.data.sort.field,
      order: $scope.data.sort.order
    };

    UserAPI.get(query, function(result) {
      $scope.data.rows = result.rows;
      $scope.data.total = result.total;
    }, function(err) {
      $scope.data.error = err.statusText;
      $scope.data.rows = [];
      $scope.data.total = 0;
      console.log(err);
    }).$promise.finally( function() {
      //usSpinnerService.stop('spinner-main');
    });
  };

  $scope.sort = function(field) {
    if( $scope.data.sort.field === field) {
      $scope.data.sort.order = $scope.data.sort.order * -1;
    }
    else {
      $scope.data.sort.field = field;
    }
    $scope.data.sort.ngclass = {};
    $scope.data.sort.ngclass[field] = $scope.data.sort.order > 0 ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down';

    $scope.search();
  };
  $scope.sort($scope.data.sort.field);

  $scope.create = function() {
    var modal = $modal.open({
      templateUrl: 'app/admin/popup/user.create.html',
      controller: 'UserCreateCtrl'
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
      templateUrl: 'app/admin/popup/user.update.html',
      controller: 'UserUpdateCtrl',
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
      templateUrl: 'app/admin/popup/user.destroy.html',
      controller: 'UserDestroyCtrl',
      resolve: { row: function() { return row; }}
    });

    modal.result.then( function(res) {
      console.log('succ:' + res);
    }, function(err) {
      console.log('fail: ' + err);
    });
  };

});
