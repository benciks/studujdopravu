const home = require('../app/controllers/homeController');
const auth = require('../app/controllers/authController');
const admin = require('../app/controllers/adminController');

module.exports = (app,passport) => {
  app.get('/', home.landing);

  app.get('/login', auth.getLogin);
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: true,
  }));
  app.get('/register', auth.getRegister);
  app.post('/register', auth.postRegister);
  app.get('/logout', auth.getLogout);

  app.get('/admin', admin.getAdmin);
  app.get('/admin/editor', admin.getEditor);
  app.post('/admin/editor', admin.postEditor);
  app.get('/admin/schools', admin.getSchools);
  app.get('/admin/schools/create', admin.getCreateSchool);
  app.post('/admin/schools/create', admin.validateSchool(), admin.postCreateSchool);
  app.post('/admin/schools/:schoolId/remove', admin.postRemoveSchool);
  app.get('/admin/schools/:schoolId/edit', admin.getEditSchool);
  app.post('/admin/schools/:schoolId/edit', admin.validateSchool(), admin.postEditSchool);
}


