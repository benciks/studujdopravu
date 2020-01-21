require('dotenv').config();
const express = require('express');
const middleware = require('./middleware/express');
const configure = require('./config/express');
const routes = require('./config/routes');
const app = express();

app.use(middleware);
app.use('/', routes);
configure(app);

module.exports = app;
