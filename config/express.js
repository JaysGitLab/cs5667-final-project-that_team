const config = require('./config');
const http = require('http');
const socketio = require('socket.io');
const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const path = require('path');
const configureSocket = require('./socketio.js');
const passport = require('passport');

module.exports = function(db) {
  /* Create our express application, wrap it with http, and start socketio. */
  const app = express();
  const server = http.createServer(app);
  const io = socketio.listen(server);

  /*Handle different NODE_ENV configurations. */
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); //Log all requests in dev.
    /* add other developement middlewear here */
  }
  else if (process.env.NODE_ENV === 'production') {
    app.use(compress()); //Compress in production.
    /* add other produciton middlewear here */
  }

  /*Add bodyParser middlewear to handle POST, GET, JSON, etc.*/
  app.use(bodyParser.urlencoded({
    extended : true
  }));
  app.use(bodyParser.json());

  /*Add methodOverride middlewear to allow us to override some methods.*/
  app.use(methodOverride());

  /* Configure our app with our views. */
  app.set('views', './app/views');
  app.set('view engine', 'ejs');

  /* Configure flash for sending messages between pages. */
  app.use(flash());

  /* Use passport for admin login */
  app.use(passport.initialize());
  app.use(passport.session());

  /* Set up important routes. */
  app.use('/', express.static(path.resolve('./public')));
  app.use('/lib', express.static(path.resolve('./node_modules')));

  require('../app/routes/index.server.routes.js')(app);
  /* TODO: Add other module routes here. */

  /* Configure our socketio instance with our server and mongoStore instance. */
  configureSocket(server, io);
  return server;
};
