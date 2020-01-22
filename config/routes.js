const home = require('../app/controllers/homeController');
const auth = require('../app/controllers/authController');

module.exports = (app,passport) => {
  app.get('/', home.landing);
  app.get('/login', auth.getLogin);
  app.get('/register', auth.getRegister);
  app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', }), auth.postLogin);
  app.post('/register', auth.postRegister);
}


