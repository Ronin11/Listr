angular
    .module('Listr')
    .factory('UserService', function($location,
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
    UserService.setUid = function(uid){
        this.uid = uid;
    }
    UserService.setUsername = function(username){
        this.username = username;
    }
    UserService.userSetup = function(username, callback){
        userKey = userCollection.push().key;
        id = UserService.uid;
        console.log(id);
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
            id: user.uid,
            name: username + "'s Master List"
        });
        update = {};
        update['/users/' + userKey] = user;
        database.update(update).then(function(){
            userCollection.child(userKey).once("value", function(snapshot){
                UserService.user = snapshot.val();
                $location.path('/list/' + UserService.user.uid);
                callback(UserService.user);
            });
        });
    }

    
    // UserService.isLoggedIn = function(){
    //     if(UserService.user){
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    UserService.loginWithGoogle = function(callback){
        loginPrompt(function(uid){
            callback(uid);
        });
    }

    UserService.getUser = function(callback){
        if(UserService.user){
            callback(UserService.user);
        }
        else{
            callback(null);
            // loginPrompt(function(uid){
            //     console.log(uid);
            //     getUser(uid, function(user){
            //         if(user == null){
            //             userSetup(uid, function(user){
            //                 callback(user);
            //             });
            //         } else {
            //             callback(user);
            //         }
            //     });
            // });
        }
    }

    UserService.getUserList = function(){
       return UserService.user.list;
    }

    
    return UserService;
});