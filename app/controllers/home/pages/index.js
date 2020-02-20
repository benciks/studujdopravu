const db = require('../../../models/pageModel');

exports.get = async (req, res) => {
  const result = await db.getPageByUrl(req.params.pageUrl);
  const pages = await db.getPages();

  if (result[0] == undefined) {
    res.sendStatus(404);
    return
  } else {
    res.render('page', {
      title: `Študuj Dopravu | ${result[0].name}`,
      header: result[0].name,
      content: result[0].content,
      pages: pages
    });
  }
}
