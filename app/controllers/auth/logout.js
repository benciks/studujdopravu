exports.get = (req, res) => {
  req.logout();
  res.redirect('/');
}
