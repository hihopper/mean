'use strict';

angular.module('smsApp')
  .controller('HomeCtrl', function ($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    slides.push({ image: 'assets/images/iheart_1.jpg', text: 'A'});
    slides.push({ image: 'assets/images/iheart_2.jpg', text: 'B'});
    slides.push({ image: 'assets/images/iheart_3.jpg', text: 'C'});
    slides.push({ image: 'assets/images/iheart_4.jpg', text: 'D'});
    slides.push({ image: 'assets/images/iheart_5.jpg', text: 'E'});
  });
