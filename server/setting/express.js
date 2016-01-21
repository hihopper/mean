'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
//var logger = require('express-logger');

var config = require('./config');

module.exports = function(app) {
  var env = app.get('env');

  app.set('views', path.join(config.root, 'server/views'));
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(bodyParser.urlencoded({ extended: false}));
  app.use(bodyParser.json());
  app.use(function(req, res, next) {
    var cluster = require('cluster');
    if( cluster.isWorker ) {
      console.log('Worker %d is working...', cluster.worker.id);
    }
    next();
  });


  if ('production' === env || 'heroku' === env) {
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', path.join(config.root, 'public'));
//    app.use(logger({path: path.join(config.root, 'server/log/server.log')}));
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', path.join(config.root, 'client'));
  }
};
