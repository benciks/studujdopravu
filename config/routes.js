const router = require('express').Router();
const home = require('../app/controllers/homeController');
const auth = require('../app/controllers/authController');

router.get('/', home.landing);

router.get('/login', auth.getLogin);
router.get('/register', auth.getRegister);
router.post('/login', auth.postLogin);
router.post('/register', auth.postRegister);

module.exports = router;
