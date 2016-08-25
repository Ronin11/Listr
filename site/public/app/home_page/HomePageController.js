angular.module('Podcastio').controller('HomePageCtrl', function($scope, $firebaseAuth, PlayerService) {

    var database = firebase.database();
    var episodes = firebase.database().ref('tal/episodes/');
    $scope.episodeList = null;

    $scope.changeSong = function(podcastPath){
        console.log(podcastPath);
        PlayerService.podcastPath = podcastPath
    }

    episodes.on('value', function(snapshot) {
        $scope.episodeList = snapshot.val();   
    });

});