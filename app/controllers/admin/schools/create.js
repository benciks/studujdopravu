const db = require('../../../models/schoolModel');
const { check, validationResult } = require('express-validator');

exports.get = (req, res) => {
  if (req.user) {
    res.render('admin/schools/create');
  } else {
    res.redirect('/login');
  }
}

exports.post = (req,res) => {
  if (req.user) {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
      return res.render('admin/schools/create', {errors: validation.errors});
    }
    const { name, link, street, city, postcode, description } = req.body;
    db.addSchool(name, link, street, city, postcode, description);
    res.redirect('/admin/schools');
  } else {
    res.redirect('/login');
  }
}

exports.validate = () => {
  let checks = [
    check('name').not().isEmpty().withMessage('Enter name'),
    check('street').not().isEmpty().withMessage('Enter street'),
    check('city').not().isEmpty().withMessage('Enter city'),
    check('postcode').not().isEmpty().withMessage('Enter postcode'),
    check('link').isURL().withMessage('Enter valid url'),
    check('postcode').isPostalCode("CZ").withMessage('Enter valid postal code')
  ];
  return checks;
}
