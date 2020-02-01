exports.get = async (req, res) => {
  if (req.user) {
    res.render('admin/landing', {
      title: 'Admin',
    });
  } else {
    res.redirect('/login')
  }
}
