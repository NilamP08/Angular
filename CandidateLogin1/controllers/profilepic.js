var express = require("express");
var multer = require("multer");

var fileUpload = {
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
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg") {
          callback(null, true);
        } else {
          return callback(new Error(" * Only png / jpg images are allowed"));
        }
      },
      limits: {
        fileSize: 1024 * 1024
      }
    }).single("pic");

    upload(req, res, function(err) {
      if (err) {
        res.status(200).json({
          status: false,
          err: err.message,
          docs: ""
        });
      } else {
        res.status(200).json({
          status: true,
          message: "Picture is Successfully uploaded",
          docs: ""
        });
      }
    });
  }
};

module.exports = fileUpload;
