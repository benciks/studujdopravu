const landing = require('./admin');
const editor = require('./admin/editor');

exports.getAdmin = landing.get;

exports.getEditor = editor.get;
exports.postEditor = editor.post;
