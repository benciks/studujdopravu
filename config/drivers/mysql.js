const mysql = require('mysql2');
const config = require('../db');

const connection = mysql.createConnection(config.development);

module.exports = connection;
