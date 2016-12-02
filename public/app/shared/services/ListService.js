angular.module('Listr').factory('ListService', function(
    $firebaseObject,
    $http, x2js){
    var ListService = {};

    var database = firebase.database().ref();
    var listCollection = database.child('lists');


    ListService.getUserMasterList = function(user, callback){
        this.getList(user, user.masterlist, callback);
    };

    ListService.getList = function(user, listId, callback){
        listCollection.child(listId)
            .once("value", function(snapshot){
            list = snapshot.val();
            if(user.uid == list.owner){
                callback(list);
            }else{
                callback(null);
            }
        });
    }
    
    ListService.addToList = function(user, listId, obj, callback){
        this.getList(user, listId, function(list){
            if(list == null);
            else{
                list.pushContent(obj);
            }

            // else if(list.contents == null){
            //     list.contents = [obj];
            // }else{
            //     list.contents.push(obj);
            // }
            updates = {};
            updates['/lists/' + list.id] = list;
            database.update(updates).then(function(){
                ListService.getList(user, listId, callback);
            });
        });
    }

    ListService.createList = function(user, parentList, callback){
        id = listCollection.push().key;
        list = {
            parent: parentList.id,
            owner: user.uid,
            id: id
        }
        // if(parentList.contents == null){
        //     parentList.contents = [{
        //         id: id,
        //         type: "List"
        //     }];
        // }else{
        //     parentList.contents.push({
        //         id: id,
        //         type: "List"
        //     })
        // }
        parentList.pushContent({
                id: id,
                type: "List"
            });
        updates = {};
        updates['/lists/' + id] = list;
        updates['/lists/' + parentList.id] = parentList;
        database.update(updates).then(function(){
            ListService.getList(user, id, callback);
        })
    }

    return ListService;

});








