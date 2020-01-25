exports.landing = (req, res) => {
  res.render('home', {
    title: 'StudujDopravu',
  })
}

exports.getAdmin = (req, res) => {
  if (req.user) {
    res.render('home', {
      title: 'Admin',
      loggedin: true,
    });
  } else {
    res.redirect('/login')
  }
}
