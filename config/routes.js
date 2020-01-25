const home = require('../app/controllers/homeController');
const auth = require('../app/controllers/authController');

module.exports = (app,passport) => {
  app.get('/', home.landing);

  app.get('/login', auth.getLogin);
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  }));
  app.get('/register', auth.getRegister);
  app.post('/register', auth.postRegister);
  app.get('/logout', auth.getLogout);

  app.get('/admin', home.getAdmin);
}


