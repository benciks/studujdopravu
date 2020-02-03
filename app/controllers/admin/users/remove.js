const db = require('../../../models/userModel');

exports.post = async (req,res) => {
  if (req.user) {
    await db.removeUserById(req.params.userId);
    res.redirect('/admin/users');
  } else {
    res.redirect('/login');
  }
}
