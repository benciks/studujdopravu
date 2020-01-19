const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');

module.exports = [
  logger('dev'),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
]
