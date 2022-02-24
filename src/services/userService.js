require('dotenv').config();

const { sign } = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const create = async (data) => {
  const newUser = await User.create(data);
  const { password: _, ...userWithoutPassword } = newUser.dataValues;
  const token = sign({ data: userWithoutPassword }, JWT_SECRET, jwtConfig);
  return { token };
};

const listAllUsers = async () => {
  const allUsers = await User.findAll({ attributes: { exclude: ['password'] } });
  return allUsers;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  return user;
};

const remove = async (id) => {
  const user = await User.destroy({ where: { id } });
  return user;
};

module.exports = {
  create,
  listAllUsers,
  getUserById,
  remove,
};
