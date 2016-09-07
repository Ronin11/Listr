angular
    .module('Podcastio')
    .factory('ShowService', function(){

    var ShowService = {}

    var database = firebase.database();

    ShowService.getShows = function(user, callback){
        database.ref().child('shows').once("value", function(snapshot){
            shows = []
            for(show in snapshot.val()){
               if(snapshot.val().hasOwnProperty(show)){
                   obj = snapshot.val()[show];
                   obj.key = show;
                   shows.push(obj);
               }
           };
           callback(shows);
        });
    };

    ShowService.getAllShows = function(callback){
        database.ref().child('shows').once("value", function(snapshot){
            snapshot.forEach(function(child){
                console.log(child.val());
            });
        });
        //callback(database.ref().child('shows'));
    };
    
    return ShowService;

});







