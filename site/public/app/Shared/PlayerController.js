angular.module('Podcastio').controller('PlayerCtrl', function($http, $scope, $firebaseAuth, $mdSidenav) {

    PlayerCtrl = this;
    $scope.ctrl = PlayerCtrl;
    PlayerCtrl.playing = false;

    var songBuffer = null;
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext();

    // function loadSong(url) {
    //     var request = new XMLHttpRequest();
    //     request.open('GET', url, true);
    //     request.responseType = 'arraybuffer';

    //     // Decode asynchronously
    //     request.onload = function() {
    //         context.decodeAudioData(request.response, function(buffer) {
    //         songBuffer = buffer;
    //         }, onError);
    //     }
    //     request.send();
    // }

    PlayerCtrl.audioUrl = 'http://traffic.libsyn.com/sawbones/Sawbones146Tea.mp3'
    
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    PlayerCtrl.playpause = function(){
        var source = audioCtx.createBufferSource(); // creates a sound source
        source.buffer = songBuffer;                    // tell the source which sound to play
        source.connect(context.destination);       // connect the source to the context's destination (the speakers)
        source.start(0);                           // play the source now
                                             // note: on older systems, may have to use deprecated noteOn(time);
        if(!PlayerCtrl.playing){
            gainNode.connect(audioCtx.destination);
        }else{
            gainNode.disconnect(audioCtx.destination);
        }
        PlayerCtrl.playing = !PlayerCtrl.playing;
    }

});