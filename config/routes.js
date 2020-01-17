// Import modules
const router = require('express').Router();

// Import controllers
const home = require('../app/controllers/homeController');

router.get('/', home.landing);

module.exports = router;