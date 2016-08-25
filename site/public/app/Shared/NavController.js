angular.module('Podcastio').controller('NavCtrl', function($scope, $firebaseAuth, $mdSidenav) {

    $scope.openLeftMenu = function(){
        $mdSidenav('left').toggle();
    }

});