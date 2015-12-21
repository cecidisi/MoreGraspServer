var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: '../uploads/' });

/* GET upload. */


router.get('/', function(req, res, next){
    res.send('upload something');
})


router.post('/', upload.array(), function(req, res, next){
    if (req.files) {
        res.send(req.files);
    }
    else {
        res.send('No files');

    }
})

module.exports = router;
