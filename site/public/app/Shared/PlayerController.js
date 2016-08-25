angular.module('Podcastio').controller('PlayerCtrl', function($http, $scope, $firebaseAuth, $document) {
    PlayerCtrl = this;
    PlayerCtrl.playing = false;
    var audioElement = $document[0].createElement('audio');
    
    PlayerCtrl.togglePlay = function(){
      console.log("Butts");
      audioElement.src = "path"
      if(!PlayerCtrl.playing){
          audioElement.play();
      }else{
        audioElement.pause();
      }
      PlayerCtrl.playing = !PlayerCtrl.playing;
    }

});