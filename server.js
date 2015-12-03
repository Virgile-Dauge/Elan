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
var FileStore = require('session-file-store')(session);


/**** Custom libraries ****/
var database = require('./libs/database.js');


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
require('./app/route.js')(app, database, io, router);
require('./app/REST.js')(app, database, io, router);


/**** Connection DB - Server ****/
database.connect('localhost', 'root', 'roger12345', 'elan');


/**** Listenning ****/
server.listen(8080);