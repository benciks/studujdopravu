const passport = require('passport');

exports.get = (req, res) => {
  if (req.user) {
    res.redirect('/admin');
  } else {
    res.render('auth/login');
  }
}

exports.post = () => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  });
}