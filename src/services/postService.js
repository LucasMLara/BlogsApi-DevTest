const { Post } = require('../models');

const create = async (data) => {
  const newPost = await Post.create(data);
  return newPost;
};

module.exports = {
  create,
};
