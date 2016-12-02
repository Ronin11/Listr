angular
    .module('Listr')
    .controller('HomePageCtrl', function($scope, $firebaseAuth, 
        ListService) {

            
        
    HomeController = this;

    // var database = firebase.database();
    // var episodes = firebase.database().ref('tal/episodes/');
    // $scope.episodeData = {}

    // $scope.showSelected = function(EpisodeRss){
    //         console.log(EpisodeRss);
    //         EpisodeService.getEpisodes(EpisodeRss, function(data){
    //             $scope.episodeData = data;
    //             console.log($scope.episodeData.episodes);
    //             console.log("GotData");
    //     });
    // }

    // $scope.changeSong = function(podcastPath){
    //     console.log(podcastPath);
    //     .podcastPath = podcastPath
    //     console.log(podcastPath);
    // }

    // episodes.on('value', function(snapshot) {
    //     $scope.episodeList = snapshot.val();   
    // });

    // ShowService.getAllShows(function(shows){
    //     console.log(shows);
    // });

});