const mysql = require('../../config/drivers/mysql');
const config = require('../../config/db');
const db = mysql(config.development);

async function createUser() {
  db.query("CREATE TABLE IF NOT EXISTS users( \
    user_id INT NOT NULL AUTO_INCREMENT, \
    email VARCHAR(100) NOT NULL, \
    username VARCHAR(100) NOT NULL, \
    password VARCHAR(100) NOT NULL, \
    PRIMARY KEY(user_id))");
}

exports.addUser = async (email, name, hashedPassword) => {
  try {
    await createUser();
    await db.query("INSERT INTO users(email, username, password) VALUES (?,?,?)", [email, name, hashedPassword]);
  } catch (err) {
    throw err;
  }
}

exports.getUserByEmail = async (email) => {
  try {
    await createUser();
    const result = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return result;
  } catch (err) {
    throw err;
  }
}

exports.getUserById = async (id) => {
  try {
    await createUser();
    const result = await db.query("SELECT * FROM users WHERE user_id = ?", [id]);
    return result;
  } catch (err) {
    throw err;
  }
}

exports.getUser = async () => {
  try {
    await createUser();
    const result = await db.query("SELECT * FROM users");
    return result;
  } catch (err) {
    throw err;
  }
}

exports.removeUserById = async (id) => {
  try {
    await db.query("DELETE FROM users WHERE user_id=?", [id]);
  } catch (err) {
    throw err;
  }
}

exports.updateUserInfoById = async (username, email, id) => {
  try {
    await db.query("UPDATE users \
    SET \
      username=?, \
      email=? \
    WHERE user_id=?", [username, email, id]);
  } catch (err) {
    throw err;
  }
}

exports.updatePasswordById = async (password, id) => {
  try {
    await db.query("UPDATE users \
    SET \
      password=? \
    WHERE user_id=?", [password, id]);
  } catch (err) {
    throw err;
  }
}
