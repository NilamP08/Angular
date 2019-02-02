var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var candidate = new Schema({
  firstname: String,
  lastname: String,
  birthdate: String,
  gender: String,
  hobies: [{ type: String, enum: ["Cricket", "Singing", "Dancing", "Acting"] }],
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
