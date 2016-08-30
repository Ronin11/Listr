angular.module('Podcastio').factory('EpisodeService', function($http, x2js){
    EpisodeService = {}

    EpisodeService.getEpisodes = function(url, callback){
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            console.log(response);
            data = {}
            data.episodes = []
            feed = response.data.rss.channel;
            console.log(response.data);
            data.title = feed.title
            data.summary = feed.summary
            data.imgUrl = feed.image[0].url
            for(x = 0; x < feed.item.length; x++){
                data.episodes.push(feed.item[x]);
            }
            callback(data);
            
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








