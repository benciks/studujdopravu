const db = require('../../models/pageModel');

exports.get = async (req, res) => {
  const pages = await db.getPages();

  res.render('home', {
    title: 'Študuj Dopravu',
    pages: pages
  });
}
