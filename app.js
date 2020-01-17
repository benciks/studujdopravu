// Import modules
const express = require('express');

// Import config
const config = require('./config/express');
const routes = require('./config/routes');

// Create express instance
const app = express();

// Use routes
app.use('/', routes);

// Use express config
config(app);

module.exports = app;
