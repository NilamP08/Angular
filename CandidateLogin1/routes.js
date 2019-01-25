var express = require("express");
var router = express.Router();

var candidates = require("./controllers/candidates");
var states = require("./controllers/states");
var profilePicture = require("./controllers/profilepic");

console.log(router);

router.get("/myapi/candidates/", candidates.getAll);
router.post("/myapi/candidate/", candidates.create);
router.post("/myapi/login/", candidates.logincheck);
router.post("/myapi/sendmail", candidates.sendmail);
router.post("/myapi/resetpassword", candidates.resetpassword);
// router.get('/myapi/candidate/:id',candidates.getOne);

router.get("/myapi/states/", states.getAll);
router.post("/myapi/state/", states.create);
router.post("/myapi/ProfilePicture/", candidates.uploadPiture);

module.exports = router;
