angular
    .module('Listr')
    .controller('UserPageCtrl', function(
        $scope,
        UserService) {

    UserService.getUser(function(user){
      $scope.user = user;
    });

    $scope.playEpisode = function(episode) {
        console.log(episode);
    };

});