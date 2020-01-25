const express = require('express');
const passport = require('passport');
const middleware = require('./middleware/express');
const configure = require('./config/express');
const routes = require('./config/routes');
const app = express();
require('dotenv').config();

app.use(middleware);
routes(app, passport);
configure(app, passport);

module.exports = app;
