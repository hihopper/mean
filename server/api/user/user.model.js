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


userSchema.path('userId')
.validate(function(value) {
//  if (authTypes.indexOf(this.provider) !== -1) return true;
  if (value.length >= 8 && value.length <= 20) {
    return true;
  }
  return false;
}, '사용자 ID는 최소 8자 이상 최대 20자 이하여야 합니다.')
.validate(function(value, respond) {
  var self = this;
  this.constructor.findOne({userId: value}, function(err, user) {
    if(err) throw err;
    if(user) {
      if(self.id === user.id) return respond(true);
      return respond(false);
    }
    respond(true);
  });
}, '해당 사용자 ID는 이미 사용 중 입니다.');


userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema);
