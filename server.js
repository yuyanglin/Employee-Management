var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var multer  = require('multer');
// var upload = multer({ dest: './uploads/' });

// MongoDB Setting
// var mongoose   = require('mongoose');
// mongoose.connect('mongodb://root:password@olympia.modulusmongo.net:27017/umaJej2o');
// var Employees = require('./routes/mongo/models/employees');

var routes = require('./routes/index');

var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use('/wolf', function(req, res) {
	res.send("Hello Wolf!");
});

//*************************************//
//********* Below is My Code **********//
//*************************************//

// app.post('/profile', upload.single('avatar'), function (req, res) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
//   console.log('I am here');
//   res.send("Upload is done!");
// })


app.get('/test/:guy', function(req, res) {
  Employees.find({"manager" : req.params.guy})
    .sort({id : 1})
    .exec(function(err, employees) {
            if (err) {
                res.send(err);
            }
            res.json(employees);
    });
});


//*************************************//
//********* Above is My Code **********//
//*************************************//


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

app.listen(8888, function() {
	console.log("Server is now running..........")
});

module.exports = app;
