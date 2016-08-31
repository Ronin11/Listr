angular
    .module('Podcastio')
    .controller('HomePageCtrl', function($scope, $firebaseAuth, PlayerService, EpisodeService) {

    HomeController = this;

    var database = firebase.database();
    var episodes = firebase.database().ref('tal/episodes/');
    $scope.episodeData = {}

    $scope.showSelected = function(){
            // http://feed.thisamericanlife.org/talpodcast
            // EpisodeService.getEpisodes('http://sawbones.libsyn.com/rss', function(data){
            console.log("Selected");
            EpisodeService.getEpisodes('http://bunkerbuddies.libsyn.com/rss', function(data){
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

    episodes.on('value', function(snapshot) {
        $scope.episodeList = snapshot.val();   
    });



});