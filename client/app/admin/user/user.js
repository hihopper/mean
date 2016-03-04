'use strict';

angular.module('smsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin/user', {
        url: '/admin/user',
        templateUrl: 'app/admin/user/user.html',
        controller: 'AdminUserCtrl'
      });
  });
