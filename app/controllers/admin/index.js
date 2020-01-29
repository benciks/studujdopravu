exports.get = (req, res) => {
  if (req.user) {
    res.render('admin/landing', {
      title: 'Admin',
      loggedin: true,
    });
  } else {
    res.redirect('/login')
  }
}
