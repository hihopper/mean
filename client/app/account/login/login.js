'use strict';

angular.module('smsApp').config(function ($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/account/login/login.html',
      controller: 'LoginCtrl'
    })
    .state('logout', {
      url: '/logout?referrer',
      referrer: 'home',
      template: '',
      controller: function($state, Auth) {
        var referrer = $state.params.referrer || $state.current.referrer || 'home';
        Auth.logout();
        $state.go(referrer);
      }
    });
});
