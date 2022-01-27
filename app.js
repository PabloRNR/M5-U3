var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
/*AGREGADO*/ require('dotenv').config();
/*AGREGADO*/ var pool = require('./models/bd');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


//++++ Agregado


// select
// pool.query('select * from catalogo').then(function (resultados){
//   console.log(resultados)
// });

//insert
//   var sql = "INSERT INTO catalogo (title,director,year,rating) VALUES ?";
//   var values = [
//     ['The Matrix', 'Lana & Lilly Wachowski',1999,8.7],
//     ['The Shawshank Redemption', 'Frank Darabont',1994,9.3],
//     ['Meet Joe Black', 'Martin Brest',1998,7.2],
//     ['Speed', 'Jan de Bont',1994,7.2],
//     ['The Silence of the Lambs', 'Jonathan Demme',1991,8.6],
//     ['Avatar', 'James Cameron',2009,7.8],
//     ['The Lord of the Rings: The Return of the King', 'Peter Jackson',2003,8.9],
//     ['Milagro en la celda 7', 'Frank Darabont',2019,8.2]  //Mehmet Ada Öztekin
//   ];

// pool.query(sql, [values]).then(function (resultados) {
//     console.log(resultados)
//   });

//update
// var id = 40
// var obj ={
//   director:"Mehmet Ada Öztekin"
// }  

// pool.query('update catalogo set ? where id=?',[obj,id]).then(function (resultados){
//   console.log(resultados)
// });

//delete
var id = 40
pool.query('delete from catalogo where id=?',[id]).then(function (resultados){
  console.log(resultados)
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
