app = angular.module('Podcastio', ['ngRoute', "firebase"]);

app.config(['$routeProvider', function config($routeProvider){

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
        otherwise('/home');
}]);