angular
    .module('Podcastio')
    .controller('NewShowPageCtrl', function($scope,
                            UserService) {

    $scope.createShow = function(){
        UserService.addShow($scope.title, $scope.description, $scope.files[0]);
    }

});