const passport = require('passport');
const db = require('../../models/userModel');
const bcrypt = require('bcrypt');

exports.get = async (req, res) => {
  if (req.user) {
    res.redirect('/admin');
  } else {
    // Adds user if doesnt exist
    const result = await db.getUser();
    if (!result.length) {
      const password = process.env.ADMIN_PASSWORD;
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.addUser(process.env.ADMIN_EMAIL, process.env.ADMIN_NAME, hashedPassword);
    }
    res.render('auth/login');
  }
}

