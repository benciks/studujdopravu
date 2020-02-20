const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');

module.exports = [
  logger('dev'),
  express.json({ limit: '50mb' }),
  express.urlencoded({
    extended: false,
    limit: '50mb'
  }),
  cookieParser(),
  flash(),
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }),
  passport.initialize(),
  passport.session(),
]
