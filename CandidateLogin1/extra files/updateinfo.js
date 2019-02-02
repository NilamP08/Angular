var jwt = require("jwt-simple");

var candidateModel = require("../models/candidate");
var config = require("../config/config");

var updateinfo = {
  show: function(req, res, next) {
    //var candidate = new candidateModel();
    var token = req.body.token || req.headers["token"];
    var decoded = jwt.decode(token, config.secretKey);

    var myquery = { username: decoded.username };
    var newvalues = {
      $set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthdate: req.body.birthdate.slice(0, 10),
        gender: req.body.gender,
        // hobby: filter_array(req.body.hobby),
        phoneNo: req.body.phoneNo,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
        // username: req.body.username
        // pic = this.set,
      }
    };
    candidateModel.updateOne(myquery, newvalues, function(err) {
      if (err) {
        throw err;
      } else {
        res.status(200).json({
          status: true,
          message: "success",
          docs: { err: "Error" }
        });

        console.log("1 document updated");
      }
    });
  }
};

function filter_array(test_array) {
  console.log("inside filter array");
  var index = -1,
    arr_length = test_array ? test_array.length : 0,
    resIndex = -1,
    result = [];

  while (++index < arr_length) {
    var value = test_array[index];

    if (value) {
      result[++resIndex] = value;
    }
  }
  console.log(result);
  return result;
}
module.exports = updateinfo;
