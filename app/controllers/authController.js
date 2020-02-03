//const register = require('./auth/register');
const login = require('./auth/login');
const logout = require('./auth/logout');

//exports.getRegister = register.get;
//exports.postRegister = register.post;

exports.getLogin = login.get;

exports.getLogout = logout.get;
