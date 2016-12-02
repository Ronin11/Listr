angular
    .module('Listr')
    .controller('LoginPageCtrl', function($scope, $mdDialog,
    ListService, UserService) {

    LoginPageController = this;
    
    $scope.login = function(){
        UserService.getUser(function(user){
            console.log(user);
            ListService.getUserMasterList(user, function(list){
                console.log(list);
                ListService.addToList(user, list.id, {test: "test"}, function(list){
                    console.log(list);
                    ListService.createList(user, list, function(list){
                        console.log(list);
                    });
                });
            });
        });
    }
    $scope.isLoggedIn = function(){
        return UserService.isLoggedIn();
    }
});