angular.module('Podcastio').factory('EpisodeService', function($http){
    EpisodeService = {}
    EpisodeService.getEpisodes = function(url){
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            console.log(response.data)
        // this callback will be called asynchronously
        // when the response is available
        }, function errorCallback(response) {
            console.log(resposne);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    
    return EpisodeService;

});








