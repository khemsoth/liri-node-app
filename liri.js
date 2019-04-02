require('dotenv').config();
var keys = require('./keys.js');
var axios = require('axios');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];

if (command === 'concert-this') {
    console.log(command);
    let artist = process.argv[3];
    axios
      .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
      .then(function(res) {
        let info = res.data;
        for (var i = 0; i < info.length; i++) {
          console.log('Venue: ' + info[i].venue.name);
          console.log('Location: ' + info[i].venue.city + ',' + info[i].venue.region + ',' + info[i].venue.country);
          console.log('Date: ' + moment(info[i].datetime).format('MM DD YYYY'));
          console.log('----------------');
      }})
}
else if (command === 'spotify-this-song') {
    console.log(command);
    let song = process.argv[3];
    spotify.search({type: 'track', query: song, limit: 10}, function(err, data){
        if (err) {
            return console.log('Error occurred: ' + err);
        }
//-----------All data in an array------------ 
        let info = data.tracks;
        for (var i = 0; i < info.items.length; i++) {
          console.log('\r\nArtist: ' + info.items[i].artists[0].name);
          console.log('Song: ' + info.items[i].name);
          console.log('Preview: ' + info.items[i].external_urls.spotify);
          console.log('Album: ' + info.items[i].album.name);
        }
    })
}
else if (command === 'movie-this') {
    console.log(command);
    let movie = process.argv[3];
    axios  
      .get('http://www.omdbapi.com/?apikey=trilogy&t=' + movie)
      .then(function(res){
          console.log('Movie Title: ' + res.data.Title);
          console.log('Year of Release: ' + res.data.Released);
          console.log('IMDB Rating: ' + res.data.imdbRating);
          if (res.data.Ratings.Source === 'Rotten Tomatoes'){
            console.log('Rotten Tomatoes Rating: ' + res.data.Ratings.Source);
          } else{
              console.log('Rotten Tomatoes Rating: N/A');
          }
          console.log('Country of Production: ' + res.data.Country);
          console.log('Movie Language: ' + res.data.Language);
          console.log('Movie Plot: ' + res.data.Plot);
          console.log('Actors/Actresses: ' + res.data.Actors);
      }
      )}
else if(command === 'do-what-it-says'){
    console.log(command);

}
else {
    console.log('oops, something went wrong');
}