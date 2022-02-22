const { validUser, checkIfUserExists } = require('./user');
const login = require('./login');
const error = require('./error');

module.exports = {
  validUser, checkIfUserExists, error, login,
};
