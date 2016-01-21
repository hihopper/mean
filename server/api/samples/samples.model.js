'use strict'

var mongoose = require('mongoose');

var samplesSchema = mongoose.Schema({
  key: String,
  value: String
});

module.exports = mongoose.model('Samples', samplesSchema);
