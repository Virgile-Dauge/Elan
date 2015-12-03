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


/**** App configuration ****/
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

/* 1 day cookie */
var my_session = session({
  store: new FileStore(),
  secret: 'NDIThomasKilian2015',
  saveUninitialized: true,
  resave: true,
  duration: 60 * 60 * 1000 * 24
});

app.use(cookieParser());
app.use(my_session);

app.use('/', router);


/**** IO session config ****/
io.use(ios(my_session));


/**** Include routing & socket ****/
//require('./app/routes.js')(app, database, drive, io, passport, router, xlsxj);
//require('./app/socket.js')(app, database, drive, io, router, script_parrain, up_pho);


/**** Connection DB - Server ****/
database.connect('', '', '', '');


/**** Listenning ****/
server.listen(80);