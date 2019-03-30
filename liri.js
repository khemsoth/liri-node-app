require('dotenv').config();
var keys = require('./keys.js');
var axios = require('axios');
var moment = require('moment');

//var spotify = new Spotify(keys.spotify);
var command = process.argv[2];

if (command === 'concert-this') {
    console.log(command);
    let artist = process.argv[3];
    axios
      .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
      .then(function(res) {
        console.log('---Venue Name---');
        console.log(res.data.venue);
        console.log('---Location---');
        console.log('City: ' + res.venue.city);
        console.log('State: ' + res.venue.region);
        console.log('Country: ' + res.venue.country);
        console.log('---Date---');
        console.log(moment(res.data.datetime).format(MM/DD/YYYY));
      })
}
else if (command === 'spotify-this-song') {
    console.log(command);

}
else if (command === 'movie-this') {
    console.log(command);

}
else if(command === 'do-what-it-says'){
    console.log(command);

}
else {
    console.log('oops, something went wrong');
}