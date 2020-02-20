const create = require('./create');
const edit = require('./edit');
const remove = require('./remove');
const db = require('../../../models/pageModel');

exports.get = async (req,res) => {
  if (req.user) {
    const result = await db.getPages();
    res.render('admin/pages/index', {
      title: 'Admin | Stránky',
      pages: result
    });
  } else {
    res.redirect('/login');
  }
}

exports.getCreate = create.get;
exports.postCreate = create.post;
exports.validate = create.validate;
exports.postRemove = remove.post;
exports.getEdit = edit.get;
exports.postEdit = edit.post;
