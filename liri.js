// require for keys.js, which is pretty important and needs to be here (node magic)
var keys = require('./keys.js');
// request require
var request = require('request');
// spotify require
var spotify = require('spotify');
// Load the fs package to read and write
var fs = require("fs");
// Store all of the arguments in an array for use in for loops further down
var nodeArgs = process.argv;
// require for eval (used in "do what it says")
var _eval = require('eval')
//twitter require
var Twitter = require('twitter');

// switch statement to allow user to control liri
switch (action) {
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
    spotifyThisSong();
    break;
  case "movie-this":
    movieThis();
    break;
  case "do-what-it-says":
  	doWhatItSays();
  	break;
}

// twitter command

// url to query twitter
var queryTwitter = 'https://api.twitter.com/1.1/statuses/user_timeline.json?count=20&user_id=diaphainein&screen_name=diaphainein'
// 1. `node liri.js my-tweets`
var myTweets = function() {
	// call to twitter
	keys.get(queryTwitter, function(error, tweets, response) {
		if(!error && response.statusCode === 200) {
			console.log(tweets);  // The tweets.  
			console.log(JSON.stringify(response, null, 2);
		} else {
			console.log(err);
		}	 
	});
};

// spotify command

// var to hold song input
var songName = nodeArgs;
// Loop through all the words in the node argument
for (var i = 2; i < nodeArgs.length; i++) {

	if (i > 2 && i < nodeArgs.length) {

		songName = songName + "+" + nodeArgs[i];
	}

	else {

		songName += nodeArgs[i];
	}
}
// 2. `node liri.js spotify-this-song '<song name here>'`
var spotifyThisSong = function() {
	spotify.search({ type: 'track', query: songName }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    } 
	    // 	* if no song is provided then your program will default to "The Sign" by Ace of Base
	    else if (!songName) {
		    spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
			    if ( err ) {
			        console.log('Error occurred: ' + err);
			        return;
			    } 
			});
	    }
	    // response from Spotify
	    console.log(JSON.stringify(data, null, 2));
	});
};


// omdb command

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
for (var i = 2; i < nodeArgs.length; i++) {

	if (i > 2 && i < nodeArgs.length) {

		movieName = movieName + "+" + nodeArgs[i];
	}

	else {

		movieName += nodeArgs[i];
	}
}

// query URL to omdb with the movie name inside
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";
	// 	* If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
	if(!movieName) {
		movieName = "Mr+Nobody";
	}

// 3. `node liri.js movie-this '<movie name here>'`
var movieThis = function() {
	request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover the movie title, release year, IMDB rating, country produced, language move is in, plot, starring actors, Rotten Tomatoes rating, and Rotten Tomatoes URL
    console.log("Title: " + JSON.parse(body).Title + "\nRelease Year: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value  + "\nCountry Produced: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nRotten Tomatoes URL: " +JSON.parse(body).Ratings[1].Source);
  }


});

};

// "Do what it says" command 

// 4. `node liri.js do-what-it-says`
var doWhatItSays = function() {
	// 	* Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
	fs.readFile("random.txt", "utf8", function(err, data) {
		var result = _eval('node liri.js' + data);
		console.log(result);

	};
};


