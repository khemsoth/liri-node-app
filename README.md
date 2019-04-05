# liri-node-app

The liri node app is uses a couple different APIs in order to retrieve and show some info. 
It uses the Bands-In-Town, Spotify, and OMDB APIs to retrieve the info. 

If you do not have a spotify API key yet, sign up for one here: https://developer.spotify.com/my-applications/#!/

How to use: 

-Create a new .env file using the env.template file. Insert your own Spotify keys
-Open cmd and install all of the npm packages

Spotify: 
-Type 'node liri spotify-this-song "<song name>"'
-Will return artist, song name, preview link, and album

Concert:
-Type: 'node liri concert-this "<artist>"'
-Will return name of venue, location, and date

Movie: 
-Type: 'node liri movie-this "<movie title>"'
-Will return title, year, IMDB rating, Rotten Tomatoes rating, country origin, language, plot, and actors in the movie

Do what it says:
-This function will take whatever is in the random.txt file, and execute it in the terminal
-Type: 'node liri do-what-it-says'
-Will return the result of the random.txt file