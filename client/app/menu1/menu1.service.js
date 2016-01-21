'use strict'

angular.module('smsApp').factory('menu1Svc', function($resource) {
  return $resource('api/samples/:id', {id: '@id'});
});
