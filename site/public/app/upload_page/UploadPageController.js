// angular
// .module('Podcastio')
// .controller('UploadPageCtrl', function($scope, $firebaseAuth, $firebaseArray) {

//     var ref = firebase.storage().ref();
//     var database = firebase.database();

//     $scope.$watch('files.length',function(newVal,oldVal){
//         //console.log($scope.files);
//     });

//     $scope.uploadFiles = function(){
//         obj = $scope.files[0]
//         fileRef = ref.child(obj['lfFileName']);


//         uploadTask = fileRef.put(obj['lfFile'])

//         uploadTask.then(function(snapshot) {
//             collection = database.ref('tal/episodes').push({
//                 name: obj['lfFileName'],
//                 path : snapshot.downloadURL
//             });
//             console.log('Uploaded a blob or file!');
//         });

//         uploadTask.on("state_changed", function progress(snapshot){
//             console.log(Math.round(snapshot.bytesTransferred/snapshot.totalBytes*100) + "%") // progress of upload
//         })

//     $scope.simulateQuery = false;
//     $scope.isDisabled    = false;
//     // list of `state` value/display objects
//     $scope.states        = loadAll();
//     $scope.querySearch   = querySearch;
//     $scope.selectedItemChange = selectedItemChange;
//     $scope.searchTextChange   = searchTextChange;
//     $scope.newState = newState;
//     function newState(state) {
//       alert("Sorry! You'll need to create a Constitution for " + state + " first!");
//     }

//     function querySearch (query) {
//       var results = query ? $scope.states.filter( createFilterFor(query) ) : $scope.states,
//           deferred;
//       if ($scope.simulateQuery) {
//         deferred = $q.defer();
//         $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
//         return deferred.promise;
//       } else {
//         return results;
//       }
//     }
//     function searchTextChange(text) {
//       $log.info('Text changed to ' + text);
//     }
//     function selectedItemChange(item) {
//       $log.info('Item changed to ' + JSON.stringify(item));
//     }

//     function loadAll() {
//     var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
//             Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
//             Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
//             Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
//             North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
//             South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
//             Wisconsin, Wyoming';
//         return allStates.split(/, +/g).map( function (state) {
//             return {
//             value: state.toLowerCase(),
//             display: state
//             };
//         });
//     }
    
//     function createFilterFor(query) {
//       var lowercaseQuery = angular.lowercase(query);
//       return function filterFn(state) {
//         return (state.value.indexOf(lowercaseQuery) === 0);
//       };
//     }

//     };
// });

angular
    .module('Podcastio')
    .controller('UploadPageCtrl', function($timeout, $q, $log) {
    var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    // list of `state` value/display objects
    self.states        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    self.newState = newState;
    function newState(state) {
      alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }
    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }
    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }
  });

