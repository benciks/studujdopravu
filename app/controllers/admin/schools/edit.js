const db = require('../../../models/schoolModel');
const { validationResult } = require('express-validator');

exports.get = async (req,res) => {
  if (req.user) {
    const result = await db.getSchoolById(req.params.schoolId);
    const { id, name, link, city, street, postcode, description} = result[0]
    res.render('admin/schools/edit', {
      id: id,
      name: name,
      link: link,
      city: city,
      street: street,
      postcode: postcode,
      description: description
    });
  } else {
    res.redirect('/login');
  }
}

exports.post = async (req,res) => {
  if (req.user) {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
      return res.render('admin/schools/create', {errors: validation.errors});
    }
    const { name, link, street, city, postcode, description } = req.body;
    db.updateSchoolById(name, link, street, city, postcode, description, req.params.schoolId);
    res.redirect('/admin/schools');
  } else {
    res.redirect('/login');
  }
}
