const bcrypt = require('bcrypt');
const db = require('../../../models/userModel');
const { check, validationResult } = require('express-validator');

exports.get = (req, res) => {
  if (req.user) {
    res.render('admin/users/create', {
      title: "Admin | Create user",
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
        let result = await db.getUserByEmail(email);

        if (result.length > 0) {
          validation.errors.push({ msg: 'Email is already being used'});
          res.render('admin/users/create', {name, email, errors: validation.errors});
        } else {
          const hashedPassword = await bcrypt.hash(password, 10);
          await db.addUser(email, name, hashedPassword);
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
    check('email').isEmail().withMessage('Please enter proper email form'),
    check('password').not().isEmpty().isLength(6).withMessage('Password should be at least 6 characters long.'),
    check('password2').not().isEmpty().withMessage('Repeat password'),
  ];
  return checks;
}

