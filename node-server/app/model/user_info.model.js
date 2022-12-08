const mongoose = require('mongoose');
const schema = mongoose.Schema;
const crypto = require('crypto');

var userSchema = new schema({
  //{type:String,default:crypto.randomBytes(16).toString('hex')},
  nickname:String,
  username:String,
  password:String,
  // token:{type:String,default:crypto.randomBytes(16).toString('hex')},
  loggedIn:{type:Boolean,default:false},
  createdBy:String,
  onCreated:{ type: Date, default: Date.now }
});

//var customer = mongoose.model('customer', userSchema);
module.exports = mongoose.model('users', userSchema);
