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
            console.log(data.imgUrl);
            for(x = 0; x < feed.item.length; x++){
                data.episodes.push(feed.item[x]);
            }
            callback(data);
            
        // this callback will be called asynchronously
        // when the response is available
        }, function errorCallback(response) {
            console.log(response);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }

    EpisodeService.addEpisode = function(info, user, callback){
        fileRef = ref.child(info.file['lfFileName']);
        uploadTask = fileRef.put(info.file['lfFile'])

        uploadTask.then(function(image){
           database.ref().child('users').child(user.uid).once("value", function(snapshot){
                user = snapshot.val();
                episode = {
                    title: info.title,
                    description: info.description,
                    show: info.show.key,
                    owner: user.uid,
                    src: image.downloadURL
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
                database.ref().child('users').child(user.uid).set(user);
            });
        });
        uploadTask.on("state_changed", function progress(snapshot){
            console.log(Math.round(snapshot.bytesTransferred/snapshot.totalBytes*100) + "%") // progress of upload
        });
    }

    return EpisodeService;

});








