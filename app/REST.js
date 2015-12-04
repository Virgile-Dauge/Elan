/* Handles the routing queries */
module.exports = function (app, client, database, io, router, twitter) {

  router.get('/event', function (req, res) {

    var myQuery = "SELECT H_nom FROM Hashtag";
    database.executeQuery(myQuery, function (res) {
      var track = "";
      for (var i = 0; i < res.length; i++) {
        track = track + "#" + res[i].H_nom;
        if( i != res.length -1)
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

        stream.on('error', function (error) {
          throw error;
        });
      });
    });
    res.render("index.ejs");
  });

}
