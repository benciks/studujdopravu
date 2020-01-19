const db = require('../../config/drivers/mysql');

function createUser() {
  db.query("CREATE TABLE IF NOT EXISTS users(user_id INT NOT NULL AUTO_INCREMENT,email VARCHAR(100) NOT NULL,username VARCHAR(100) NOT NULL,password VARCHAR(100) NOT NULL,PRIMARY KEY(user_id))");
}

exports.addUser = (email, name, hashedPassword) => {
  createUser();
  db.query("INSERT INTO users(email,username,password) VALUES (?,?,?)", [email,name,hashedPassword]);
}
