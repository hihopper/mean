'use strict'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var userSchema = mongoose.Schema({
  userId: { type: String,  index: { unique: true }, require: true },
  name:     String,
  role:     { type: String, default: 'user', enum: ['user', 'admin'] },
  hashedPwd:String,
  salt:     String,
  regDate:  Date
});

userSchema.virtual('passwd')
  .set(function(passwd) {
    this._passwd = passwd;
  })
  .get(function(){
    return this._passwd;
  });

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema);
