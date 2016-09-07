angular
    .module('Podcastio')
    .controller('ShowPageCtrl', function($scope, $routeParams, $firebaseAuth, 
        ShowService, PlayerService, EpisodeService) {

    ShowController = this;
    $scope.loaded=false
    $scope.show=$routeParams["show"]
    var database = firebase.database();
    $scope.episodeData = {}
    if($routeParams["show"] == "bunker_buddies"){
        console.log("loading");
        EpisodeService.getEpisodes("http://bunkerbuddies.libsyn.com/rss", function(data){
            console.log("loading");
            $scope.episodeData = data;
            console.log($scope.episodeData.episodes);
            $scope.loaded=true;
        });   
        
    }else if($routeParams["show"] == "sawbones"){
        EpisodeService.getEpisodes("http://sawbones.libsyn.com/rss", function(data){
            $scope.episodeData = data;
            console.log($scope.episodeData.episodes);
        });    
        $scope.loaded=true;
    }
    
    $scope.showSelected = function(EpisodeRss){
            console.log(EpisodeRss);
            EpisodeService.getEpisodes(EpisodeRss, function(data){
                $scope.episodeData = data;
                console.log($scope.episodeData.episodes);
                console.log("GotData");
        });
    }

    $scope.changeSong = function(podcastPath){
        console.log(podcastPath);
        PlayerService.podcastPath = podcastPath
        console.log(podcastPath);
    }

    ShowService.getAllShows(function(shows){
        console.log(shows);
    });

});