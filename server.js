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


/**** Listenning ****/
server.listen(8080);