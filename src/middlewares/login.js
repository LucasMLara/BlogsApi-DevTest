const {
  StatusCodes: { BAD_REQUEST },
} = require('http-status-codes');
const { User } = require('../models');
const { loginSchema } = require('../validations/schema');

const login = async (req, _res, next) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });
  if (error) return next({ statusCode: BAD_REQUEST, message: error.message });
  const checkIfUserExists = await User.findOne({ where: { email, password } });
  if (!checkIfUserExists) { return next({ statusCode: BAD_REQUEST, message: 'Campos inválidos' }); }
  return next();
};

module.exports = login;
