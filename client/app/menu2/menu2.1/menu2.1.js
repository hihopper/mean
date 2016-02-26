'use strict';

angular.module('smsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('menu2/1', {
        url: '/menu2/1',
        templateUrl: 'app/menu2/menu2.1/menu2.1.html',
        controller: 'Menu2_1_Ctrl'
      });
  });
