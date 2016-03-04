'use strict';



angular.module('smsApp').factory('Auth', function($http, $q) {

  var currentUser = {};

  return {
    login: function(user) {
      var q = $q.defer();
      console.log('login:', user);
      $http.post('/auth/local', {
        userid: user.userid,
        passwd: user.passwd
      })
      .success(function(data) {
        console.log('success:', data);
        currentUser.userid = data.userid;
        q.resolve(data);
      })
      .error(function(err) {
        console.log('fail:', err);
        q.reject(err);
      });

      return q.promise;
    },

    logout: function() {
      currentUser = {};
    },

    isLoggedIn: function() {
//      return currentUser.hasOwnProperty('role');
      return currentUser.hasOwnProperty('userid');
    }
  };
});
