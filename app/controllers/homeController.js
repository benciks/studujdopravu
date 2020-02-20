const landing = require('./home');
const pages = require('./home/pages');
const schools = require('./home/schools');

exports.getLanding = landing.get;
exports.getPage = pages.get;
exports.getSchools = schools.get;

