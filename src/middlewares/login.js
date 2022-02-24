const crypto = require('crypto');
const {
  StatusCodes: { BAD_REQUEST },
} = require('http-status-codes');
const { User } = require('../models');
const { loginSchema } = require('../validations/schema');

const {
  SALT, ITERATIONS, KEYLEN, DIGEST,
} = process.env;

const login = async (req, _res, next) => {
  const { email, password: vulnerablePassword } = req.body;
  const { error } = loginSchema.validate({ email, password: vulnerablePassword });
  if (error) return next({ statusCode: BAD_REQUEST, message: error.message });
  const password = crypto.pbkdf2Sync(vulnerablePassword, SALT, +ITERATIONS, +KEYLEN, DIGEST).toString('utf-8');
  const checkIfUserExists = await User.findOne({ where: { email, password } });
  if (!checkIfUserExists) { return next({ statusCode: BAD_REQUEST, message: 'Campos inválidos' }); }
  return next();
};

module.exports = login;
