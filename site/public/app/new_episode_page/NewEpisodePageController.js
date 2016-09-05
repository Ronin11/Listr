angular
    .module('Podcastio')
    .controller('NewEpisodePageCtrl', function(
      $scope, $log, $window,
      ShowService, UserService) {

    UserService.getUser(function(user){
      $scope.user = user;
      ShowService.getShows(user, function(shows){
        $scope.shows = shows.map(x => x.title);
        console.log($scope.shows);
      });
    });

    $scope.submit = function(){
      UserService.addEpisode($scope.selectedItem, $scope.title, $scope.description, $scope.files[0])
    };

    //var self = this;

    $scope.querySearch   = querySearch;
    $scope.selectedItemChange = selectedItemChange;
    $scope.searchTextChange   = searchTextChange;
    $scope.selectedItem;

    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for shows... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? $scope.shows.filter( createFilterFor(query) ) : $scope.shows,
          deferred;
        return results;
    }
    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }
    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      console.log(query);
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(show) {
        return (state.indexOf(lowercaseQuery) === 0);
      };
    }
  });

