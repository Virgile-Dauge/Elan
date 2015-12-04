/* Handles the routing queries */
module.exports = function (app, client, database, io, router, twitter) {

  router.get('/events', function (req, res) {

    var myQuery = "SELECT * FROM event";
    console.log("here");
    database.executeQuery(myQuery, function (res) {
      var json=[];
      for( var i = 0; i < res.length; i++){
        json.push(JSON.stringify({date: res[i].Ev_date, lattitude: res[i].Ev_lat, longitude: res[i].Ev_lg, description: res[i].Ev_descr, priority:res[i].Ev_nb_tweet}));
      }
      
      console.log(json);     
    });
  })

}
