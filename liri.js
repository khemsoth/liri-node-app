require('dotenv').config();
var keys = require('./keys.js');

//var spotify = new Spotify(keys.spotify);
var command = process.argv[2];

if (command === 'concert-this') {
    console.log(command);
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