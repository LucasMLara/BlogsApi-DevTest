const {
  StatusCodes: { CREATED, OK, INTERNAL_SERVER_ERROR },
} = require('http-status-codes');
const { create, listAllUsers, getUserById } = require('../services/userService');
const login = require('../services/loginService');

const createNewUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  try {
    const newUser = await create({ displayName, email, password });
    return res.status(CREATED).json({ token: newUser.token });
  } catch (e) {
    return next(e);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await login({ email, password });
    res.status(OK).json(token);
  } catch (e) {
    next({ statusCode: INTERNAL_SERVER_ERROR, message: e.message });
  }
};

const getEveryone = async (_req, res, next) => {
  try {
    const allUsers = await listAllUsers();
    return res.status(OK).json(allUsers);
  } catch (e) {
    return next({ statusCode: INTERNAL_SERVER_ERROR, message: e.message });
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const singleUser = await getUserById(id);
    return res.status(OK).json(singleUser);
  } catch (e) {
    return next({ statusCode: INTERNAL_SERVER_ERROR, message: e.message });
  }
};

module.exports = {
  createNewUser,
  loginUser,
  getEveryone,
  getById,
};
