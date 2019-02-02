var candidateModel = require("../models/candidate");
var nodemailer = require("nodemailer");
const Cryptr = require("cryptr");
var multer = require("multer");
var jwt = require("jwt-simple");
var config = require("../config/config");
var getone = require("./getone");

var set;

var candidates = {
  show: function(req, res) {
    res.status(200).json({ status: "success", message: "Success" });
  },

  /*
   *
   *getall function to show all data
   */
  getAll: function(req, res) {
    console.log("inside the GetAll");
    candidateModel.find(function(err, docs) {
      if (err) {
        res.status(500).json({
          status: "error",
          message: "Datebase Error:" + err,
          docs: ""
        });
      } else {
        res
          .status(200)
          .json({ status: "success", message: "Success", docs: docs });
      }
    });
  },

  getOne: function(req, res) {
    candidateModel.findById(req.params.id, function(err, doc) {
      if (err) {
        res.status(500).json({
          status: "error",
          message: "Datebase Error:" + err,
          doc: { value: req.params.id }
        });
      } else {
        res
          .status(200)
          .json({ status: "success", message: "Success", docs: doc });
      }
    });
  },

  /*
   *
   *create function accepts data of candidates
   */

  create: function(req, res) {
    var flag = null;
    var candidate = new candidateModel();
    candidate.firstname = req.body.firstname;
    candidate.lastname = req.body.lastname;
    candidate.birthdate = req.body.birthdate.slice(0, 10);
    candidate.gender = req.body.gender;
    candidate.hobies = filter_array(req.body.hobies);
    candidate.phoneNo = req.body.phoneNo;
    candidate.address = req.body.address;
    candidate.city = req.body.city;
    candidate.state = req.body.state;
    candidate.zipcode = req.body.zipcode;
    candidate.email = req.body.email;
    candidate.password = req.body.password;
    candidate.confirmPassword = req.body.confirmPassword;
    candidate.username = req.body.username;
    candidate.pic = this.set;

    candidateModel.find(function(err, docs) {
      if (err) {
        res.status(500).json({
          status: "error",
          message: "Datebase Error:" + err,
          docs: ""
        });
      } else {
        for (i = 0; i < docs.length; i++) {
          if (candidate.email === docs[i].email) {
            flag = 1;
            break;
          } else if (candidate.username === docs[i].username) {
            flag = 2;
            break;
          } else {
            flag = 0;
          }
        }
      }

      if (flag == 1) {
        console.log("email already in use");
        res.status(200).json({
          status: false,
          message: "emailError",
          docs: { err: "not unique email" }
        });
      } else if (flag == 2) {
        console.log("username already in use");
        res.status(200).json({
          status: true,
          message: "usernameError",
          docs: { err: "not unique username" }
        });
      } else {
        console.log("unique");
        candidate.save(function(err) {
          if (err) {
            res.status(500).json({
              status: "error",
              message: "Datebase Error:" + err,
              docs: ""
            });
          } else {
            res.status(200).json({
              status: "success",
              message: "Added to Mongo successfully",
              doc: ""
            });
          }
        });
      }
    });
  },

  /*
   *
   *loginCheck function validates whether username and pasword is right or wrong
   

  logincheck: function(req, res) {
    var flag = null;
    var candidate = new candidateModel();
    candidate.username = req.body.username;
    candidate.password = req.body.password;
    candidateModel.find(function(err, docs) {
      if (err) {
        res.status(500).json({
          status: "error",
          message: "Datebase Error:" + err,
          docs: ""
        });
      } else {
        for (i = 0; i < docs.length; i++) {
          if (
            candidate.username === docs[i].username &&
            candidate.password === docs[i].password
          ) {
            flag = 1;
            break;
          } else {
            flag = 0;
          }
        }
      }
      if (flag == 1) {
        res.status(200).json({
          status: false,
          message: "Error",
          docs: { err: "not unique" }
        });
      } else {
        res.status(200).json({
          status: "Not Present in Database",
          message: "success",
          docs: { err: "successfully login" }
        });
      }
    });
  },
  */

  logincheck: function(req, res) {
    console.log(" @@@ Inside logincheck");
    candidateModel.findOne(
      {
        $and: [{ username: req.body.username }, { password: req.body.password }]
      },
      function(err, user) {
        console.log("***********************************");
        //console.log(user);

        if (err || !user) {
          res.status(200).json({
            status: false,
            message: "Auth validate :not an valid :" + err,
            docs: ""
          });
        } else {
          var payload = { _id: user._id };
          //var secret = config.secretKey;
          var token = jwt.encode(payload, config.secretKey);
          // decode
          //var decoded = jwt.decode(token,secretKey);
          //console.log(decoded); //=> { foo: 'bar' }
          res.status(200).json({
            status: true,
            message: "Auth validate:login sucessfull",
            token: token
          });
        }
      }
    );
  },

  /*
   *
   *sendMail function use to send Mail to user to reset password
   */

  sendmail: function(req, res) {
    var flag = null;
    var candidate = new candidateModel();
    const cryptr = new Cryptr("nilampawar707");
    const encryptedString = cryptr.encrypt(req.body.email);
    candidate.email = req.body.email;
    candidateModel.find(function(err, docs) {
      if (err) {
        res.status(500).json({
          status: "error",
          message: "Datebase Error:" + err,
          docs: ""
        });
      } else {
        for (i = 0; i < docs.length; i++) {
          if (candidate.email === docs[i].email) {
            flag = 1;
            break;
          } else {
            flag = 0;
          }
        }
      }
      if (flag == 1) {
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "nilam@amdev.in",
            pass: "asdfghjkl"
          }
        });
        var mailOptions = {
          // from: "nilam.pawar070@gmail.com",
          to: req.body.email,
          subject: "Sending Email from  job portal ",
          text: `To change your Password click here : \n http://localhost:4200/resetPassword/${encryptedString}  \n\n\n\n\n
          Note: This is an auto-generated mail. Please do not reply. `
        };
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        res.status(200).json({
          status: false,
          message: "Error",
          docs: { err: "not unique" }
        });
      } else {
        res.status(200).json({
          status: "Not Present in Database",
          message: "success",
          docs: { err: "successfully login" }
        });
      }
    });
  },

  /*
   *
   *resetPassword function use to send Mail to user to reset password
   */

  resetpassword: function(req, res) {
    var flag = null;
    var candidate = new candidateModel();

    const cryptr = new Cryptr("nilampawar707");
    candidate.email = cryptr.decrypt(req.body.email);
    candidateModel.find(function(err, docs) {
      if (err) {
        res.status(500).json({
          status: "error",
          message: "Datebase Error:" + err,
          docs: ""
        });
      } else {
        for (i = 0; i < docs.length; i++) {
          if (candidate.email === docs[i].email) {
            flag = 1;
            break;
          } else {
            flag = 0;
          }
        }
      }
      if (flag == 1) {
        var myquery = { email: candidate.email };
        var newvalues = {
          $set: {
            password: req.body.password,
            confirmPassword: req.body.password
          }
        };
        candidateModel.updateOne(myquery, newvalues, function(err, res) {
          if (err) {
            console.log("not document updated");
          } else {
            console.log("1 document updated");
          }
        });
        res.status(200).json({
          status: false,
          message: "Update",
          docs: { err: "updated successfully" }
        });
      } else {
        res.status(200).json({
          status: "Not update in Database",
          message: "error",
          docs: { err: "not updated " }
        });
      }
    });
  },
  /*
   *
   *uploadPicture function use to upload picture.
   */

  uploadPiture: function(req, res) {
    var storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, "uploads/");
      },
      filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + file.originalname);
      }
    });

    var upload = multer({
      storage: storage,
      fileFilter: function(req, file, callback) {
        console.log(file.mimetype);
        if (
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/jpg"
        ) {
          callback(null, true);
        } else {
          return callback(new Error("*Only png/jpg images are allowed"));
        }
      },
      limits: {
        fileSize: 1024 * 1024
      }
    }).single("pic");

    upload(req, res, function(err) {
      // this.set = req.file.path;
      if (err) {
        res.status(200).json({
          status: false,
          err: err.message,
          docs: ""
        });
      } else {
        this.set = req.file.path;
        res.status(200).json({
          status: true,
          message: "Picture is Successfully uploaded",
          docs: ""
        });
      }
    });
  },

  updateinfo: function(req, res) {
    console.log("updateinfoooooooooooo");
    //var candidate = new candidateModel();
    var token = req.body.token || req.headers["token"];
    var decoded = jwt.decode(token, config.secretKey);
    var myquery = { _id: decoded._id };
    var newvalues = {
      $set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthdate: req.body.birthdate.slice(0, 10),
        gender: req.body.gender,
        // hobies: filter_array(req.body.hobies),
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
  },

  usercheck: function(req, res) {
    candidateModel.findOne(
      {
        $and: [{ username: req.body.username }]
      },
      function(err, user) {
        if (err || !user) {
          res.status(200).json({
            status: true
          });
        } else {
          res.status(200).json({
            status: false
          });
        }
      }
    );
  }
};

/*
 *
 *this function is use to remove spaces or special characters from array string.
 */

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

module.exports = candidates;
