'use strict';

angular.module('smsApp').factory('UserAPI', function($resource) {
  return $resource('api/users/:userId', {}, {
    update: { method: 'PUT'}
  });
});
