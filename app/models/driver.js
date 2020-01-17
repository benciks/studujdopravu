const mysql = require('mysql2');
const config = require('../../config/db');

const connection = mysql.createConnection(config.development);

connection.connect((err) => {
    if(err) {
      console.log('Error connecting to db', err);
      return;
    }
    console.log('Connection established')
});

module.exports = connection;
