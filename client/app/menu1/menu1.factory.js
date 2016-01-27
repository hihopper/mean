'use strict';

angular.module('smsApp').factory('SamplesAPI', function($resource) {
  return $resource('api/samples/:key', {}, {
    update: { method: 'PUT'}
  });
});
