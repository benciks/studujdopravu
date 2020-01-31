const landing = require('./admin');
const editor = require('./admin/editor');
const schools = require('./admin/schools');

exports.getAdmin = landing.get;

exports.getEditor = editor.get;
exports.postEditor = editor.post;

exports.getSchools = schools.get;
exports.getCreateSchool = schools.getCreate;
exports.postCreateSchool = schools.postCreate;
exports.validateSchool = schools.validateCreate;
exports.postRemoveSchool = schools.postRemove;
exports.getEditSchool = schools.getEdit;
exports.postEditSchool = schools.postEdit;
