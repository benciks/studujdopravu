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
  const {email,name,password,password2} = req.body;
  let errors = [];

  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters long'});
  }
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match'});
  }
  if(errors.length > 0) {
    res.render('auth/register', {
      name,
      email,
      errors
    });
  }

  const hashedPassword = await argon2.hash(password);
  database.addUser(req.body.email, req.body.name, hashedPassword);
}
