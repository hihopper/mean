'use strict'


// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'production';


var express = require('express');
var config = require('./config/environment');

var app = express();
var server = require('https').createServer(config.https, app);

require('./config/express.js')(app);
require('./routes.js')(app);

server.listen(config.port, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});
