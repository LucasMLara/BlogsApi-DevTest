const { validUser, checkIfUserExists } = require('./user');
const login = require('./login');
const error = require('./error');
const Auth = require('./Auth');

module.exports = {
  validUser, checkIfUserExists, error, login, Auth,
};
