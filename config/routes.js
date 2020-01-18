const router = require('express').Router();
const home = require('../app/controllers/homeController');

router.get('/', home.landing);

module.exports = router;
