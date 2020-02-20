const bcrypt = require('bcrypt');
const db = require('../../../models/userModel');
const { check, validationResult } = require('express-validator');

exports.get = async (req, res) => {
  if (req.user) {
    const result = await db.getUserById(req.params.userId);
    const { user_id, username, email} = result[0];
    res.render('admin/users/create', {
      title: 'Admin | Upraviť používateľa',
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
    const id = req.params.userId;

    if (!validation.isEmpty()) {
      res.render('admin/users/create', {
        title: 'Admin | Upraviť používateľa',
        id,
        name,
        email,
        errors: validation.errors
      });
      return;
    } else {
      try {
        if (password !== password2) {
          validation.errors.push({ msg: 'Zadané heslá sa nezhodujú.'});
          res.render('admin/users/create', {
            title: 'Admin | Upraviť používateľa',
            id,
            name,
            email,
            errors: validation.errors
          });
          return;
        }
        if (!password.length) {
          await db.updateUserInfoById(name, email, req.params.userId);
          res.redirect('/admin/users');
          return;
        } else {
          if (password.length < 6) {
            validation.errors.push({ msg: 'Heslo musí byť dlhé aspoň 6 znakov'});
            res.render('admin/users/create', {
              title: 'Admin | Upraviť používateľa',
              id,
              name,
              email,
              errors: validation.errors
            });
            return;
          } else {
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
    check('name').not().isEmpty().withMessage('Zadajte meno'),
    check('email').not().isEmpty().isEmail().withMessage('Zadajte správnu formu emailu')
  ];
  return checks;
}
