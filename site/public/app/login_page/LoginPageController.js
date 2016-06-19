angular.module('Podcastio').controller('LoginPageCtrl', function($scope, $firebaseAuth) {

    $scope.login = function(){
        var auth = $firebaseAuth();
        auth.$signInWithPopup("google").then(function(firebaseUser){
                console.log("Signed in as: ", firebaseUser);
                alert("Hello " + firebaseUser.user.displayName);
        }).catch(function(error){
                console.log("Authentication failed:", error);
        })
    }
});