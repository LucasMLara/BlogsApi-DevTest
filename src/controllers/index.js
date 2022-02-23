const {
  createNewUser, loginUser, getEveryone, getById, removeMySelf,
} = require('./userController');
const {
  createNewPost, getPosts, getSinglePost, updatePost, getPostByString,
} = require('./postController');

module.exports = {
  createNewUser,
  loginUser,
  getEveryone,
  getById,
  removeMySelf,
  createNewPost,
  getPosts,
  getSinglePost,
  updatePost,
  getPostByString
  ,
};
