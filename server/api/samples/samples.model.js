'use strict'

var mongoose = require('mongoose');

var samplesSchema = mongoose.Schema({
  key: { type: String,  index: { unique: true }, require: true }, 
  value: String
});

module.exports = mongoose.model('Samples', samplesSchema);
