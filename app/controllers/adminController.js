const landing = require('./admin');
const schools = require('./admin/schools');
const pages = require('./admin/pages');

exports.getAdmin = landing.get;

exports.getPages = pages.get;
exports.getCreatePage = pages.getCreate;
exports.postCreatePage = pages.postCreate;
exports.validatePage = pages.validate;
exports.postRemovePage = pages.postRemove;
exports.getEditPage = pages.getEdit;
exports.postEditPage = pages.postEdit;

exports.getSchools = schools.get;
exports.getCreateSchool = schools.getCreate;
exports.postCreateSchool = schools.postCreate;
exports.validateSchool = schools.validateCreate;
exports.postRemoveSchool = schools.postRemove;
exports.getEditSchool = schools.getEdit;
exports.postEditSchool = schools.postEdit;
