'use strict';

angular.module('smsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('menu2/2', {
        url: '/menu2/2',
        templateUrl: 'app/menu2/menu2.2/menu2.2.html',
        controller: 'Menu2_2_Ctrl'
      });
  });
