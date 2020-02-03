const bcrypt = require('bcrypt');
const db = require('../../../models/userModel');
const { check, validationResult } = require('express-validator');

exports.get = async (req, res) => {
  if (req.user) {
    const result = await db.getUserById(req.params.userId);
    const { user_id, username, email} = result[0];
    res.render('admin/users/edit', {
      id: user_id,
      name: username,
      email: email,
    });
  } else {
    res.redirect('/login');
  }
}

exports.post = async (req, res) => {
  if (req.user) {
    const validation = validationResult(req);
    const {email, name, password, password2} = req.body;

    if (!validation.isEmpty()) {
      res.render('admin/users/:userId/edit', {name, email, errors: validation.errors});
    } else {
      try {
        if (password !== password2) {
          validation.errors.push({ msg: 'Passwords do not match'});
          res.render('admin/users/:userId/edit', {name, email, errors: validation.errors});
        }
        if (!password.length) {
          await db.updateUserInfoById(name, email, req.params.userId);
          res.redirect('/admin/users');
        } else {
          if (password.length < 6) {
            validation.errors.push({ msg: 'Password should be at least 6 characters long'});
            res.render('admin/users/:userId/edit', {name, email, errors: validation.errors});
          } else {
            console.log('Updating password as well')
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.updateUserInfoById(name, email, req.params.userId);
            await db.updatePasswordById(hashedPassword, req.params.userId);
            res.redirect('/admin/users');
          }
        }
      } catch (err) {
        throw err;
      }
    }
  } else {
    res.redirect('/login');
  }
}

exports.validate = () => {
  let checks = [
    check('name').not().isEmpty().withMessage('Enter name'),
    check('email').not().isEmpty().isEmail().withMessage('Enter email'),
    check('email').isEmail().withMessage('Please enter proper email form')
  ];
  return checks;
}
