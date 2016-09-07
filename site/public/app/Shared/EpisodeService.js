angular.module('Podcastio').factory('EpisodeService', function(
    $firebaseObject,
    $http, x2js){
    EpisodeService = {}

    var database = firebase.database();
    var ref = firebase.storage().ref();

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

    EpisodeService.addEpisode = function(info, callback){
        fileRef = ref.child(info.file['lfFileName']);
        uploadTask = fileRef.put(info.file['lfFile'])

        uploadTask.then(function(snapshot){
            user = $firebaseObject(database.ref('users/' + user.$id));
            user.$loaded().then(function(user){
                episode = {
                    title: info.title,
                    description: info.description,
                    show: info.show.key,
                    owner: user.$id,
                    src: snapshot.downloadURL
                }
                episodeKey = database.ref().child('shows').child(info.show.key).push(episode).key;

                for(i = 0; i < user.shows.length; i++){
                    if(user.shows[i].key == info.show.key){
                        if(user.shows[i].episodes == undefined){
                            user.shows[i].episodes = [episodeKey];
                        }else{
                            user.shows[i].episodes.push(episodeKey);
                        }
                    }
                }
                user.$save().then(function() {
                    console.log('Show Added!');
                }).catch(function(error) {
                    console.log('Error!');
                });
            });
        });
        uploadTask.on("state_changed", function progress(snapshot){
            console.log(Math.round(snapshot.bytesTransferred/snapshot.totalBytes*100) + "%") // progress of upload
        });
    }

    
    
    return EpisodeService;

});








