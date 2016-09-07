angular.module('Podcastio').controller('PlayerCtrl', function($http, $scope, $firebaseAuth, $document, PlayerService) {
    PlayerCtrl = this;
    var audioElement = $document[0].createElement('audio');
    
    PlayerCtrl.playing = false;
    index = 0;

    audioElement.src = PlayerService.getPath();

    PlayerCtrl.progressValue = 50;

    audioElement.onloadedmetadata = function(event){
      duration = audioElement.duration
      hours = 0;
      minutes = 0;
      seconds = 0;
      if(duration > 3600){
        hours = Math.floor(duration / 3600);
        duration -= 3600*hours;
      }
      if(duration > 60){
        minutes = Math.floor(duration / 60)
        duration -= minutes*60;
      }
      seconds = Math.floor(duration)
      if(seconds < 10){
        seconds = "0"+seconds;
      }
      if(minutes < 10){
        minutes = "0"+minutes;
      }
      if(hours != 0){
        if(hours < 10){
          hours = "0"+hours;
        }
        PlayerCtrl.duration = hours+":"+minutes+":"+seconds
      }else{
        PlayerCtrl.duration = minutes+":"+seconds
      }
      $scope.$apply()
    }

    audioElement.ontimeupdate = function(event){
      PlayerCtrl.progressValue = audioElement.currentTime/audioElement.duration*100;
      console.log(PlayerCtrl.progressValue)
      currentTime = audioElement.currentTime
      hours = 0;
      minutes = 0;
      seconds = 0;
      if(currentTime > 3600){
        hours = Math.floor(currentTime / 3600);
        currentTime -= 3600*hours;
      }
      if(currentTime > 60){
        minutes = Math.floor(currentTime / 60)
        currentTime -= minutes*60;
      }
      seconds = Math.floor(currentTime)
      if(seconds < 10){
        seconds = "0"+seconds;
      }
      if(minutes < 10){
        minutes = "0"+minutes;
      }
      if(hours != 0){
        if(hours < 10){
          hours = "0"+hours;
        }
        PlayerCtrl.currentTime = hours+":"+minutes+":"+seconds
      }else{
        PlayerCtrl.currentTime = minutes+":"+seconds
      }
      $scope.$apply()
    }




    PlayerCtrl.togglePlay = function(){
      audioElement.src = PlayerService.getPath();
      console.log(PlayerService.getPath())
      if(!PlayerCtrl.playing){
          audioElement.play();
      }else{
        audioElement.pause();
      }
      PlayerCtrl.playing = !PlayerCtrl.playing;
    }

    // PlayerCtrl.skipNext = function(){
    //   index+=1
    //   audioElement.src = paths[index];
    //   audioElement.play();
    // }

    // PlayerCtrl.skipPrev = function(){
    //   index-=1
    //   audioElement.src = paths[index];
    //   audioElement.play();
    // }

});