var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var candidate = new Schema({
  firstname: String,
  lastname: String,
  birthdate: String,
  gender: String,
  hobby: String,
  phoneNo: String,
  address: String,
  city: String,
  state: String,
  zipcode: String,
  email: String,
  password: String,
  confirmPassword: String,
  username: String,
  pic: String
});

module.exports = mongoose.model("candidate", candidate);
