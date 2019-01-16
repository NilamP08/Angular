var express = require('express');
var router = express.Router();

var candidates = require('./controllers/candidates.js');
var states= require('./controllers/states.js');

console.log(router);

router.get('/myapi/candidates/',candidates.getAll);
router.post('/myapi/candidate/',candidates.create);
router.get('/myapi/candidate/:id',candidates.getOne);


router.get('/myapi/states/',states.getAll);
router.post('/myapi/state/',states.create);




module.exports = router;


