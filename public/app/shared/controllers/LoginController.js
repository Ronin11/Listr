angular
    .module('Listr')
    .controller('LoginCtrl', function($scope, $location, $mdDialog,
    ListService, UserService) {

    LoginController = this;
    $scope.ctrl = LoginController;
    LoginController.createUserDialog = function(ev){
        $mdDialog.show({
            //controller: this,
            templateUrl: '/app/shared/dialogs/CreateUserDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            });
    }
    LoginController.createUser = function(){
        $mdDialog.hide();
        UserService.userSetup($scope.username, function(user){
            console.log(user);
        });
    }
    LoginController.login = function(){
        UserService.getUser(function(user){
            if(user == null){// ALLLLLLL BAAAAAAADDDDD
                UserService.loginWithGoogle(function(uid){
                    if(uid != null){
                        UserService.setUid(uid);
                        LoginController.createUserDialog();
                    }
                });
            }
        });
    }
    LoginController.isLoggedIn = function(){
        return UserService.isLoggedIn();
    }
});