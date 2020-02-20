const db = require('../../models/adminModel');

exports.get = async (req, res) => {
  if (req.user) {
    const schoolCount = await db.countSchools();
    const pageCount = await db.countPages();
    const userCount = await db.countUsers();

    res.render('admin/landing', {
      title: 'Admin | Domov',
      user: req.user.username,
      schools: schoolCount[0].TOTAL,
      pages: pageCount[0].TOTAL,
      users: userCount[0].TOTAL
    });
  } else {
    res.redirect('/login')
  }
}
