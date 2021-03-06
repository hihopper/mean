'use strict'

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var passport = require('passport');
var path = require('path');


//var logger = require('../components/logger');
var config = require('./config');

module.exports = function(app) {
  var env = app.get('env');

  app.set('views', path.join(config.root, 'server/views'));
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(bodyParser.urlencoded({ extended: false}));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(session({
    secret: config.secrets.session,
    resave: false,
    saveUninitialized: true,
    cookie: {
      //    maxAge: 1000 * 60 * 60 * 24 * 7
      maxAge: 1000 * 60 * 60
      //    secure: true
    },
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      db: config.mongo.db_name
    })
  }));
  app.use(passport.initialize());

  /*
  app.use(function(req, res, next) {
    var cluster = require('cluster');
    if( cluster.isWorker ) {
      global.logger.info('Worker %d is working...', cluster.worker.id);
    }
    next();
  });
*/
  if ('heroku' === env) {
    app.use(favicon(path.join(config.root, 'public','favicon.png')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', path.join(config.root, 'public'));
  }

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public','favicon.png')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', path.join(config.root, 'public'));
    app.use(require("morgan")("short", { "stream": global.logger.stream }));
  }

  if ('development' === env || 'test' === env) {
    app.use(favicon(path.join(config.root, 'client','favicon.png')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', path.join(config.root, 'client'));
    app.use(require("morgan")("short", { "stream": global.logger.stream }));
  }

  app.use( function( err, req, res, next) {
    console.error('500 Error');
    console.error(err.stack);

    res.status(500);
    res.send('500 - server error');
  }); // Error handler - has to be last
};
