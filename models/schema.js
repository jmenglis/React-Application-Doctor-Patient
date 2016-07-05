var mongoose = require('mongoose');

// userSchema

var userSchema = new mongoose.Schema({
  type: String,
  username: String,
  email: String,
  password: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
