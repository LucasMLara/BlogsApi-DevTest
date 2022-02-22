require('dotenv').config();

const { sign } = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = async (data) => {
  const userExists = await User.findOne({ where: { email: data.email, password: data.password } });
  const { password: _, ...userWithoutPassword } = userExists.dataValues;
  const token = sign({ data: userWithoutPassword }, JWT_SECRET, jwtConfig);
  return { token };
};

module.exports = login;
