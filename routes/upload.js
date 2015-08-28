var express = require('express');
var router = express.Router();

/* GET upload. */


router.get('/', function(req, res, next){
    res.send('upload something');
})

module.exports = router;
