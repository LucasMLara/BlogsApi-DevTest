const { Op } = require('sequelize');
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

const updateASinglePost = async (id, { title, content }) => {
  await Post.update({ title, content }, { where: { id } });
  const postUpdated = await getASinglePost(id);
  return postUpdated;
};

const getSearchTerm = async (query) => {
  const singlePost = await Post.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
    include: [{ all: true, attributes: { exclude: ['password'] } }],
    attributes: { exclude: ['userId'] },
  });

  return singlePost;
};

// https://stackoverflow.com/questions/20695062/sequelize-or-condition-object/32543638

const remove = async (id) => {
  await Post.destroy({ where: { id } });
};

module.exports = {
  create,
  getAllPosts,
  getASinglePost,
  updateASinglePost,
  getSearchTerm,
  remove,
};
