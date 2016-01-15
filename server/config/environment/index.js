'use strict'

var path = require('path');

var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 5000,

  // Server IP
  ip: process.env.IP || 'localhost'
};

module.exports = all;
