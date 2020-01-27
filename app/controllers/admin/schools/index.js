const create = require('./create.js');

exports.get = (req, res) => {
  if (req.user) {
    res.render('admin/schools/index');
  } else {
    res.redirect('/login');
  }
}

exports.getCreate = create.get;
exports.postCreate = create.post;
exports.validateCreate = create.validate;
