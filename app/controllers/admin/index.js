const db = require('../../models/editorModel');

exports.get = async (req, res) => {
  if (req.user) {
    const result = await db.getArticle(3);
    const content = result[0].content;

    res.render('admin/landing', {
      title: 'Admin',
      content: content,
    });
  } else {
    res.redirect('/login')
  }
}
