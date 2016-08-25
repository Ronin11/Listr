angular
.module('Podcastio')
.controller('UploadPageCtrl', function($scope, $firebaseArray) {
    var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com/messages");
    // create a synchronized array
    $scope.files = $firebaseArray(ref);


    $scope.$watch('files.length',function(newVal,oldVal){
        console.log($scope.files);
    });

    $scope.uploadFiles = function(){
        var formData = new FormData();
        console.log($scope.files)
        angular.forEach($scope.files,function(obj){
            formData.append('files[]', obj.lfFile);
        });
        $http.post('./upload', formData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(function(result){
            // do sometingh         
        },function(err){
            // do sometingh 
        });
    };
});