const {
  createNewUser, loginUser, getEveryone, getById, removeMySelf,
} = require('./userController');
const { createNewPost, getPosts } = require('./postController');

module.exports = {
  createNewUser,
  loginUser,
  getEveryone,
  getById,
  removeMySelf,
  createNewPost,
  getPosts,
};
