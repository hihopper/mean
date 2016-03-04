'use strict';

angular.module('smsApp').controller('SignupCtrl', function ($scope, $location, UserAPI) {

  $scope.submitted = false;

  $scope.user = {};
  $scope.errors = {};

  $scope.register = function (form) {

    $scope.submitted = true;
    if (!form.$valid) {
      $scope.errors.other = '필수 필드가 누락 되었습니다.';
  //    return;
    }

    UserAPI.save( $scope.user, function(result){
      console.log('result:', result);

    }, function(err){
      console.log('err', err);
    }).$promise.finally(function() {
      //    usSpinnerService.stop('spinner-modal');
    });
    /*
    Auth.createUser({
      userid: $scope.user.userid,
      passwd: $scope.user.passwd,
      name: $scope.username
    })
    .then( function() {
      // Logged in, redirect to home
      $location.path('/');
    })
    ['catch']( function(err) {
      $scope.errors = {};
      console.log('err', err);
      // Update validity of form fields that match the mongoose errors
      angular.forEach(err.data.errors, function(error, field) {
//        form[field].$setValidity('mongoose', false);
        $scope.errors[field] = error.message;
      });
    });
    */
  };

});
