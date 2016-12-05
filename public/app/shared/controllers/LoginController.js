angular
    .module('Listr')
    .controller('LoginCtrl', function($scope, $mdDialog,
    ListService, UserService) {

    LoginPageController = this;
    $scope.login = function(){
        UserService.getUser(function(user){
            console.log(user);
            ListService.getUserMasterList(user, function(list){
                console.log(list);
                ListService.addToList(user, list.id, {
                                                        name: "Eggs",
                                                        type: "Quantity",
                                                        amount: 3
                                                    }, function(list){
                    console.log(list);
                    ListService.createList(user, list, function(list){
                        console.log(list);
                        ListService.addToList(user, list.id, {
                                                                name: "Cereal",
                                                                type: "Weight",
                                                                amount: 3.141
                                                            }, function(list){
                                                                console.log(list);
                                                            });
                    });
                });
            });
        });
    }
    $scope.isLoggedIn = function(){
        return UserService.isLoggedIn();
    }
});