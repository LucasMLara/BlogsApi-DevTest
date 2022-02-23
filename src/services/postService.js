const { Post } = require('../models');

const create = async (data) => {
  const newPost = await Post.create(data);
  return newPost;
};

const getAllPosts = async () => {
  const allPosts = await Post.findAll({ include: [{ all: true, attributes: { exclude: ['password'] } }], attributes: { exclude: ['userId'] } });
  // https://sequelize.org/master/class/src/model.js~Model.html#static-method-findAll
  return allPosts;
};

const getASinglePost = async (id) => {
  const post = await Post.findByPk(id, { include: [{ all: true, attributes: { exclude: ['password'] } }], attributes: { exclude: ['userId'] } });
  return post;
};

module.exports = {
  create,
  getAllPosts,
  getASinglePost,
};
