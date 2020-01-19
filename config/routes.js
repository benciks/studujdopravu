const router = require('express').Router();
const home = require('../app/controllers/homeController');
const auth = require('../app/controllers/authController');

router.get('/', home.landing);

router.get('/login', auth.login);
router.get('/register', auth.register);

module.exports = router;
