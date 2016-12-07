angular
    .module('Listr')
    .controller('ListPageCtrl', function($scope, $route, $firebaseAuth, 
        ListService, UserService) {

    ListPageController = this;
    $scope.ctrl = ListPageController;
    ListPageController.listId = $route.current.pathParams.listId;
    ListPageController.updateList = function(list){
        ListPageController.list = list;
        $scope.$apply();
    }

    ListService.getList(null, ListPageController.listId, ListPageController.updateList);
    ListPageController.addToList = function(){
        console.log("Penis")
    }

    ListPageController.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    

    ListPageController.addList = function(){
        console.log("list")
    };
    ListPageController.addWeightItem = function(){
        console.log("Witem")
    };
    ListPageController.addQuantityItem = function(){
        console.log("Qitem")
    }

});