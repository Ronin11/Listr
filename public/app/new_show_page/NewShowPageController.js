angular
    .module('Podcastio')
    .controller('NewShowPageCtrl', function($scope,
        ShowService, UserService) {

    $scope.createShow = function(){
        UserService.getUser(function(user){
            info = {
                title: $scope.title,
                description: $scope.description,
                file: $scope.files[0]
            }
            ShowService.addShow(info, user);
        });
    }

});