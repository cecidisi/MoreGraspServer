var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: '../uploads/', limits: { fieldSize: 999999, fileSize: 999999 } });




router.get('/', function(req, res, next){
    res.send('upload something');
})


/* POST upload. */

router.post('/', upload.array('videos', 30), function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log('entra');
    if (req.files) {
        console.log(req.files);
        res.send(req.files);
    }
    else {
        res.send('No files');

    }
});



router.post('/', upload.single('video'), function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log('entra');
    if (req.file) {
        console.log(req.file);
        res.send(req.files);
    }
    else {
        res.send('No files');

    }
});


module.exports = router;
