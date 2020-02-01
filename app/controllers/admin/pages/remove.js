const db = require('../../../models/pageModel');

exports.post = async (req, res) => {
  if(req.user) {
    await db.removePageById(req.params.pageId);
    res.redirect('/admin/pages');
  } else {
    res.redirect('/login');
  }
}
