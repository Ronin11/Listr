angular
.module('Podcastio')
.controller('UploadPageCtrl', function($scope, $firebaseAuth, $firebaseArray) {
    // var ref = firebase.database().ref();
    // // create a synchronized array
    // $scope.authObj = $firebaseAuth();
    // console.log($scope.authObj);
    // $scope.fbFiles = $firebaseArray(ref);

    // Get a reference to the storage service, which is used to create references in your storage bucket
    var ref = firebase.storage().ref();
    var temp = ref.child("file.mp3");


    $scope.$watch('files.length',function(newVal,oldVal){
        console.log($scope.files);
        // $scope.fbFiles = $scope.files;
    });

    $scope.uploadFiles = function(){
        // var formData = new FormData();
        // console.log($scope.files)
        // angular.forEach($scope.files,function(obj){
        //     formData.append('files[]', obj.lfFile);
        // });
        // $http.post('./upload', formData, {
        //     transformRequest: angular.identity,
        //     headers: {'Content-Type': undefined}
        // }).then(function(result){
        //     // do sometingh         
        // },function(err){
        //     // do sometingh 
        // });

        obj = $scope.files[0]
        obj = new File(["PENIS"], "FuckMeInTheAssCuzILoveJesus.txt");
        console.log(obj)
        
        temp.put(obj).then(function(snapshot) {
            console.log('Uploaded a blob or file!');
        });


        // var uploadTask = ref.child('test/test.mp3').put($scope.files);

        // // Register three observers:
        // // 1. 'state_changed' observer, called any time the state changes
        // // 2. Error observer, called on failure
        // // 3. Completion observer, called on successful completion
        // uploadTask.on('state_changed', function(snapshot){
        // // Observe state change events such as progress, pause, and resume
        // // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
        // switch (snapshot.state) {
        //     case firebase.storage.TaskState.PAUSED: // or 'paused'
        //     console.log('Upload is paused');
        //     break;
        //     case firebase.storage.TaskState.RUNNING: // or 'running'
        //     console.log('Upload is running');
        //     break;
        // }
        // }, function(error) {
        // // Handle unsuccessful uploads
        // }, function() {
        // // Handle successful uploads on complete
        // // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        // var downloadURL = uploadTask.snapshot.downloadURL;
        // console.log(downloadURL);
        // });

    };
});