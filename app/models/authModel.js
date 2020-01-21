const mysql = require('../../config/drivers/mysql');
const config = require('../../config/db');
const db = mysql(config.development);

async function createUser() {
  db.query("CREATE TABLE IF NOT EXISTS users(user_id INT NOT NULL AUTO_INCREMENT,email VARCHAR(100) NOT NULL,username VARCHAR(100) NOT NULL,password VARCHAR(100) NOT NULL,PRIMARY KEY(user_id))");
}

exports.addUser = async (email, name, hashedPassword) => {
  try {
    await createUser();
    await db.query("INSERT INTO users(email,username,password) VALUES (?,?,?)", [email,name,hashedPassword]);
  } catch(err) {
    throw err;
  }
}

exports.getUser = async (email) => {
  try {
    const results = await db.query("SELECT email FROM users WHERE email=?", [email]);
    return results;
  } catch(err) {
    throw err;
  }
}
