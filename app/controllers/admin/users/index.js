const create = require('./create');
const db = require('../../../models/authModel');

exports.getCreate = create.get;
exports.postCreate = create.post;
exports.validate = create.validate;

exports.get = async (req, res) => {
  if (req.user) {
    const result = await db.getUserInfo();
    res.render('admin/users/index', {users: result});
  } else {
    res.redirect('/login');
  }
}
