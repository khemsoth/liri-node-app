require('dotenv').config();
var keys = require('./keys.js');
var axios = require('axios');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];

function concert() {
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

function music() {
    let song = process.argv[3];
    spotify.search({type: 'track', query: song, limit: 10}, function(err, data){
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        let info = data.tracks;
        for (var i = 0; i < info.items.length; i++) {
          console.log('\r\nArtist: ' + info.items[i].artists[0].name);
          console.log('Song: ' + info.items[i].name);
          console.log('Preview: ' + info.items[i].external_urls.spotify);
          console.log('Album: ' + info.items[i].album.name);
          console.log('============================');
        }
    })
}

function movie() {
    let title = process.argv[3];
    axios  
      .get('http://www.omdbapi.com/?apikey=trilogy&t=' + title)
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
      )
}

if (command === 'concert-this') {
    console.log(command);
    concert();
}
else if (command === 'spotify-this-song') {
    console.log(command);
    music();
}
else if (command === 'movie-this') {
    console.log(command);
    movie();
    }
else if(command === 'do-what-it-says'){
    
    fs.readFile('random.txt', 'utf8', function(err, data) {
        console.log(data);
        var ranData = data.split(',');
        if (err) {
            return console.log(err);
        }
        else if (ranData[0] === 'concert-this') {
            let artist = ranData[1];
            axios
              .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=keithsappid")
              .then(function(res) {
                let info = res.data;
                console.log(info);
                for (var i = 0; i < res.data.length; i++) {
                  console.log('Venue: ' + res.data[i]);
                  console.log('Location: ' + res.data[i].venue.city + ',' + info[i].venue.region + ',' + info[i].venue.country);
                  console.log('Date: ' + moment(res.data[i].datetime).format('MM DD YYYY'));
                  console.log('----------------');
              }})      
         }
        else if (ranData[0] === 'spotify-this-song') {
            let song = ranData[1];
            spotify.search({type: 'track', query: song, limit: 10}, function(err, data){
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                let info = data.tracks;
                for (var i = 0; i < info.items.length; i++) {
                  console.log('\r\nArtist: ' + info.items[i].artists[0].name);
                  console.log('Song: ' + info.items[i].name);
                  console.log('Preview: ' + info.items[i].external_urls.spotify);
                  console.log('Album: ' + info.items[i].album.name);
                  console.log('============================');
                }
            })
        }
        else if (ranData[0] === 'movie-this') {
            let title = ranData[1];
            axios  
              .get('http://www.omdbapi.com/?apikey=trilogy&t=' + title)
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
              )            }
    })

}
else {
    console.log('oops, something went wrong');
}