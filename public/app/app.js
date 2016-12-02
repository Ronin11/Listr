app = angular.module('Listr', [
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
      .primaryPalette('light-blue')
      .accentPalette('red');

    $routeProvider.
    when('/home', {
      templateUrl: 'app/home_page/HomePage.html',
      controller: 'HomePageCtrl'
    }).
    when('/about', {
      templateUrl: 'app/about_page/AboutPage.html',
      controller: 'AboutPageCtrl'
    }).
    when('/user', {
      templateUrl: 'app/user_page/UserPage.html',
      controller: 'UserPageCtrl'
    }).
    when('/list', {
      templateUrl: 'app/list_page/ListPage.html',
      controller: 'ListPageCtrl'
    }).
    otherwise('/home');
}]);

