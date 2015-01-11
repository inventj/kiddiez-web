'use strict';

var app = angular
  .module('kiddiezWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ], function config($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptor');
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/registrations', {
                 templateUrl: 'views/registration.html',
                 controller: 'RegistrationCtrl'
               })
      .otherwise({
        redirectTo: '/'
      });
  });
