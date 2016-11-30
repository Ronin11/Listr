angular.module('Listr').factory('ListService', function(
    $firebaseObject,
    $http, x2js){
    var ListService = {};

    var database = firebase.database();
    var ref = firebase.storage().ref();


    return ListService;

});








