angular.module('Podcastio').controller('PlayerCtrl', function($http, $scope, $firebaseAuth, $document, PlayerService) {
    PlayerCtrl = this;
    PlayerCtrl.playing = false;
    var audioElement = $document[0].createElement('audio');
    paths = ['http://feed.thisamericanlife.org/~r/talpodcast/~5/l-mIKkKzpQ0/594.mp3', "http://feed.thisamericanlife.org/~r/talpodcast/~5/KtNRssO7VSc/447.mp3"]
    audioElement.src = paths[0]
    index = 0;
    console.log(audioElement)

    PlayerCtrl.progressValue = .5;

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
      if(hours != 0){
        PlayerCtrl.duration = hours+":"+minutes+":"+seconds
      }else{
        PlayerCtrl.duration = minutes+":"+seconds
      }
       
      $scope.$apply()
    }

    audioElement.onprogress = function(event){

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
      if(hours != 0){
        PlayerCtrl.currentTime = hours+":"+minutes+":"+seconds
      }else{
        PlayerCtrl.currentTime = minutes+":"+seconds
      }
      $scope.$apply()
    }




    PlayerCtrl.togglePlay = function(){
      if(!PlayerCtrl.playing){
          audioElement.play();
      }else{
        audioElement.pause();
      }
      PlayerCtrl.playing = !PlayerCtrl.playing;
    }



    PlayerCtrl.skipNext = function(){
      index+=1
      audioElement.src = paths[index];
    }

    PlayerCtrl.skipPrev = function(){
      index-=1
      audioElement.src = paths[index];
    }

});