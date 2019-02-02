var jwt = require("jwt-simple");

var candidateModel = require("../models/candidate");
var config = require("../config/config");

module.exports = function(req, res, next) {
  try {
    if (
      req.path == "/myapi/login/" ||
      req.path == "/myapi/states/" ||
      req.path == "/myapi/candidates/" ||
      req.path == "/myapi/sendmail/" ||
      req.path == "/myapi/resetpassword/" ||
      req.path == "/myapi/ProfilePicture/" ||
      req.path == "/myapi/getoneman/" ||
      req.path == "/myapi/update" ||
      req.path == "/myapi/candidate/" ||
      req.path == "/myapi/usercheck/"
    ) {
      console.log("inside iffff");
      next();
    } else {
      var token = req.body.token || req.headers["token"];
      var decoded = jwt.decode(token, config.secretKey);

      candidateModel.findOne(
        {
          $and: [{ _id: decoded._id }]
        },
        function(err, user) {
          if (err || !user) {
            res.status(400).json({
              status: "error",
              message: "not an valid :" + err,
              docs: ""
            });
          }
          {
            console.log("user passed the test move on !!!");
            next();
          }
        }
      );
    }
  } catch (err) {
    console.log(err);

    res.status(400);
    res.json({
      status: "error",
      message: "Token:oopss something wents wrong"
    });
  }
};
