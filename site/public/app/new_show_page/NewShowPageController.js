angular
    .module('Podcastio')
    .controller('NewShowPageCtrl', function($scope, $firebaseAuth, $firebaseObject,
                            UserService) {

    var database = firebase.database();

    $scope.createShow = function(){
        show = {
            title: $scope.title,
            imgSrc: "",
            description: $scope.description
        }
        UserService.getUser(function(user){
            if(user.shows != undefined){
                user.shows.push(show);
            }else{
                user.shows = [show];
            }
            user.$save().then(function() {
                console.log('Profile saved!');
            }).catch(function(error) {
                console.log('Error!');
            });
        });
    }

});