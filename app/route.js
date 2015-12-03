/* Handles the routing queries */
module.exports = function (app, database, io, router) {
  
  /* Index */
  router.get('/', ensureAuthenticated, function (req, res, next) {
    res.render('index.ejs';
  }
  
}