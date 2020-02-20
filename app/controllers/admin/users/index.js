const create = require('./create');
const remove = require('./remove');
const edit = require('./edit');
const db = require('../../../models/userModel');

exports.get = async (req, res) => {
  if (req.user) {
    const result = await db.getUser();
    res.render('admin/users/index', {
      title: 'Admin | Používatelia',
      users: result,
      currentUser: req.user.user_id
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
exports.validateEdit = edit.validate;
