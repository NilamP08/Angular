var express = require('express');
var router = express.Router();

var states= require('./controllers/states.js');

console.log(router);

router.get('/myapi/states/',states.getAll);
router.post('/myapi/state/',states.create);
//router.get('/myapi/candidate/:id',candidates.getOne);

module.exports = router;


