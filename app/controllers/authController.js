const argon2 = require('argon2');
const database = require('../models/authModel');

exports.getLogin = (req,res) => {
  res.render('auth/login', {
    title: "Login",
  })
}

exports.getRegister = (req,res) => {
  res.render('auth/register', {
    title: "Register",
  })
}

exports.postLogin = (req,res) => {
  res.redirect('/');
}

exports.postRegister = async (req,res) => {
  try {
    const hashedPassword = await argon2.hash(req.body.password, 10);
    database.addUser(req.body.email, req.body.name, hashedPassword);
  } catch {
    res.redirect('/register')
  }
  res.redirect('/login');
}
