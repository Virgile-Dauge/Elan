/* Handles the routing queries */
module.exports = function (app, client, database, io, router, twitter) {

  router.get('/rest/events', function (req, result) {

    var myQuery = "SELECT * FROM event";
    database.executeQuery(myQuery, function (res) {
      var json = [];
      for (var i = 0; i < res.length; i++) {
        json.push(JSON.stringify({
          id: res[i].Ev_id,
          date: res[i].Ev_date,
          lattitude: res[i].Ev_lat,
          longitude: res[i].Ev_lg,
          description: res[i].Ev_descr,
          nb_tweet: res[i].Ev_nb_tweet
        }));
      }
      result.send(json);
    });
  });

  router.get('/rest/event/:id', function (req, result) {
    var id_event = req.params.id;

    var myQuery = "SELECT * FROM event WHERE Ev_id = " + id_event + " LIMIT 1";
    database.executeQuery(myQuery, function (res) {
      var json = [];
      json.push(JSON.stringify({
        date: res[0].Ev_date,
        lattitude: res[0].Ev_lat,
        longitude: res[0].Ev_lg,
        description: res[0].Ev_descr,
        nb_tweet: res[0].Ev_nb_tweet
      }));
      result.send(json);
    });
  })

  router.get('/rest/event/tweet/:id', function (req, result) {
    var id_event = req.params.id;

    var myQuery = "SELECT Ev_descr FROM event WHERE Ev_id = " + id_event + " LIMIT 1";
    database.executeQuery(myQuery, function (res) {
      client.get('search/tweets', {
        q: res[0].Ev_descr,
        count: 20
      }, function (error, tweet, response) {
        result.send(tweet);
      })
    });
  });
}
