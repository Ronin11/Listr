angular
    .module('Podcastio')
    .factory('ShowService', function(
        $firebaseObject){

    var ShowService = {}

    var database = firebase.database();
    var ref = firebase.storage().ref();

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
    
    ShowService.addShow = function(info, user, callback){
        fileRef = ref.child(info.file['lfFileName']);
        uploadTask = fileRef.put(info.file['lfFile'])

        uploadTask.then(function(image){
            
            database.ref().child('users').child(user.uid).once("value", function(snapshot){
                user = snapshot.val();
                show = {
                    title: info.title,
                    description: info.description,
                    imageSrc: image.downloadURL,
                    owner: user.uid,
                    public: true
                }

                showKey = database.ref().child('shows').push(show).key;
                key = {key: showKey, episodes: []};
                if(user.shows != undefined){
                    user.shows.push(key);
                }else{
                    user.shows = [key];
                }
                database.ref().child('users').child(user.uid).set(user);
            });
        });
        uploadTask.on("state_changed", function progress(snapshot){
            console.log(Math.round(snapshot.bytesTransferred/snapshot.totalBytes*100) + "%") // progress of upload
        });
    }
    
    return ShowService;

});







