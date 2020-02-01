exports.get = async (req, res) => {
  if (req.user) {
    res.render('admin/landing', {
      title: 'Admin',
      user: req.user.username
    });
  } else {
    res.redirect('/login')
  }
}
