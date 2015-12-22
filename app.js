var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fsSync = require('fs-sync');

//  Create uploads folder
fsSync.mkdir('uploads', function(err){
    if(err) console.log('Cannot create folder --> ', err);
    else console.log('Folder created');
});


var routes = require('./routes/index');
var users = require('./routes/users');
var uploads = require('./routes/upload');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/', routes);
app.use('/users', users);
//app.use('/upload', uploads);


var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        console.log(file);
//        cb(null, file.fieldname + '-' + Date.now())
        cb(null, file.originalname);
    }
})

//var upload = multer({ dest: './uploads/', limits: { fieldSize: 52428800, fileSize: 52428800 } });
var upload = multer({ storage: storage, limits: { fieldSize: 52428800, fileSize: 52428800, files: 3 } });

app.post('/upload', upload.single('video'), function(req, res, next){
    console.log('entra single video');
    if (req.file) {
        console.log(req.file);
        res.status(200).send('File uploaded');
    }
    else {
        res.status(200).send('No files');

    }
});

app.post('/upload', upload.array('videos', 3), function(req, res, next){
    console.log('entra multiple videos');
    if (req.files) {
        console.log(req.files);
        res.status(200).send('Multiple Files uploaded');
    }
    else {
        res.status(200).send('No files');

    }
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(req.file);
    console.log(req.files);
    console.log(err);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



//livereload(app, {watchDir: process.cwd() });

module.exports = app;
