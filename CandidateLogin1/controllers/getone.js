var jwt = require("jwt-simple");

var candidateModel = require("../models/candidate");
var config = require("../config/config");

var getone = {
  show: function(req, res, next) {
    var token = req.body.token || req.headers["token"];
    var decoded = jwt.decode(token, config.secretKey);

    candidateModel.findOne(
      {
        $and: [{ username: decoded.username }]
      },
      function(err, user) {
        if (err || !user) {
          res.status(400).json({
            status: "error",
            message: "not an valid :" + err,
            docs: ""
          });
        } else {
          res
            .status(200)
            .json({ status: "success", message: "Success", user: user });
        }
      }
    );
  }
};

module.exports = getone;
