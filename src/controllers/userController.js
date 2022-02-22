const {
  StatusCodes: { CREATED },
} = require('http-status-codes');
const { create } = require('../services/userService');

const createNewUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  try {
    const newUser = await create({ displayName, email, password });
    return res.status(CREATED).json({ token: newUser.token });
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  createNewUser,
};
