angular
    .module('Listr')
    .factory('UserService', function(
        $firebaseAuth, $firebaseArray, $firebaseObject){

    var UserService = {};

    var database = firebase.database().ref();
    var userCollection = database.child('users');
    var convCollection = database.child('conv');

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
        convCollection.child(gid).once("value", function(snapshot){
            uid = snapshot.val();
            try{
                userCollection.child(uid).once("value", function (snapshot){
                    UserService.user = snapshot.val();
                    callback(UserService.user);
                });
            } catch(error){
                callback(null); 
            }
        });
    }
    function userSetup(id, callback){
        username = "";
        userKey = userCollection.push().key;
        conv = {
            uid: userKey
        }
        convCollection.child(id).push();
        convUpdate = {}
        convUpdate['/conv/' + id] = userKey;
        database.update(convUpdate);

        user = {
            //gid: id,
            uid: userKey,
            username: username,
            masterlist: userKey
        }
        database.child('/lists/' + user.masterlist).set({
            owner: user.uid,
            id: user.uid
        });
        update = {};
        update['/users/' + userKey] = user;
        database.update(update).then(function(){
            userCollection.child(userKey).once("value", function(snapshot){
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
                        userSetup(uid, function(user){
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