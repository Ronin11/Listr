angular.module('Podcastio').factory('PlayerService', function(){
    var PlayerService = this;
    
    PlayerService.podcastPath = "";
    PlayerService.getPath = function(){
        console.log(PlayerService.podcastPath)
        return PlayerService.podcastPath;
    }

    PlayerService.toggle = function(){
      audioElement.src = PlayerService.getPath();
      console.log(PlayerService.getPath())
      if(!PlayerCtrl.playing){
          audioElement.play();
      }else{
        audioElement.pause();
      }
      PlayerCtrl.playing = !PlayerCtrl.playing;
    }

    return PlayerService;
});