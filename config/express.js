const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path')

module.exports = (app) => {
    // Express configuration
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    // View engine
    app.set('views', path.join(__dirname, '/../views'));
    app.set('view engine', 'pug');

    app.use(express.static(path.join(__dirname, '/../public')));
}
