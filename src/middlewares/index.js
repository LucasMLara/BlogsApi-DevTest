const { validUser, checkIfUserExists } = require('./user');
const login = require('./login');
const error = require('./error');
const Auth = require('./Auth');
const { validPost, checkIfPostExists, checkPostOwnership } = require('./post');

module.exports = {
  validUser,
  checkIfUserExists,
  error,
  login,
  Auth,
  validPost,
  checkIfPostExists,
  checkPostOwnership,
};
