angular
    .module('Listr')
    .controller('ListPageCtrl', function($scope, $route, $firebaseAuth, 
        ListService, UserService) {

    ListPageCtrl = this;
    $scope.ctrl = ListPageCtrl;
    ListPageCtrl.listId = $route.current.pathParams.listId;
    ListPageCtrl.updateList = function(list){
        ListPageCtrl.list = list;
        $scope.$apply();
    }

    ListService.getList(null, ListPageCtrl.listId, ListPageCtrl.updateList);

});