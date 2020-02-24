const mysql = require('../../config/drivers/mysql');
const config = require('../../config/db');
const db = mysql(config.development);

async function createPage() {
  db.query("CREATE TABLE IF NOT EXISTS pages( \
    id INT NOT NULL AUTO_INCREMENT, \
    name VARCHAR(100) NOT NULL, \
    url VARCHAR(100) NOT NULL, \
    content TEXT NOT NULL, \
    PRIMARY KEY(id))");
}

exports.addPage = async (name, url, content) => {
  try {
    await createPage();
    await db.query("INSERT INTO pages(name, url, content) VALUES (?, ?, ?)", [name, url, content]);
  } catch (err) {
    throw err;
  }
}

exports.getPages = async () => {
  try {
    await createPage();
    return await db.query('SELECT * FROM pages');
  } catch (err) {
    throw err;
  }
}

exports.getPageById = async (id) => {
  try {
    return await db.query("SELECT * FROM pages WHERE id=?", [id]);
  } catch (err) {
    throw err;
  }
}

exports.getPageByUrl = async (url) => {
  try {
    return await db.query("SELECT * FROM pages WHERE url=?", [url]);
  } catch (err) {
    throw err;
  }
}

exports.removePageById = async (id) => {
  try {
    await db.query("DELETE FROM pages WHERE id=?", [id]);
  } catch (err) {
    throw err;
  }
}

exports.updatePageById = async (name, url, content, id) => {
  try {
    await db.query("UPDATE pages \
    SET \
      name=?, \
      url=?, \
      content=? \
    WHERE id=?", [name, url, content, id]);
  } catch (err) {
    throw err;
  }
}
