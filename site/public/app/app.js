app = angular.module('Podcastio', [
  'ngMaterial',
  'lfNgMdFileInput',
  'ngRoute',
  'firebase',
  'xml'
]);



app.config(['$routeProvider', '$mdThemingProvider', '$httpProvider',
  function($routeProvider, $mdThemingProvider, $httpProvider){
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.interceptors.push('xmlHttpInterceptor');
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
    
    $mdThemingProvider.theme('default')
      .primaryPalette('deep-purple')
      .accentPalette('orange');

    $routeProvider.
    when('/home', {
      templateUrl: 'app/home_page/HomePage.html',
      controller: 'HomePageCtrl'
    }).
    when('/login', {
      templateUrl: 'app/login_page/LoginPage.html',
      controller: 'LoginPageCtrl'
    }).
    when('/player', {
      templateUrl: 'app/player_page/PlayerPage.html',
      controller: 'PlayerPageCtrl'
    }).
    when('/upload', {
      templateUrl: 'app/upload_page/UploadPage.html',
      controller: 'UploadPageCtrl'
    }).
    otherwise('/home');
}]);