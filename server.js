/**** Libraries ****/
var express = require("express");
var session = require('express-session');
var ios = require('socket.io-express-session');

var app = express();
var router = express.Router();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var twitter = require('twitter');

/**** Custom libraries ****/
var database = require('./libs/database.js');


/**** Twitter ****/
var client = new twitter({
  consumer_key: 'eGS1wmKed0vp7lfhOK4KH5AH3',
  consumer_secret: 'KlF5VJOvC0gQWBPhnMBgQmUu6irX3HLOjdnbN0XSPzTenC4MNO',
  access_token_key: '728437002-umsMNJXthkjEN9y0IfQfaxD7iNHwCPrE1I6LbqQJ',
  access_token_secret: '5RZptLSdXsieaWZ0YmZ6SuJEGXxQVUka6EsUySCc7JfwF'
});


/**** App configuration ****/
app.engine('html', require('ejs').renderFile);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(cookieParser());

app.use('/', router);

/**** Include routing & socket ****/
require('./app/route.js')(app, database, io, router, twitter);
require('./app/REST.js')(app, client, database, io, router, twitter);

/**** Connection DB - Server ****/
database.connect('localhost', 'root', 'roger12345', 'elan');

database.executeQuery("SELECT H_nom FROM Hashtag", function (res) {
	  var track = "";
	  for (var i = 0; i < res.length; i++) {
	    track = track + "#" + res[i].H_nom;
	    if (i != res.length - 1)
	      track = track + ",";
	  }
	client.stream('statuses/filter', {
	    track: track
	  }, function (stream) {
	    stream.on('data', function (tweet) {
	      if(tweet.place != null){
	        var lng_tweet = tweet.place.bounding_box.coordinates[0][0][0];
	        var lat_tweet = tweet.place.bounding_box.coordinates[0][0][1];
	        console.log(lat_tweet + " " + lng_tweet);
	        
	        var hashtags = [];
	        for(var i = 0; i < tweet.entities.hashtags.length; i++)
	          for(var j = 0; j < res.length; j++)
	            if(tweet.entities.hashtags[i].text.toUpperCase() == res[j].H_nom.toUpperCase())
	              hashtags.push(tweet.entities.hashtags[i].text);

	        for(var i = 0; i < hashtags.length; i++)
	          console.log(hashtags[i]);

	        var queryLgLat = "SELECT Ev_lg, Ev_lat FROM Event";
	        database.executeQuery(queryLgLat, function (result) {
	          var ok = true;
	          for (var i = 0; i < result.length; i++) {
	            var lg = result[i].Ev_lg;
	            var lat = result[i].Ev_lat;
	            var epsilon = 0.008992482;
	            if(Math.abs(lg-lng_tweet) <= epsilon && Math.abs(lat-lat_tweet) <= epsilon){
	              ok = false;
	            }
	          }
	          if(ok){
	            var queryInsertEvent = "INSERT INTO Event (Ev_Date, Ev_lg, Ev_lat, Ev_descr, Ev_traite, Ev_nb_tweets) VALUES (NOW(), " +
	                   lng_tweet + ", " + lat_tweet + ", \"" + tweet.text + "\", FALSE, 1)";
	            database.executeQuery(queryInsertEvent);

	            var queryEvid = "SELECT Ev_id FROM Event WHERE Ev_lg = " + lng_tweet + " AND Ev_lat = " + lat_tweet;
	            database.executeQuery(queryEvid, function (resu) {
	              var Ev_id = resu[0].Ev_id;
	              var queryHid = "SELECT H_id, H_nom FROM Hashtag";
	              database.executeQuery(queryHid, function (r) {
	                for(var i = 0; i < r.length; i++){
	                  for(var j = 0; j < hashtags.length; j++){
	                    if(r[i].H_nom == hashtags[j]){
	                      var H_id = r[i].H_id;
	                      var queryInsertAssoEH = "INSERT INTO AssoEventHashtag (Ev_id, H_id) VALUES (" + Ev_id + ", " + H_id + ")";
	                      database.executeQuery(queryInsertAssoEH);
	                    }
	                  }
	                }
	              });
	            });
	            console.log("BDD Add of the event");
	          }
	          else{
	            //TODO MàJ
	            console.log("Event already present")
	            var queryUpdate = "UPDATE....";
	          }

	        });
	      }
	      else console.log("[ERR] No coordinates " + tweet);

	    });
	});
});

/**** Listenning ****/
server.listen(8080);
