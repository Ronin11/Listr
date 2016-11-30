angular
    .module('Listr')
    .controller('LoginPageCtrl', function($scope, UserService) {

    LoginPageController = this;
    
    $scope.login = function(){
        UserService.getUser(function(user){
            console.log(user);
            //UserService.createDBUser();
        });
    }
    $scope.isLoggedIn = function(){
        return UserService.isLoggedIn();
    }
});