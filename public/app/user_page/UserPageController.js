angular
    .module('Podcastio')
    .controller('UserPageCtrl', function(
        $scope,
        UserService, PlayerService) {

    UserService.getUser(function(user){
      $scope.user = user;
    });

    $scope.playEpisode = function(episode) {
        console.log(episode);
        PlayerService.podcastPath = episode.path;
    };

});