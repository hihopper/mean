'use strict'

var path = require('path');
var fs = require('fs');

var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 5000,

  // Server IP
  ip: process.env.IP || 'localhost',

  https: {
    key: fs.readFileSync(path.join(path.normalize(__dirname + '/../../..') , 'server/ssl/hihopper.pem')),
    cert: fs.readFileSync(path.join(path.normalize(__dirname + '/../../..'), 'server/ssl/hihopper.crt'))
  }
};

module.exports = all;
