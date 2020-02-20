const db = require('../../../models/schoolModel');
const pageDb = require('../../../models/pageModel');

exports.get = async (req, res) => {
  const result = await db.getSchool();
  const pages = await pageDb.getPages();

  res.render('schools', {
    title: 'Študuj Dopravu | Školy',
    schools: result,
    pages: pages
  })
}
