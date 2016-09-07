angular.module('Podcastio').factory('PlayerService', function(){
    var PlayerService = this;
    
    PlayerService.podcastPath = "";
    PlayerService.getPath = function(){
        console.log(PlayerService.podcastPath)
        return PlayerService.podcastPath;
    }


    return PlayerService;
});