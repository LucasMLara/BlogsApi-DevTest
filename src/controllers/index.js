const {
  createNewUser, loginUser, getEveryone, getById, removeMySelf,
} = require('./userController');
const { createNewPost } = require('./postController');

module.exports = {
  createNewUser,
  loginUser,
  getEveryone,
  getById,
  removeMySelf,
  createNewPost,
};
