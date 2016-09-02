angular
    .module('Podcastio')
    .factory('ShowService', function($firebaseObject){

    var ShowService = {}

    var database = firebase.database();

    ShowService.getShows = function(user, callback){
        console.log(user)
        user = $firebaseObject(database.ref('users/' + user.$id));
        user.$loaded().then(function(user){
            callback(user.shows);
        });
    }
    
    return ShowService;

});







