const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const passport = require('passport');

module.exports = [
  logger('dev'),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
  passport.initialize()
]
