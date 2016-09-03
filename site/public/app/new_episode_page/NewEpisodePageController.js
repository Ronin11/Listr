angular
    .module('Podcastio')
    .controller('NewEpisodePageController', function(
      $scope, $log, $window, 
      $firebaseAuth, $firebaseArray, $firebaseObject,
      ShowService, UserService) {

    var ref = firebase.storage().ref();
    var database = firebase.database();

    UserService.getUser(function(user){
      $scope.user = user;
      ShowService.getShows(user, function(shows){
        $scope.shows = shows.map(x => x.title);
        console.log($scope.shows);
      });
    });

    $scope.$watch('files.length',function(newVal,oldVal){
        console.log($scope.files);
    });

    $scope.doTheThing = function(snapshot){

            user = $firebaseObject(database.ref('users/' + $scope.user.$id));
            user.$loaded().then(function(user){

              episode = {                 
                title: $scope.title,
                description: $scope.description,
                path : snapshot.downloadURL
              }

              for(i = 0; i < user.shows.length; i++){
                if(user.shows[i].title == $scope.selectedItem){
                  if(user.shows.episodes == undefined){
                    user.shows[i].episodes = [episode];
                  } else {
                    user.shows[i].push(episode);
                  }
                }
              };
              user.$save().then(function() {
                  console.log('Episode Added!');
              }).catch(function(error) {
                  console.log('Error!');
              });
          });
    }

    $scope.uploadFiles = function(){
        obj = $scope.files[0]
        fileRef = ref.child(obj['lfFileName']);


        uploadTask = fileRef.put(obj['lfFile'])

        uploadTask.then($scope.doTheThing);

        uploadTask.on("state_changed", function progress(snapshot){
            console.log(Math.round(snapshot.bytesTransferred/snapshot.totalBytes*100) + "%") // progress of upload
        });
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

