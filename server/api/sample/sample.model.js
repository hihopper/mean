'use strict'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var sampleSchema = mongoose.Schema({
  key: { type: String,  index: { unique: true }, require: true },
  value: String
});

sampleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Sample', sampleSchema);
