'use strict'

var express = require('express');
var path = require('path');

var config = require('./environment');

module.exports = function(app) {
  var env = app.get('env');

  app.set('views', path.join(config.root, 'server/views'));
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');


  if ('production' === env) {
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', path.join(config.root, 'public'));
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', path.join(config.root, 'client'));
  }
};
