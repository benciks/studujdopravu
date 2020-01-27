const landing = require('./admin');
const schools = require('./admin/schools')

exports.getAdmin = landing.get;

exports.getSchools = schools.get;

exports.getCreateSchool = schools.getCreate;
exports.postCreateSchool = schools.postCreate;
exports.validateSchool = schools.validateCreate;

exports.postRemoveSchool = schools.postRemove;

exports.getEditSchool = schools.getEdit;
exports.postEditSchool = schools.postEdit;
