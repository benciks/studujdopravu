const bcrypt = require('bcrypt');
const database = require('../../../models/authModel');
const { check, validationResult } = require('express-validator');

exports.get = (req, res) => {
  if (req.user) {
    res.render('admin/users/create', {
      title: "Register",
    });
  } else {
    res.redirect('/login');
  }
}

exports.post = async (req, res) => {
  if (req.body) {
    const validation = validationResult(req);
    const {email, name, password, password2} = req.body;

    if (!validation.isEmpty()) {
      res.render('admin/users/create', {name, email, errors: validation.errors});
    }
    if (password !== password2) {
      validation.errors.push({ msg: 'Passwords do not match'});
      res.render('admin/users/create', {name, email, errors: validation.errors});
    } else {
      try {
        let result = await database.getUserByEmail(email);

        if (result.length > 0) {
          validation.errors.push({ msg: 'Email is already being used'});
          res.render('admin/users/create', {name, email, errors: validation.errors});
        } else {
          const hashedPassword = await bcrypt.hash(password, 10);
          await database.addUser(email, name, hashedPassword);
          res.redirect('/admin/users');
        }
      } catch (err) {
        throw err;
      }
    }
  }
}

exports.validate = () => {
  let checks = [
    check('name').not().isEmpty().withMessage('Enter name'),
    check('email').not().isEmpty().isEmail().withMessage('Enter email'),
    check('password').not().isEmpty().isLength(6).withMessage('Enter password'),
    check('password2').not().isEmpty().withMessage('Repeat password'),
  ];
  return checks;
}

