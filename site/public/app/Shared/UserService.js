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
                getUser(temp.user.uid, callback);
        }).catch(function(error){
                console.log("Authentication failed:", error);
        })
    }

    function getUser(id, callback){
        user = $firebaseObject(database.ref('users/' + id));
        user.$loaded().then(function(user){
            UserService.user = user

            // THIS IS FOR TESTING AND DEV ONLY!!!
            
            if(UserService.user != undefined){
                callback(UserService.user);
            }else{
                createUser(id, "USERNAME", callback);
            }
        });
    }


    function createUser(id, username, callback){
        user = $firebaseObject(database.ref('users/' + id));
        user.$loaded().then(function(user){
            user.$value = {
                uid: id,
                name: username
            }
            UserService.user = user;
            callback(UserService.user);
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
            console.log(UserService.user);
            callback(UserService.user);
        }
        else{
            loginPrompt(callback);
        }
    }

    UserService.getUserValue = function(){
       return UserService.user.$value;
    }

    UserService.createUser = function(callback, username){
        createUser(callback, username);
    }

    UserService.addShow = function(title, description, file){
            fileRef = ref.child(file['lfFileName']);
            uploadTask = fileRef.put(file['lfFile'])

            uploadTask.then(function(snapshot){
                
                user = $firebaseObject(database.ref('users/' + UserService.user.$id));
                user.$loaded().then(function(user){

                show = {
                    title: title,
                    description: description,
                    imageSrc: snapshot.downloadURL
                }

                if(user.shows != undefined){
                    user.shows.push(show);
                }else{
                    user.shows = [show];
                }
                user.$save().then(function() {
                    console.log('Show Added!');
                }).catch(function(error) {
                    console.log('Error!');
                });
            });
        });
        uploadTask.on("state_changed", function progress(snapshot){
            console.log(Math.round(snapshot.bytesTransferred/snapshot.totalBytes*100) + "%") // progress of upload
        });
    }

    UserService.addEpisode = function(show, title, description, file){
        fileRef = ref.child(file['lfFileName']);
        uploadTask = fileRef.put(file['lfFile'])

        uploadTask.then(function(snapshot){
            
            user = $firebaseObject(database.ref('users/' + UserService.user.$id));
            user.$loaded().then(function(user){

              episode = {                 
                title: title,
                description: description,
                path : snapshot.downloadURL
              }

              for(i = 0; i < user.shows.length; i++){
                if(user.shows[i].title == show){
                  if(user.shows.episodes == undefined){
                    user.shows[i].episodes = [episode];
                  } else {
                    user.shows[i].push(episode);
                  }
                }
              };
              user.$save().then(function() {
                  console.log('Episode Added!');
              }).catch(function(error) {
                  console.log('Error!');
              });
          });
    });

        uploadTask.on("state_changed", function progress(snapshot){
            console.log(Math.round(snapshot.bytesTransferred/snapshot.totalBytes*100) + "%") // progress of upload
        });
    }
    
    return UserService;
});