var mongoose = require('mongoose');

// userSchema

var userSchema = new mongoose.Schema({
  type: String,
  username: String,
  password: String
});

var User = mongoose.model('User', userSchema);

var patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: String
});

var Patient = mongoose.model('Patient', patientSchema);


var fileSchema = new mongoose.Schema({
  username: String,
  file: []
});

var File = mongoose.model('File', fileSchema);

module.exports = {
  User: User,
  Patient: Patient,
  File: File
}
