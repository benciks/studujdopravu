const express = require('express');
const configure = require('./config/express');
const routes = require('./config/routes');
const app = express();

app.use('/', routes);
configure(app);

module.exports = app;
