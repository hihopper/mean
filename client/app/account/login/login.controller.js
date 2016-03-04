'use strict';

angular.module('smsApp').controller('LoginCtrl', function ($scope, $location, Auth) {

  $scope.submitted = false;

  $scope.user = {};
  $scope.errors = {};

  $scope.login = function (form) {

    $scope.submitted = true;
    if (!form.$valid) {
      $scope.errors.other = '필수 필드가 누락 되었습니다.';
      return;
    }

    Auth.login({
      userid: $scope.user.userid,
      passwd: $scope.user.passwd
    })
    .then( function() {
      // Logged in, redirect to home
      $location.path('/');
    })
    ['catch']( function(err) {
      $scope.errors.other = err.message;
    });
  };

});
