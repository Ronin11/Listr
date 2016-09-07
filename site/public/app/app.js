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
    when('/player', {
      templateUrl: 'app/player_page/PlayerPage.html',
      controller: 'PlayerPageCtrl'
    }).
    when('/newEpisode', {
      templateUrl: 'app/new_episode_page/NewEpisodePage.html',
      controller: 'NewEpisodePageCtrl'
    }).
    when('/newShow', {
      templateUrl: 'app/new_show_page/NewShowPage.html',
      controller: 'NewShowPageCtrl'
    }).
    when('/user', {
      templateUrl: 'app/user_page/UserPage.html',
      controller: 'UserPageCtrl'
    }).
    when('/show/:show', {
      templateUrl: 'app/show_page/ShowPage.html',
      controller: 'ShowPageCtrl'
    }).
    otherwise('/home');
}]);