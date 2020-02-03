const home = require('../app/controllers/homeController');
const auth = require('../app/controllers/authController');
const admin = require('../app/controllers/adminController');

module.exports = (app,passport) => {
  app.get('/', home.landing);

  // Auth
  app.get('/login', auth.getLogin);
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: true,
  }));
  app.get('/logout', auth.getLogout);

  // Admin
  app.get('/admin', admin.getAdmin);

  // Pages
  app.get('/admin/pages', admin.getPages);
  app.get('/admin/pages/create', admin.getCreatePage);
  app.post('/admin/pages/create', admin.validatePage(), admin.postCreatePage);
  app.post('/admin/pages/:pageId/remove', admin.postRemovePage);
  app.get('/admin/pages/:pageId/edit', admin.getEditPage);
  app.post('/admin/pages/:pageId/edit', admin.validatePage(), admin.postEditPage);

  // Schools
  app.get('/admin/schools', admin.getSchools);
  app.get('/admin/schools/create', admin.getCreateSchool);
  app.post('/admin/schools/create', admin.validateSchool(), admin.postCreateSchool);
  app.post('/admin/schools/:schoolId/remove', admin.postRemoveSchool);
  app.get('/admin/schools/:schoolId/edit', admin.getEditSchool);
  app.post('/admin/schools/:schoolId/edit', admin.validateSchool(), admin.postEditSchool);

  // Users
  app.get('/admin/users', admin.getUsers);
  app.get('/admin/users/create', admin.getCreateUser);
  app.post('/admin/users/create', admin.validateCreateUser(), admin.postCreateUser);
  app.post('/admin/users/:userId/remove', admin.postRemoveUser);
  app.get('/admin/users/:userId/edit', admin.getEditUser);
  app.post('/admin/users/:userId/edit', admin.validateEditUser(), admin.postEditUser);
}


