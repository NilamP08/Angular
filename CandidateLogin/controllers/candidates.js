var candidateModel = require('../models/candidate');

var candidates = {
	show: function (req, res) {
		res.status(200).json({ status: 'success', message: 'Success' });
    },
    getAll: function (req, res) {
		console.log('inside the GetAll');
		candidateModel.find(function (err, docs) {
			if (err) {
				res.status(500).json({ status: 'error', message: 'Datebase Error:' + err, docs: '' });
			}
			else {
				res.status(200).json({ status: 'success', message: 'Success', docs: docs });
			}
		});
    },
    getOne: function (req, res) {

		candidateModel.findById(req.params.id, function (err, doc) {
			if (err) {
				res.status(500).json({ status: 'error', message: 'Datebase Error:' + err, doc: '' });
			}
			else {
				res.status(200).json({ status: 'success', message: 'Success', docs: doc });
			}
		});
    },
    create: function (req, res) {
		var candidate = new candidateModel();
        candidate.firstname = req.body.firstname;
        candidate.lastname = req.body.lastname;
        candidate.birthdate = req.body.birthdate;
        candidate.gender = req.body.gender;
        candidate.hobby = req.body.hobby;
        candidate.phoneNo = req.body.phoneNo;
        candidate.address = req.body.address;
        candidate.city = req.body.city;
        candidate.state = req.body.state;
        candidate.zipcode = req.body.zipcode;
        candidate.email = req.body.email;
        candidate.password = req.body.password;
				candidate.confirmPassword=req.body.confirmPassword;
				candidate.username=req.body.username;


		candidate.save(function (err) {
			if (err) {
				res.status(500).json({ status: 'error', message: 'Datebase Error:' + err, docs: '' });
			}
			else {
				res.status(200).json({ status: 'success', message: 'candidate:Added to Mongo successfully', doc: '' });
			}

		});
    }
};
module.exports = candidates;