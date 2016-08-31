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
            console.log(user)
            // temp = user;
            // if(temp.shows != undefined){
            //     temp.shows.push(show);
            // }else{
            //     temp.shows = [show];
            // }
            // user.$value = temp;
            // user.$save().then(function() {
            //     alert('Profile saved!');
            // }).catch(function(error) {
            //     alert('Error!');
            // });
        });
    }

});