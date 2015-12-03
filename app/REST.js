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
      console.log(track);

      client.stream('statuses/filter', {
        track: track
      }, function (stream) {
        stream.on('data', function (tweet) {
          if(tweet.place != null){
            console.log(tweet.place.bounding_box.coordinates[0][0][0]);
            console.log(tweet.place.bounding_box.coordinates[0][0][1]);
            console.log(tweet.text);
           
            myQuery = "INSERT INTO 
            database.executeQuery
          }
          else console.log("VTTF");
        });

        stream.on('error', function (error) {
          throw error;
        });
      });
    });
    res.render("index.ejs");
  });

}
