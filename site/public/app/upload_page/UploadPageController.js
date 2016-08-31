angular
.module('Podcastio')
.controller('UploadPageCtrl', function($scope, $firebaseAuth, $firebaseArray) {

    var ref = firebase.storage().ref();
    var database = firebase.database();

    $scope.$watch('files.length',function(newVal,oldVal){
        //console.log($scope.files);
    });

    $scope.uploadFiles = function(){
        obj = $scope.files[0]
        fileRef = ref.child(obj['lfFileName']);


        uploadTask = fileRef.put(obj['lfFile'])

        uploadTask.then(function(snapshot) {
            collection = database.ref('tal/episodes').push({
                name: obj['lfFileName'],
                path : snapshot.downloadURL
            });
            console.log('Uploaded a blob or file!');
        });

        uploadTask.on("state_changed", function progress(snapshot){
            console.log(Math.round(snapshot.bytesTransferred/snapshot.totalBytes*100) + "%") // progress of upload
        })


    };
});