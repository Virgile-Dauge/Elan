/* Handles the routing queries */
module.exports = function (app, client, database, io, router, twitter) {

  router.get('/event', function (req, res) {
    
    
    
    client.stream('statuses/filter', {
      track: '#CauchemarAlHotel #kebab'
    }, function (stream) {
      stream.on('data', function (tweet) {
        console.log(tweet.text);
      });

      stream.on('error', function (error) {
        throw error;
      });
    });
  });
  
}
