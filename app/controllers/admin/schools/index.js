const create = require('./create');
const remove = require('./remove');
const edit = require('./edit');
const db = require('../../../models/schoolModel');

exports.get = async (req, res) => {
  if (req.user) {
    const result = await db.getSchool();
    res.render('admin/schools/index', {
      title: 'Admin | Školy',
      schools: result
    });
  } else {
    res.redirect('/login');
  }
}

exports.getCreate = create.get;
exports.postCreate = create.post;
exports.validateCreate = create.validate;
exports.postRemove = remove.post;
exports.getEdit = edit.get;
exports.postEdit = edit.post;
