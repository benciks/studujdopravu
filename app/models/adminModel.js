const mysql = require('../../config/drivers/mysql');
const config = require('../../config/db');
const db = mysql(config.development);

exports.countSchools = async () => {
  try {
    return await db.query("SELECT COUNT(*) AS TOTAL FROM schools");
  } catch (err) {
    return [{TOTAL: 0}];
  }
}

exports.countPages = async () => {
  try {
    return await db.query("SELECT COUNT(*) AS TOTAL FROM pages");
  } catch (err) {
    return [{TOTAL: 0}];
  }
}

exports.countUsers = async () => {
  try {
    return await db.query("SELECT COUNT(*) AS TOTAL FROM users");
  } catch (err) {
    throw err;
  }
}
