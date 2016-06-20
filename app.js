var express = require('express');
var promise = require('bluebird');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// body-parser for url encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var options =  {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var db = pgp('postgres://postgres:ADRIAN88@localhost:5432/todoapp');

app.set('view engine','hbs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(__dirname + '/public'));

app.get('/todo',function(req,res,next){
  db.any('SELECT * FROM todo')
  .then(function(data){
    res.render('index',{ data: data });
  })
  .catch(function(err){
    return next(err);
  });
});

app.get('/todo/:id', function(req, res, next) {
  var ID = parseInt(req.params.id);
  //db.one expects a single row
  db.one('SELECT * FROM todo WHERE id = $1', ID)
  .then(function (data) {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ONE todo item'
    });
  })
  .catch(function (err) {
    return next(err);
  });
});


app.post('/todo',function(req,res,next){
  db.none("INSERT INTO todo (description, status) values ('" + req.body.description + "'," + true + ");")
  .then(function () {
    res.status(200)
    res.redirect('/todo');
  })
  .catch(function (err) {
    return next(err);
  });
});

// app.put('/users', function(req,res,next) {
//   db.
// });

app.delete("/todo/:id", function(req, res,next) {
  var ID = parseInt(req.params.id);

  db.none("DELETE FROM todo WHERE id = $1", ID)
  .then(function (data) {
    res.status(200)
    .json({
      status: 'success',
    });
  })
  .catch(function (err) {
    return next(err);
  });
});

app.listen(3000);