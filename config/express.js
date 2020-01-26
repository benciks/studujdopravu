const createError = require('http-errors');
const express = require('express');
const path = require('path');
const configPassport = require('./passport');

module.exports = (app, passport) => {
  configPassport(passport);
  // View engine
  app.set('views', path.join(__dirname, '/../app/views'));
  app.set('view engine', 'pug');

  // Static directory for assets
  app.use(express.static(path.join(__dirname, '/../public')));

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
}
