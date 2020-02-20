const db = require('../../../models/schoolModel');
const { check, validationResult } = require('express-validator');

exports.get = (req, res) => {
  if (req.user) {
    res.render('admin/schools/create', {
      title: 'Admin | Pridať školu'
    });
  } else {
    res.redirect('/login');
  }
}

exports.post = (req,res) => {
  if (req.user) {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
      return res.render('admin/schools/create', {
        title: 'Admin | Pridať školu',
        errors: validation.errors
      });
    }
    const { name, link, street, city, postcode } = req.body;
    db.addSchool(name, link, street, city, postcode);
    res.redirect('/admin/schools');
  } else {
    res.redirect('/login');
  }
}

exports.validate = () => {
  let checks = [
    check('name').not().isEmpty().withMessage('Zadajte meno školy'),
    check('street').not().isEmpty().withMessage('Zadajte adresu'),
    check('city').not().isEmpty().withMessage('Zadajte mesto'),
    check('postcode').not().isEmpty().isPostalCode("CZ").withMessage('Zadajte správny formát PSČ'),
    check('link').isURL().withMessage('Zadajte url adresu v správnom tvare'),
  ];
  return checks;
}
