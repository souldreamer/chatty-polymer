'use strict';

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8888;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var bcrypt   = require('bcrypt-nodejs');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
// connect to our database
mongoose.connect(configDB.url);

// pass passport for configuration
//require('./config/passport')(passport);

// set up our express application
// log every request to the console
app.use(morgan('dev'));
// read cookies (needed for auth)
app.use(cookieParser());
// get information from html forms
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set up ejs for templating
app.set('view engine', 'ejs');

// required for passport
// session secret
app.use(session({
  secret: 'ilovescotchscotchyscotchscotch',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());
// use connect-flash for flash messages stored in session
app.use(flash());

// routes ======================================================================
// load our routes and pass in our app and fully configured passport
//require('./routes.js')(app, passport);
var router = express.Router();
router.get('/:file', function (req, res) {
  res.send(bcrypt.hashSync(req.params.file, bcrypt.genSaltSync(8), null));
});
app.use('/', router);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
