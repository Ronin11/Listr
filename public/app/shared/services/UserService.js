angular
    .module('Listr')
    .factory('UserService', function(
        $firebaseAuth, $firebaseArray, $firebaseObject){

    var UserService = {};

    var database = firebase.database();

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
        console.log(id);
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
            username: username,
            masterlist: userKey
        }
        database.ref('/lists/' + user.masterlist).set({
            owner: user.uid,
            id: user.uid
        });
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
                console.log(uid);
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

    UserService.getUserList = function(){
       return UserService.user.list;
    }

    
    return UserService;
});