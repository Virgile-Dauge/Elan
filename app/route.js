/* Handles the routing queries */
module.exports = function (app, database, io, router) {
  
  /* Index */
  router.get('/', function (req, res, next) {
    res.render('index.ejs');
  });
  
  /* FRONT END PD */
  
}