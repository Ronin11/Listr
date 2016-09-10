angular
    .module('Podcastio')
    .factory('UserService', function(
        $firebaseAuth, $firebaseArray, $firebaseObject){
    var UserService = {};

    var database = firebase.database();
    var ref = firebase.storage().ref();

    function loginPrompt(callback){
        var auth = $firebaseAuth();
        auth.$signInWithPopup("google").then(function(firebaseUser){
                temp = firebaseUser;
                callback(temp.user.uid);
        }).catch(function(error){
                console.log("Authentication failed:", error);
        })
    }

    function getUser(gid, callback){
        database.ref().child('conv').child(gid).once("value", function(snapshot){
            uid = snapshot.val();
            try{
                database.ref().child('users').child(uid).once("value", function (snapshot){
                    UserService.user = snapshot.val();
                    callback(UserService.user);
                });
            } catch(error){
                callback(null); 
            }
        });
    }


    function createUser(id, username, callback){
        userKey = database.ref().child('users').push().key;
        conv = {
            uid: userKey
        }
        database.ref().child('conv').child(id).push();
        convUpdate = {}
        convUpdate['/conv/' + id] = userKey;
        database.ref().update(convUpdate);

        user = {
            //gid: id,
            uid: userKey,
            username: username
        }
        update = {};
        update['/users/' + userKey] = user;
        database.ref().update(update).then(function(){
            database.ref().child('users').child(userKey).once("value", function(snapshot){
                UserService.user = snapshot.val();
                callback(UserService.user);
            });
        });
    }
    
    UserService.isLoggedIn = function(){
        if(UserService.user){
            return true;
        } else {
            return false;
        }
    }

    UserService.getUser = function(callback){
        if(UserService.user){
            callback(UserService.user);
        }
        else{
            loginPrompt(function(uid){
                getUser(uid, function(user){
                    if(user == null){
                        createUser(uid, "Ronin", function(user){
                            callback(user);
                        });
                    } else {
                        callback(user);
                    }
                });
            });
        }
    }

    UserService.getUserValue = function(){
       return UserService.user.$value;
    }

    UserService.createUser = function(callback, username){
        createUser(callback, username);
    }

    // UserService.addShow = function(title, description, file){
    //         fileRef = ref.child(file['lfFileName']);
    //         uploadTask = fileRef.put(file['lfFile'])

    //         uploadTask.then(function(snapshot){
                
    //             user = $firebaseObject(database.ref('users/' + UserService.user.$id));
    //             user.$loaded().then(function(user){
                        
    //                 show = {
    //                     title: title,
    //                     description: description,
    //                     imageSrc: snapshot.downloadURL,
    //                     owner: user.$id,
    //                     public: true
    //                 }

    //                 showKey = database.ref().child('shows').push(show).key;
    //                 key = {key: showKey, episodes: []};
    //                 if(user.shows != undefined){
    //                     user.shows.push(key);
    //                 }else{
    //                     user.shows = [key];
    //                 }

    //                 user.$save().then(function() {
    //                     console.log('Show Added!');
    //                 }).catch(function(error) {
    //                     console.log('Error!');
    //                 });
    //             });
    //     });
    //     uploadTask.on("state_changed", function progress(snapshot){
    //         console.log(Math.round(snapshot.bytesTransferred/snapshot.totalBytes*100) + "%") // progress of upload
    //     });
    // }

    // UserService.addEpisode = function(show, title, description, file){
    //     fileRef = ref.child(file['lfFileName']);
    //     uploadTask = fileRef.put(file['lfFile'])

    //     uploadTask.then(function(snapshot){
            
    //         user = $firebaseObject(database.ref('users/' + UserService.user.$id));
    //         user.$loaded().then(function(user){

    //           episode = {                 
    //             title: title,
    //             description: description,
    //             path : snapshot.downloadURL
    //           }

    //           for(i = 0; i < user.shows.length; i++){
    //             if(user.shows[i].title == show){
    //               if(user.shows.episodes == undefined){
    //                 user.shows[i].episodes = [episode];
    //               } else {
    //                 user.shows[i].push(episode);
    //               }
    //             }
    //           };
    //           user.$save().then(function() {
    //               console.log('Episode Added!');
    //           }).catch(function(error) {
    //               console.log('Error!');
    //           });
    //       });
    // });

    //     uploadTask.on("state_changed", function progress(snapshot){
    //         console.log(Math.round(snapshot.bytesTransferred/snapshot.totalBytes*100) + "%") // progress of upload
    //     });
    // }
    
    return UserService;
});