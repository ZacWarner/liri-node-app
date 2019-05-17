

//node requires
require("dotenv").config();

var keys = require("./keys.js");

var fs = require("fs");


var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");



// user input

var input = process.argv;

var command = input[2];

var medChoice = input.slice(3).join(" ");

//takes input does something
switch (command) {
    case "concert-this":
        bandsInTown(medChoice);
        break;
    case "spotify-this":
        spotifyThis(medChoice);
        break;
    case "movie-this":
        movieThis(medChoice);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("I don't know that command!")



};

//function bands in town
function bandsInTown(medChoice) {
    var artist = medChoice
    console.log(artist);
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(url).then(
        function (response) {

            if (!response.data.length) {
                console.log("I don't know that artist")
            }

            else {
                console.log("===============================");
                console.log('Name of Venue: ' + response.data[0].venue.name);
                console.log('Location: ' + response.data[0].venue.city + ", " + response.data[0].venue.region);
                console.log("date: " + response.data[0].datetime);
                console.log("================================");
            }
        }
    );

}

function spotifyThis(medChoice) {
    var song = medChoice;
    if (song === undefined) {
        song = "the sign";
    };

    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("=======================");
        console.log("Artist: " + data.tracks.items[0].artists.name);
        console.log("Song name: " + data.tracks.items[0].name);
        console.log("Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name)
        console.log("===========================")
    });

};

function movieThis(medChoice) {
    var movie = medChoice;
    if (movie === undefined) {
        movie = 'Mr. Nobody'
    };

    var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=trilogy";

    axios.get(url).then(
        function (response) {
            console.log("===========================================");
            console.log("title: " + response.data.Title);
            console.log("Release Date: " + response.data.Released);
            console.log("Imdb Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country Produced in: " + response.data.Country);
            console.log("language: " + response.data.Language);
            console.log("plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("================================================");
        }
    )



};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");

        itsCommand = dataArr[0];
        itsChoice = dataArr[0]

        switch (itsCommand) {
            case "concert-this":
                bandsInTown(itsChoice);
                break;
            case "spotify-this":
                spotifyThis(itsChoice);
                break;
            case "movie-this":
                movieThis(itsChoice);
                break;
            case "do-what-it-says":
                doWhatItSays();
                break;
            default:
                console.log("I don't know that command!")
        };


    });
}