angular.module('Podcastio').controller('LoginPageCtrl', function($scope, $firebaseAuth, UserService) {

    $scope.login = function(){
        var auth = $firebaseAuth();
        auth.$signInWithPopup("google").then(function(firebaseUser){
                UserService = firebaseUser;
        }).catch(function(error){
                console.log("Authentication failed:", error);
        })
    }
});