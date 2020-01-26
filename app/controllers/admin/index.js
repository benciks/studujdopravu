exports.get = (req, res) => {
  if (req.user) {
    res.render('home', {
      title: 'Admin',
      loggedin: true,
    });
  } else {
    res.redirect('/login')
  }
}
