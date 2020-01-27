const mysql = require('../../config/drivers/mysql');
const config = require('../../config/db');
const db = mysql(config.development);

async function createSchool() {
  db.query("CREATE TABLE IF NOT EXISTS schools( \
    id INT NOT NULL AUTO_INCREMENT, \
    name VARCHAR(100) NOT NULL, \
    link VARCHAR(100) NOT NULL, \
    city VARCHAR(100) NOT NULL, \
    street VARCHAR(100) NOT NULL, \
    postcode VARCHAR(100) NOT NULL, \
    description TEXT NOT NULL, \
    PRIMARY KEY(id))");
}

exports.addSchool = async (name, link, street, city, postcode, description) => {
  try {
    await createSchool();
    await db.query("INSERT INTO schools(name, link, city, street, postcode, description) VALUES (?, ?, ?, ?, ?, ?)", [name, link, street, city, postcode, description]);
  } catch (err) {
    throw err;
  }
}

exports.getSchoolByLink = async (link) => {
  try {
    await createSchool();
    await db.query("SELECT * FROM schools WHERE link=?", [link]);
  } catch (err) {
    throw err;
  }
}
