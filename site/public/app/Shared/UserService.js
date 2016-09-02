angular
    .module('Podcastio')
    .factory('UserService', function($firebaseAuth, $firebaseObject){
    var UserService = {};

    var database = firebase.database();

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
    
    return UserService;
});