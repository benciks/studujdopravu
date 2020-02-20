const db = require('../../../models/schoolModel');
const { validationResult } = require('express-validator');
const createError = require('http-errors');

exports.get = async (req,res,next) => {
  if (req.user) {
    const result = await db.getSchoolById(req.params.schoolId);

    if(!result.length) {
      next(createError(404));
      return
    }

    const { id, name, link, city, street, postcode } = result[0]
    res.render('admin/schools/create', {
      title: 'Admin | Upraviť školu',
      id: id,
      name: name,
      link: link,
      city: city,
      street: street,
      postcode: postcode,
    });
  } else {
    res.redirect('/login');
  }
}

exports.post = async (req,res) => {
  if (req.user) {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
      const result = await db.getSchoolById(req.params.schoolId);
      return res.render('admin/schools/create', {
        title: 'Admin | Upraviť školu',
        errors: validation.errors,
        id: result[0].id,
        name: result[0].name,
        link: result[0].link,
        city: result[0].city,
        street: result[0].street,
        postcode: result[0].postcode,
      });
    }
    const { name, link, street, city, postcode } = req.body;
    db.updateSchoolById(name, link, street, city, postcode, req.params.schoolId);
    res.redirect('/admin/schools');
  } else {
    res.redirect('/login');
  }
}
