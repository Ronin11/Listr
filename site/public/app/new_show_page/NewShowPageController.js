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
        UserService.addShow(show);
    }

});